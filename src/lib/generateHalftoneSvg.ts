export interface HalftoneDot {
  x: number;
  y: number;
  baseRadius: number;
}

export interface HalftoneConfig {
  spacing: number;
  maxDotRadiusRatio: number;
  subjectThreshold: number;
  shadowRetention: number;
}

export async function generateHalftoneSvg(
  imageUrl: string,
  rawWidth: number,
  rawHeight: number,
  config: HalftoneConfig
): Promise<HalftoneDot[]> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return resolve([]); // SSR fallback
    }

    // CRITICAL FIX: Ensure width and height are integers. 
    // ResizeObserver can return fractional dimensions which breaks array indexing!
    const width = Math.floor(rawWidth);
    const height = Math.floor(rawHeight);

    if (width <= 0 || height <= 0) {
      return resolve([]);
    }

    const img = new Image();
    if (imageUrl.startsWith("http")) {
      img.crossOrigin = "anonymous";
    }
    img.src = imageUrl;

    img.onload = () => {
      // Calculate scaled dimensions to cover the area
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (!ctx) {
        return reject(new Error("Failed to get 2D context"));
      }

      // Draw image to cover (object-fit: cover logic)
      // For hands to enter from sides and meet in the center, cover usually works well.
      const imgRatio = img.width / img.height;
      const targetRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      // Make the image slightly larger to ensure hands reach the center properly
      // A 1.1x multiplier adds a bit of framing punch
      const scaleMultiplier = 1.1; 

      if (imgRatio > targetRatio) {
        // Image is wider than target
        drawWidth = height * imgRatio * scaleMultiplier;
        drawHeight = height * scaleMultiplier;
      } else {
        // Image is taller than target
        drawHeight = width / imgRatio * scaleMultiplier;
        drawWidth = width * scaleMultiplier;
      }
      
      offsetX = (width - drawWidth) / 2;
      offsetY = (height - drawHeight) / 2;

      try {
        ctx.clearRect(0, 0, width, height); // Ensure transparent background
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;
        const dots: HalftoneDot[] = [];

        const { spacing, maxDotRadiusRatio, subjectThreshold, shadowRetention } = config;
        const cols = Math.floor(width / spacing);
        const rows = Math.floor(height / spacing);
        const maxRadius = spacing * maxDotRadiusRatio;

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const centerX = x * spacing + spacing / 2;
            const centerY = y * spacing + spacing / 2;

            const px = Math.floor(centerX);
            const py = Math.floor(centerY);
            
            if (px >= width || py >= height) continue;

            const idx = (py * width + px) * 4;
            const r = pixels[idx];
            const g = pixels[idx + 1];
            const b = pixels[idx + 2];
            const a = pixels[idx + 3];

            // 1. Alpha Check: If the image has transparency, skip fully transparent pixels
            if (a < 10) continue; 

            // 2. Luminance Calculation
            const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            
            // 3. Ink Density
            // Dark pixels = high density (large dots), Bright pixels = low density (small dots/empty)
            const inkDensity = 1 - luminance;

            // 4. Subject Isolation via Thresholding
            // Drop very light pixels (white background)
            if (inkDensity < subjectThreshold) {
              continue;
            }
            
            // 5. Dot Radius Calculation
            // shadowRetention boosts the darkness of shadows to ensure solid forms
            let contrastDensity = Math.min(1, inkDensity * shadowRetention);
            
            // Minimum radius ensures the shape doesn't completely vanish at edges
            const minRadius = spacing * 0.1;
            const radius = minRadius + contrastDensity * (maxRadius - minRadius);

            dots.push({ x: centerX, y: centerY, baseRadius: radius });
          }
        }
        resolve(dots);
      } catch (err) {
        console.warn("Canvas SecurityError or drawing failed. Using fallback.", err);
        resolve([]);
      }
    };

    img.onerror = () => {
      console.warn(`Failed to load image at ${imageUrl}.`);
      resolve([]);
    };
  });
}



