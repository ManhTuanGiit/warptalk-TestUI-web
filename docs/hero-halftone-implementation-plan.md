# Hero Halftone Implementation Plan

## 1. Objective
Build a landing-page hero section where an existing two-hands source image is transformed into a responsive inline SVG halftone composition.

The final result should feel:
- minimal
- premium
- editorial
- spacious
- sharp on retina and large screens

The hero must visually reference:
- a clean landing page UI with centered copy and CTA
- a halftone motion treatment inspired by a left-to-right sweep or scan
- two hands approaching each other from the left and right sides of the hero

---

## 2. Core Requirements

### Rendering
- The final hero artwork must render as inline SVG
- Offscreen canvas may be used only for:
  - image sampling
  - luminance analysis
  - thresholding
  - mask extraction
- The final visual output must not be rasterized
- The SVG must stay crisp when scaled across desktop and mobile breakpoints

### Subject
- The source asset is a two-hands image already placed inside the project
- The halftone must follow only the hand subject
- Do not render the full photo rectangle as halftone
- The background of the original image must not dominate the final dot field

### Motion
- Primary motion: controlled left-to-right sweep / reveal
- Secondary motion: very subtle dot modulation after reveal
- Motion must feel deterministic, calm, and art-directed
- Avoid noisy, chaotic, random, or flashy particle behavior

### Layout
- The hands should visually enter from the left and right sides of the hero
- The fingertip meeting zone should sit near the visual center
- The hero artwork must frame the centered copy, not overpower it
- Maintain a strong text-safe area around the headline, supporting paragraph, and CTA

### Theme
- The hero starts in a light theme
- Theme transitions on scroll should be controlled with CSS custom properties
- Theme changes must preserve contrast and readability

### Accessibility and Performance
- Always support prefers-reduced-motion
- Build the dot field once, then animate efficiently
- Keep dot count within a performance-safe range
- Keep tuning parameters easy to adjust without rewriting core logic

---

## 3. File Locations

Recommended structure:

- `src/components/HeroHalftone.tsx`
  - Main React component that renders the inline SVG and manages animation lifecycle

- `src/components/landing/HeroSection.jsx`
  - Parent hero section containing:
    - navigation-safe layout
    - centered heading
    - supporting copy
    - CTA
    - `HeroHalftone` artwork integration

- `src/lib/extractHandMask.ts`
  - Utility for isolating the hand subject from the image background

- `src/lib/generateHalftoneSvg.ts`
  - Utility to:
    - sample the source image with offscreen canvas
    - calculate luminance
    - apply masking rules
    - output dot metadata for SVG rendering

- `src/lib/animateHalftoneSweep.ts`
  - Utility for sweep reveal and subtle secondary dot modulation

- `src/lib/useThemeOnScroll.ts`
  - Hook or utility for theme switching using section visibility

- `src/styles/theme.css`
  - CSS custom properties and transition tokens for theme states

---

## 4. Source Asset Handling

Before implementation, inspect the project and confirm the exact path of the two-hands image.

Requirements:
- Use the existing two-hands image already stored in the project
- Do not hardcode assumptions about the asset path until verified
- If a transparent PNG or a masked source already exists, prefer that asset
- If the source image includes a dark or textured background, isolate the hands before generating the dot field

---

## 5. Subject Isolation Strategy

The halftone must follow the silhouette and major anatomical features of the hands, not the full image rectangle.

Preferred strategy:
1. Check whether the source asset already has transparency
2. If transparency is available, use the alpha channel directly
3. If transparency is not available:
   - draw the image into an offscreen canvas
   - analyze luminance and contrast
   - apply thresholding and subject-isolation logic
   - optionally combine luminance threshold with edge-aware or mask-style filtering
4. Remove or suppress background pixels so they do not generate dominant dots
5. Preserve the silhouette, finger structure, and major shading of the hands

Important:
- Do not rely on a naive threshold alone if it destroys hand detail
- Do not allow the dark original photo background to fill the SVG with unwanted dots
- The final result should clearly read as two hands, not as a generic textured field

---

## 6. Art Direction Guardrails

The hero must visually feel close to the intended reference direction without duplicating it literally.

Guardrails:
- The composition should feel minimal, premium, and editorial
- Use a light, clean hero environment as the default presentation
- The artwork should be monochrome or near-monochrome
- Large negative space must be preserved
- The centered copy must remain the primary focal point
- The halftone hands should support the composition from the sides
- The fingertip meeting zone should act as a visual tension point near the center
- The artwork must not feel like a random particle background
- The final hero should read as intentional brand art, not as a demo effect

---

## 7. Composition Strategy

### Desktop
- The hero artwork should occupy the wider horizontal field
- The left hand should visually enter from the left edge
- The right hand should visually enter from the right edge
- The fingertips should approach each other near the center of the hero
- The headline, paragraph, and CTA should remain centered and readable
- Maintain a protected text-safe zone around the center copy
- The artwork should frame the copy rather than overlap it aggressively

### Tablet
- Preserve the left/right approach of the hands
- Slightly reduce density, scale, or contrast if needed to keep the layout clean
- Keep the fingertip meeting zone visually coherent

### Mobile
- Prioritize readability first
- Reduce dot density, scale, opacity, or artwork spread if necessary
- Keep the visual suggestion of two hands approaching, even if simplified
- Ensure the text and CTA remain dominant and uncluttered

---

## 8. SVG Generation Approach

### Overview
The final artwork must be generated as inline SVG circles based on a sampled interpretation of the two-hands source image.

### Process
1. Create an offscreen canvas sized for sampling
2. Draw the source image onto the canvas using composition logic appropriate for the hero layout
3. Sample the image in a grid using a configurable spacing value
4. For each sample point:
   - calculate perceived luminance using:
     - `0.2126 * R + 0.7152 * G + 0.0722 * B`
   - apply masking or subject-isolation logic
   - decide whether the sample belongs to the hand subject
5. Convert valid sample points into dot data:
   - `x`
   - `y`
   - `baseRadius`
   - optional `opacity`
   - optional normalized coordinates for animation
6. Render the output as a single inline SVG containing `<circle>` elements
7. Keep the dot field modular and easy to tune

### Important Constraints
- Do not render the final effect with canvas
- Do not output a rectangular halftone block of the entire image
- The final SVG should visually follow the hand forms and shading

---

## 9. Animation Approach

### General Principle
Animation should reinforce the composition, not dominate it.

### Primary Motion
- Use a left-to-right sweep or reveal as the core motion language
- Dots should remain hidden or minimized until the sweep passes
- Once revealed, dots should settle into their subject-driven base radius

### Secondary Motion
- After the reveal, apply a very subtle deterministic modulation
- This may affect:
  - radius
  - opacity
  - both, within a restrained range
- The result should feel calm and premium, not like noise

### Optional Local Emphasis
- A very restrained emphasis near the fingertip meeting area is acceptable
- This must remain subtle and must not distract from the headline or CTA

### Animation Implementation
- Avoid React state updates for thousands of animated nodes
- Use refs and direct DOM mutation for the circle attributes
- Use a single requestAnimationFrame loop for efficient updates

### Reduced Motion
- If prefers-reduced-motion: reduce is enabled:
  - skip continuous animation
  - render the final static halftone state immediately

---

## 10. Theme Transition Strategy

### Theme Behavior
- The hero should open in a light theme
- As the user scrolls into the next section, theme variables may transition toward a darker theme

### Technical Approach
- Use CSS custom properties for:
  - background
  - foreground
  - dot color
  - muted text
  - CTA contrast if needed
- Use section visibility or IntersectionObserver logic to switch theme state
- Preserve readability during all theme transitions

### Requirements
- Theme changes must not reduce contrast
- Theme changes must not make the halftone dots visually muddy
- Theme transitions should feel smooth and brand-consistent

---

## 11. Performance Safeguards

### Rendering
- Generate the dot field once per meaningful layout state
- Avoid expensive regeneration every frame

### Animation
- Use direct DOM updates instead of React re-renders for per-frame dot changes
- Keep the number of circles in a safe range for SVG performance

### Resize Handling
- Recalculate only when necessary
- Debounce resize-driven regeneration
- Keep mobile and desktop layouts stable

### Element Count
- Maintain a minimum spacing or cap so total dot count remains performant
- Target a safe SVG circle count for a landing-page hero

### Motion Accessibility
- Respect prefers-reduced-motion
- Ensure the hero still looks intentional and high-quality when motion is disabled

---

## 12. Tuning Parameters

These parameters should be exposed as constants, props, or clearly grouped config values:

- `spacing`
  - distance between dot samples

- `maxDotRadiusRatio`
  - maximum radius relative to grid spacing

- `subjectThreshold`
  - threshold or mask cutoff for determining whether a pixel belongs to the hands

- `shadowRetention`
  - controls how much darker hand shading is preserved without allowing background takeover

- `sweepSpeed`
  - speed of the left-to-right reveal

- `sweepSoftness`
  - softness of the reveal edge

- `pulseAmplitude`
  - amount of secondary radius or opacity modulation

- `pulseSpeed`
  - speed of the secondary modulation

- `mobileDensityScale`
  - density adjustment for smaller screens

- `textSafeZone`
  - composition-safe bounds around headline and CTA

---

## 13. Implementation Phases

### Phase 1 — Static Subject-Correct Halftone
- Confirm the real source asset path
- Isolate the hands from the background
- Generate a static SVG halftone that clearly reads as two hands
- Validate silhouette quality and composition

### Phase 2 — Composition and Layout Refinement
- Position the hands so they enter from the left and right sides
- Align the fingertip meeting zone near the center
- Preserve large negative space
- Protect the center copy with a clear text-safe zone

### Phase 3 — Sweep Animation
- Add the left-to-right reveal sweep
- Ensure dots settle naturally into the final composition
- Keep motion controlled and premium

### Phase 4 — Secondary Motion
- Add restrained secondary modulation only after reveal
- Validate that the effect remains subtle and non-noisy

### Phase 5 — Theme Transition
- Add scroll-based theme transitions using CSS variables
- Verify contrast and visual consistency

### Phase 6 — Responsive and Accessibility Pass
- Tune desktop, tablet, and mobile behavior
- Validate reduced-motion behavior
- Ensure layout clarity and hero readability

---

## 14. Task Groups

### Task Group 1 — Asset Verification and Subject Isolation
- verify actual source asset path
- inspect whether transparency exists
- implement mask extraction or threshold-based subject isolation

### Task Group 2 — Halftone SVG Generation
- build sampling pipeline
- compute dot metadata
- render subject-correct SVG circles

### Task Group 3 — Composition and Responsive Layout
- align hands from left and right sides
- protect center copy
- refine desktop, tablet, and mobile framing

### Task Group 4 — Motion System
- implement sweep reveal
- implement restrained secondary modulation
- preserve performance with direct DOM updates

### Task Group 5 — Theme Transition and Integration
- integrate hero with parent section
- implement CSS-variable theme transitions
- validate contrast and readability

### Task Group 6 — Accessibility and Final Tuning
- support reduced motion
- test tuning parameters
- finalize performance and visual polish

---

## 15. Acceptance Criteria

The work is successful only if all of the following are true:

- The final hero artwork is rendered as inline SVG
- The halftone clearly reads as two hands
- The original photo background does not dominate the dot field
- The hero remains sharp when resized
- The centered headline, paragraph, and CTA remain readable and visually primary
- The hands frame the copy from the left and right sides
- The fingertip meeting zone feels intentional and compositionally strong
- The motion reads as a controlled left-to-right reveal
- Secondary motion remains subtle and non-noisy
- The visual result feels premium, minimal, and editorial
- The theme transition works correctly on scroll
- The hero performs well on modern desktop and acceptable mobile devices
- Reduced motion fallback works correctly