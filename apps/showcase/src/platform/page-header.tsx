import { useLocation } from 'react-router-dom';
import { YStack, Typography } from '@gl/elements';
import { useActiveDS, useActiveDSId } from './ds-context';

/**
 * Derives the (eyebrow, title) pair for the currently active route from the
 * active DS's catalog. Pages no longer need to render their own page-level
 * heading — the shell renders <PageHeader /> above <Outlet />.
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

export function PageHeader() {
  const { eyebrow, title } = usePageHeader();
  return (
    <YStack paddingBottom="$3" gap="$0.5">
      {eyebrow ? (
        <Typography variant="overline" color="$onSurfaceVariant">
          {eyebrow}
        </Typography>
      ) : null}
      <Typography variant="h4">{title}</Typography>
    </YStack>
  );
}
