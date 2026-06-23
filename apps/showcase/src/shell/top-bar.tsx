import { XStack, YStack, Typography } from '@gl/elements';
import { useLocation } from 'react-router-dom';
import { catalog } from '../catalog/registry';
import { ThemeSwitcher } from './theme-switcher';

function useCurrent(pathname: string): { eyebrow?: string; title: string } {
  if (pathname === '/') return { title: 'Home' };
  for (const group of catalog) {
    const entry = group.entries.find((e) => `/${e.slug}` === pathname);
    if (entry) return { eyebrow: group.label, title: entry.title };
  }
  return { title: 'GL Design Repository' };
}

export function TopBar() {
  const { pathname } = useLocation();
  const { eyebrow, title } = useCurrent(pathname);
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
      <ThemeSwitcher />
    </XStack>
  );
}
