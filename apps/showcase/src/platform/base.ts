// Vite base path: "/" in dev, "/gl-design-system/" on GitHub Pages.
// React Router (basename-aware) handles <Link>s automatically, but the shells
// read/write the URL directly for DS detection and the hard-reload DS switch —
// those raw paths must account for the base, hence these helpers.

const BASE = import.meta.env.BASE_URL.replace(/\/$/, ''); // "" or "/gl-design-system"

/**
 * Prefix an app-absolute path (e.g. "/jedi/colors") with the Vite base so it can
 * be handed to window.location.assign / history.pushState as a real URL.
 */
export function withBase(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}`;
}

/**
 * window.location.pathname with the Vite base stripped, so the first segment is
 * the DS id (e.g. "/gl-design-system/jedi" -> "/jedi"). Mirrors what React
 * Router's useLocation() already returns (basename-stripped).
 */
export function pathWithoutBase(pathname: string): string {
  if (BASE && pathname.startsWith(BASE)) {
    const rest = pathname.slice(BASE.length);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname;
}
