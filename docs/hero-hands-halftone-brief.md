# Hero Hands Halftone Brief

## Goal
Build a landing-page hero section where an existing two-hands source image is transformed into a responsive vector halftone composition for the hero area.

## Core Concept
The hero artwork should depict two hands reaching toward each other, represented by halftone dots.
The dots should visually follow the hand silhouettes and anatomy, not the entire source image rectangle.
The final output must feel crisp, premium, and intentional.

## Source Asset
- Use the existing two-hands image already stored in the project.
- Prefer a transparent PNG or a masked source if available.
- If the current asset includes a dark or textured background, isolate the hands before generating halftone dots.
- The final halftone should be based on the subject, not the raw photo background.

## Visual Direction
- Minimal editorial landing page
- Light theme at first load
- Clean centered typography
- Large negative space
- Monochrome or near-monochrome halftone artwork
- Sharp vector dots, not blurred raster
- Premium feel similar to a modern product landing page

## Composition
- The hands should enter visually from the left and right sides of the hero.
- The fingertip meeting area should sit around the central visual zone.
- The artwork must frame the centered copy rather than overlap it heavily.
- Maintain a safe empty area around the headline, paragraph, and CTA.
- The artwork should feel integrated with the layout, not like a pasted image block.

## Motion
- Primary motion: left-to-right sweep or reveal across the hand shapes.
- Secondary motion: subtle modulation of dot radius and/or opacity after reveal.
- Motion should feel calm, premium, and deterministic.
- No noisy random behavior.
- Optional micro-emphasis near the fingertips is allowed if subtle.

## Theme Transition
- Hero starts in a light theme.
- On scroll into the next section, transition theme tokens using CSS custom properties.
- Theme transition must not break the contrast of text, CTA, or dots.

## Technical Constraints
- Final artwork must be inline SVG.
- Offscreen canvas may be used only for sampling, masking, and luminance calculations.
- Do not render the final hero via canvas.
- Responsive at 390, 768, 1024, and 1440+ widths.
- Respect prefers-reduced-motion.
- Keep the dot field performant and easy to tune.

## Suggested Architecture
- src/components/HeroHalftone.tsx
- src/lib/extractHandMask.ts
- src/lib/generateHalftoneSvg.ts
- src/lib/animateHalftoneSweep.ts
- src/lib/useThemeOnScroll.ts
- src/styles/theme.css

## Implementation Expectations
- Build the static SVG hand composition first.
- Then add the reveal sweep.
- Then add subtle secondary motion.
- Then add scroll-based theme changes.
- Keep parameters easy to tweak: grid density, max dot size, threshold, sweep speed, opacity range.

## Acceptance Criteria
- The hands are recognizable as the main subject.
- The background of the original photo does not dominate the dot field.
- The final output stays sharp when resized.
- The hero text remains readable and visually primary.
- The left-to-right motion is smooth and controlled.
- The composition resembles the intended minimal hero art direction.
- Reduced motion fallback works correctly.