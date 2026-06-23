import { XStack, YStack, Typography } from '@gl/elements';
import { useLocation } from 'react-router-dom';
import { useActiveDS, useActiveDSId } from '../platform/ds-context';
import { ThemeSwitcher } from './theme-switcher';
import { DSSwitcher } from './ds-switcher';

export function TopBar() {
  const { pathname } = useLocation();
  const ds = useActiveDS();
  const dsId = useActiveDSId();
  const homePath = `/${dsId}`;
  const { eyebrow, title } = (() => {
    if (pathname === homePath || pathname === '/') return { eyebrow: ds.label, title: 'Home' };
    for (const group of ds.registry) {
      const entry = group.entries.find((e) => `${homePath}/${e.slug}` === pathname);
      if (entry) return { eyebrow: `${ds.label} · ${group.label}`, title: entry.title };
    }
    return { eyebrow: undefined as string | undefined, title: 'GL Design Repository' };
  })();
  return (
    <XStack
      height={68}
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="$5"
      borderBottomWidth={1}
      borderColor="$outlineVariant"
      backgroundColor="$surface"
    >
      <YStack>
        {eyebrow ? (
          <Typography variant="overline" color="$onSurfaceVariant">
            {eyebrow}
          </Typography>
        ) : null}
        <Typography variant="h4">{title}</Typography>
      </YStack>
      <XStack gap="$2" alignItems="center">
        <DSSwitcher />
        <ThemeSwitcher />
      </XStack>
    </XStack>
  );
}
