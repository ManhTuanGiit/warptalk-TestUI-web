Read these files first:
@docs/hero-reference-notes.md
@docs/hero-hands-halftone-brief.md
@docs/hero-halftone-implementation-plan.md
@.agents/rules/hero-halftone-motion.md

Use the existing two-hands image already inside the project as the source asset.

Important constraints:
- do not treat the full photo rectangle as the halftone
- isolate the hand subject from the background first
- final hero artwork must render as inline SVG
- offscreen canvas may be used only for sampling, luminance analysis, masking, or threshold extraction
- the result must feel minimal, premium, editorial, and spacious
- keep the artwork monochrome or near-monochrome
- preserve a strong text-safe zone around the centered headline, paragraph, and CTA
- the hands should frame the copy from the left and right sides
- the fingertip meeting zone should sit near the visual center
- primary motion is a calm left-to-right reveal sweep
- secondary motion must remain very subtle
- support prefers-reduced-motion
- theme transitions should use CSS custom properties

Please work in Planning mode first.

Do the following:
1. inspect the existing project structure
2. confirm the exact path of the two-hands asset already inside the project
3. propose the best subject-isolation strategy for that exact image
4. produce an Implementation Plan
5. produce Task Groups
6. explain desktop and mobile composition strategy
7. explain the SVG generation pipeline
8. explain the motion system
9. explain performance safeguards
10. list all tuning parameters that should remain easy to adjust

Do not implement until the plan is approved.