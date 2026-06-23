import { useLocation } from 'react-router-dom';
import { useActiveDS, useActiveDSId } from './ds-context';

/**
 * Computes the (eyebrow, title) pair for the active route from the active DS's
 * catalog. UI-tech agnostic — each per-DS shell renders its own header using
 * its own primitives (Tamagui Typography, MUI Typography, plain <h>, etc.).
 */
export function usePageHeader(): { eyebrow?: string; title: string } {
  const { pathname } = useLocation();
  const ds = useActiveDS();
  const dsId = useActiveDSId();
  const homePath = `/${dsId}`;
  if (pathname === homePath || pathname === '/') return { eyebrow: ds.label, title: 'Home' };
  for (const group of ds.registry) {
    const entry = group.entries.find((e) => `${homePath}/${e.slug}` === pathname);
    if (entry) return { eyebrow: `${ds.label} · ${group.label}`, title: entry.title };
  }
  return { title: 'GL Design Repository' };
}
