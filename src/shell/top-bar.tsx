import { XStack, Typography } from '@gl/elements';
import { useLocation } from 'react-router-dom';
import { allEntries } from '../catalog/registry';
import { ThemeSwitcher } from './theme-switcher';
export function TopBar() {
  const { pathname } = useLocation();
  const current = allEntries().find((e) => `/${e.slug}` === pathname);
  return (
    <XStack height={64} alignItems="center" justifyContent="space-between" paddingHorizontal="$4" borderBottomWidth={1} borderColor="$outlineVariant" backgroundColor="$surface">
      <Typography variant="h4">{current?.title ?? 'GL Design Repository'}</Typography>
      <ThemeSwitcher />
    </XStack>
  );
}
