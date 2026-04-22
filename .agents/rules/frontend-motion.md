---
trigger: always_on
---

# Frontend Motion Rules

- Prefer inline SVG for hero graphics that must remain crisp when scaled.
- Offscreen canvas is allowed only for pixel sampling, not as final render output.
- Always support prefers-reduced-motion.
- Avoid noisy or random motion; prefer art-directed, deterministic motion.
- Theme changes must use CSS custom properties.
- Keep animation code modular and easy to tune.