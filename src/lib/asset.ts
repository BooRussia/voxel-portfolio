/**
 * Resolve a path under `public/` against Vite's `base`.
 * Required for GitHub Pages project sites (`/voxel-portfolio/…`).
 */
export function asset(path: string): string {
  if (!path || /^https?:\/\//i.test(path) || path.startsWith('data:')) {
    return path
  }
  const base = import.meta.env.BASE_URL // always ends with /
  return `${base}${path.replace(/^\//, '')}`
}
