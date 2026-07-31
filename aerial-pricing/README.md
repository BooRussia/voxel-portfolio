# Aerial Pricing

Standalone map-based drone job quoting site.

Draw a box or polygon on satellite imagery, pick services (photos, map, thermal, etc.), and get a live job total with optional drive-time from your home base.

## Run locally

```bash
cd aerial-pricing
npm install
npm run dev
```

Open the URL Vite prints (usually **http://localhost:5173**).

## Build for hosting

```bash
npm run build
```

Static files land in `dist/`. Deploy that folder to any static host.

### Quick host options

**Netlify / Cloudflare Pages / Vercel**
- Import this `aerial-pricing` folder (or a repo that contains only this app)
- Build command: `npm run build`
- Publish directory: `dist`

**GitHub Pages (own repo)**
1. Create a new repo and copy the contents of this folder to the root
2. Push to `main`
3. Enable Pages from GitHub Actions, or run:

```bash
# project-site under https://USER.github.io/REPO/
VITE_BASE_PATH=/REPO-NAME/ npm run build
# then publish the dist/ folder to gh-pages
```

For a user/org root site (`https://USER.github.io/`), keep `base` as `/`.

## Features

- Address search → fly to site on satellite imagery
- Box draw + polygon pen tool with sq ft / acre calc
- Per-service pricing from the drawn area
- Home base → drive miles / minutes + travel fees
- Editable rates, complexity / rush, quote export
