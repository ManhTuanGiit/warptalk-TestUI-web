export interface HalftoneDot {
  x: number;
  y: number;
  baseRadius: number;
}

export interface HalftoneConfig {
  spacing: number;
  maxDotRadiusRatio: number;
  brightThreshold: number;
}

/**
 * Samples the source image and isolates the bright hand subject.
 * Returns dots in a stable internal coordinate space (sampleW x sampleH).
 */
export async function generateHalftoneDots(
  imageUrl: string,
  sampleW: number,
  sampleH: number,
  config: HalftoneConfig
): Promise<HalftoneDot[]> {
  const { spacing, maxDotRadiusRatio, brightThreshold } = config;

  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve([]);

    const w = Math.floor(sampleW);
    const h = Math.floor(sampleH);
    if (w <= 0 || h <= 0) return resolve([]);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return resolve([]);

      // Draw image to fill the canvas (cover)
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canRatio = w / h;
      let dw = w, dh = h, ox = 0, oy = 0;
      
      if (imgRatio > canRatio) {
        dw = h * imgRatio;
        ox = (w - dw) / 2;
      } else {
        dh = w / imgRatio;
        oy = (h - dh) / 2;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, ox, oy, dw, dh);

      try {
        const { data } = ctx.getImageData(0, 0, w, h);
        const dots: HalftoneDot[] = [];

        const cols = Math.floor(w / spacing);
        const rows = Math.floor(h / spacing);
        const maxR = spacing * maxDotRadiusRatio;
        const minR = spacing * 0.05;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const cx = col * spacing + spacing / 2;
            const cy = row * spacing + spacing / 2;

            const px = Math.min(Math.floor(cx), w - 1);
            const py = Math.min(Math.floor(cy), h - 1);
            const i = (py * w + px) * 4;

            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];

            // Ignore transparent background
            if (a < 20) continue;

            // Perceived luminance
            const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

            // ISOLATION: Only bright pixels (the hands) are kept.
            if (lum < brightThreshold) continue;

            // Map brightness to dot radius (Halftone look)
            const norm = (lum - brightThreshold) / (1 - brightThreshold);
            const radius = minR + norm * (maxR - minR);
            
            if (radius > 0.1) {
              dots.push({ x: cx, y: cy, baseRadius: radius });
            }
          }
        }

        console.log(`[halftone] Isolation successful: generated ${dots.length} dots.`);
        resolve(dots);
      } catch (err) {
        console.warn("[halftone] processing error:", err);
        resolve([]);
      }
    };

    img.onerror = () => {
      console.warn("[halftone] failed to load asset:", imageUrl);
      resolve([]);
    };
  });
}
