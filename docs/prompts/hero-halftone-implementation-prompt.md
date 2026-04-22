Read these files first:
@docs/hero-reference-notes.md
@docs/hero-hands-halftone-brief.md
@docs/hero-halftone-implementation-plan.md
@.agents/rules/hero-halftone-motion.md

Implement the approved hero halftone feature.

Requirements:
- use the existing two-hands image already inside the project
- inspect and confirm the correct asset path before implementation
- isolate the hands from the background before building the dot field
- render the final hero artwork as inline SVG
- build the static composition first, then the left-to-right reveal sweep, then subtle secondary motion
- keep the center copy readable and visually primary
- keep the artwork monochrome or near-monochrome
- light theme first, with scroll-based CSS-variable theme transition
- support prefers-reduced-motion
- keep all motion and density parameters easy to tune

Implementation expectations:
- keep the code modular and production-friendly
- avoid per-frame React re-renders for thousands of dots
- use direct DOM mutation where appropriate for SVG circle updates
- preserve responsive behavior on mobile and desktop
- do not allow the original photo background to dominate the dot output
- do not let the hero artwork overpower the copy

Before finalizing:
- verify the two-hand silhouette reads clearly
- verify text-safe zone protection
- verify reduced-motion behavior
- verify responsive behavior
- verify that the final result feels premium, minimal, and editorial