# Voxel Design — Scroll Portfolio

Fullscreen, scroll-snap studio site. Bold caps titles. One medium per screen.

## Sections

1. **Intro** — brand punch
2. **Web** — browser + style title speed-ramp sequence (ECOMMERCE → BUSINESS → PORTFOLIO → SAAS)
3. **Logos** — three interactive Three.js stages (drag to orbit)
4. **360 Tour** — equirectangular panorama (drag to look)
5. **Contact**

## Typography

- Titles: **Bebas Neue** (bold, all-caps)
- Body: **Inter**

## Media placeholders

Generated Imagine assets live in `public/media/`:

- `web/*.jpg` — website style mockups
- `logos/*.jpg` — 3D logo product shots
- `tour/panorama.jpg` — equirectangular room

Swap these for your own files anytime — paths are wired in `src/data/webStyles.ts` and the section components.

## Develop

```bash
npm install
npm run dev
```

## GitHub Pages

Live: **https://boorussia.github.io/voxel-portfolio/**

Deploys automatically on push to `main` via `.github/workflows/deploy-pages.yml`.

```bash
# Local production build with Pages base path
npm run build:pages
npm run preview:pages
```

## Notes

- Video autoplay loops via Imagine were blocked in this environment (API ZDR/rate limits). The web section uses a coded speed-ramp on stills + Ken Burns instead — swap in real screen recordings later by adding a `video` field to each style.
- Section CTAs are style-matched and placed out of drag zones (especially the 360 dock).
