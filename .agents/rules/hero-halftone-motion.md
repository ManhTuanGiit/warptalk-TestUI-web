---
trigger: always_on
---

# Hero Halftone Motion Rules

## Rendering
- Final hero artwork must render as inline SVG, not canvas.
- Offscreen canvas is allowed only for pixel sampling, luminance analysis, masking, or threshold extraction.
- Do not rasterize the final hero output.
- Keep the output crisp on retina and large desktop screens.

## Subject Handling
- The source asset is a two-hands image that must be treated as the hero subject.
- Do not render the full photo rectangle as halftone.
- Isolate the hands from the background first using transparency, masking, thresholding, or subject extraction logic.
- The final halftone result must visually follow the silhouette and anatomy of the hands.
- Do not allow the original image background to dominate the SVG output.

## Art Direction
- The composition must feel premium, minimal, editorial, and spacious.
- Preserve large negative space.
- Keep the centered headline, paragraph, and CTA as the primary focal area.
- The halftone hands should support the copy from the sides, not compete with it.
- Keep the artwork monochrome or near-monochrome.
- Avoid noisy, chaotic, flashy, or random-looking motion.

## Motion
- Primary motion is a controlled left-to-right scan, sweep, or reveal across the hand shapes.
- Secondary motion may gently modulate dot radius or opacity, but must remain subtle.
- Motion should feel deterministic, smooth, and art-directed.
- Do not use jittery random particle drift.
- Motion must not reduce text readability.

## Layout
- Desktop composition should place the hand forms entering from the left and right sides toward the center.
- The fingertip meeting area should sit near the visual center.
- Preserve a strong text-safe zone around the center copy.
- Mobile layout must prioritize readability first, even if the artwork becomes simpler.

## Theme
- Theme changes must use CSS custom properties.
- Light theme is the default hero presentation.
- Scroll into the next section may transition to a darker theme while preserving readability.

## Performance and Accessibility
- Always support prefers-reduced-motion.
- Build the dot field once, then animate efficiently.
- Keep dot count in a performance-safe range.
- Keep code modular and tuning-friendly.