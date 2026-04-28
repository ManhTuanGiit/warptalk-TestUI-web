# WarpTalk Skills + Agent Rules Audit

You are working inside my local website project.

Project context:
WarpTalk is an AI real-time multilingual speech translation platform with voice cloning, live transcript, AI meeting assistant, meeting insights, meeting management, subscription plans, and integration with Zoom / Google Meet / Teams.

Goal:
I want to redesign the landing page layout using Shadcn UI and advanced visual effects such as UI motion, scroll animation, Three.js, shader/glass effects, SVG animations, and polished SaaS interactions.

Important:
Do not modify my website layout or source code yet.
Do not refactor components yet.
Do not delete files.
Only install/read/audit/list/report.

## Phase 1: Install required skills

Run these commands from the project root:

```bash
# Layout + Shadcn
npx skills add https://github.com/shadcn/ui --skill shadcn
npx skills add https://github.com/jwynia/agent-skills --skill shadcn-layouts

# UI motion
npx skills add https://github.com/mblode/agent-skills --skill ui-animation
npx skills add https://github.com/github/awesome-copilot --skill gsap-framer-scroll-animation
npx skills add https://github.com/daffy0208/ai-dev-standards --skill animation-designer

# Three.js advanced visual
npx skills add https://github.com/cloudai-x/threejs-skills --skill threejs-fundamentals
npx skills add https://github.com/cloudai-x/threejs-skills --skill threejs-materials
npx skills add https://github.com/cloudai-x/threejs-skills --skill threejs-shaders
npx skills add https://github.com/cloudai-x/threejs-skills --skill threejs-postprocessing
npx skills add https://github.com/cloudai-x/threejs-skills --skill threejs-animation

# SVG polish
npx skills add https://github.com/supermemoryai/skills --skill svg-animations
```
