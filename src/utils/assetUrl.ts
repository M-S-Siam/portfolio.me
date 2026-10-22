/**
 * Resolves public asset URLs cleanly across AI Studio preview,
 * local Vite development, custom domains, and GitHub Pages subpaths
 * (e.g., https://m-s-siam.github.io/portfolio.me/).
 */
export function getAssetUrl(path: string): string {
  if (!path) return path;

  // Leave external URLs, data URIs, and blob URLs untouched
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';

  // Normalize leading slash so we don't duplicate slashes or break relative base URLs
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  return `${normalizedBase}${cleanPath}`;
}
