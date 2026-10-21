/**
 * Resolves an asset URL so it works seamlessly both locally and on GitHub Pages
 * under repository subpaths (e.g. /portfolio.me/).
 */
export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Strip leading slash if any
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // import.meta.env.BASE_URL is set by Vite (e.g. '/portfolio.me/' or './' or '/')
  const base = import.meta.env.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  
  return `${prefix}${cleanPath}`;
}
