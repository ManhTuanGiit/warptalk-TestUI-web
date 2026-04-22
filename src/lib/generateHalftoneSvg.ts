export interface HalftoneDot {
  x: number;
  y: number;
  baseRadius: number;
}

export async function generateHalftoneSvg(
  imageUrl: string,
  width: number,
  height: number,
  spacing: number,
  maxDotRadiusRatio: number = 0.45
): Promise<HalftoneDot[]> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      return resolve([]); // SSR fallback
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
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

      // Fill with white background (to represent maximum luminance where image doesn't cover)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Draw image to cover (object-fit: cover logic)
      const imgRatio = img.width / img.height;
      const targetRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > targetRatio) {
        // Image is wider than target
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        // Image is taller than target
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      }

      try {
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;
        const dots: HalftoneDot[] = [];

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

            const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
            let invertedLum = 1 - luminance;
            
            const minRadius = spacing * 0.05;
            const radius = minRadius + invertedLum * (maxRadius - minRadius);

            dots.push({ x: centerX, y: centerY, baseRadius: radius });
          }
        }
        resolve(dots);
      } catch (err) {
        console.warn("Canvas SecurityError or drawing failed. Using mathematical fallback pattern.", err);
        resolve(generateFallbackPattern(width, height, spacing, maxDotRadiusRatio));
      }
    };

    img.onerror = () => {
      console.warn(`Failed to load image at ${imageUrl}. Using mathematical fallback pattern.`);
      
      const dots: HalftoneDot[] = generateFallbackPattern(width, height, spacing, maxDotRadiusRatio);
      resolve(dots);
    };
  });
}

function generateFallbackPattern(width: number, height: number, spacing: number, maxDotRadiusRatio: number): HalftoneDot[] {
  const dots: HalftoneDot[] = [];
  const cols = Math.floor(width / spacing);
  const rows = Math.floor(height / spacing);
  const maxRadius = spacing * maxDotRadiusRatio;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const centerX = x * spacing + spacing / 2;
      const centerY = y * spacing + spacing / 2;
      
      const dx = centerX - width / 2;
      const dy = centerY - height / 2;
      const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.sqrt(width * width + height * height) / 2;
      
      const invertedLum = Math.max(0, 1 - (distanceToCenter / maxDistance));
      const minRadius = spacing * 0.05;
      const radius = minRadius + invertedLum * (maxRadius - minRadius);
      
      dots.push({ x: centerX, y: centerY, baseRadius: radius });
    }
  }
  return dots;
}
