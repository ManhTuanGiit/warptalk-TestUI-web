export interface HalftoneDot {
  x: number;
  y: number;
  baseRadius: number;
}

export interface HalftoneConfig {
  /** Grid cell size in pixels at internal sampling resolution */
  spacing: number;
  /** Max dot radius as a fraction of spacing (0–0.5 recommended) */
  maxDotRadiusRatio: number;
  /**
   * Luminance threshold (0–1).
   * Pixels ABOVE this value are treated as bright hand subject → rendered as dots.
   * Pixels BELOW this value are dark background → discarded entirely.
   */
  brightThreshold: number;
}

/**
 * Samples the source image onto an offscreen canvas at internal resolution
 * (sampleW × sampleH), isolates bright subject pixels, and returns halftone
 * dots in that same coordinate space.
 *
 * The caller should render these dots inside an SVG with
 *   viewBox="0 0 {sampleW} {sampleH}"
 * and let CSS control the display size.
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
        const minR = spacing * 0.06;

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const cx = col * spacing + spacing / 2;
            const cy = row * spacing + spacing / 2;

            const px = Math.min(Math.floor(cx), w - 1);
            const py = Math.min(Math.floor(cy), h - 1);
            const i = (py * w + px) * 4;

            const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];

            // Treat fully transparent pixels as background
            if (a < 20) continue;

            // Perceived luminance
            const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

            // Only bright pixels survive → they are the hand subject
            if (lum < brightThreshold) continue;

            // Scale dot radius with brightness
            const norm = (lum - brightThreshold) / (1 - brightThreshold);
            const radius = minR + norm * (maxR - minR);
            if (isNaN(radius) || radius <= 0) continue;

            dots.push({ x: cx, y: cy, baseRadius: radius });
          }
        }

        console.log(`[halftone] generated ${dots.length} dots at ${w}×${h}`);
        resolve(dots);
      } catch (err) {
        console.warn("[halftone] canvas error:", err);
        resolve([]);
      }
    };

    img.onerror = () => {
      console.warn("[halftone] image load failed:", imageUrl);
      resolve([]);
    };
  });
}
