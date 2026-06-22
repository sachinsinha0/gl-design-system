import { Link, useLocation } from 'react-router-dom';
import { YStack, Typography, Separator } from '@gl/elements';
import { catalog } from '../catalog/registry';
export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <YStack width={260} backgroundColor="$surfaceContainerLow" borderRightWidth={1} borderColor="$outlineVariant" padding="$3" gap="$3">
      <Typography variant="h4">GL Design</Typography>
      <Separator />
      {catalog.map((group) => (
        <YStack key={group.id} gap="$1">
          <Typography variant="overline" color="$onSurfaceVariant">{group.label}</Typography>
          {group.entries.map((entry) => {
            const active = pathname === `/${entry.slug}`;
            return (
              <Link key={entry.slug} to={`/${entry.slug}`} style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color={active ? '$primary' : '$onSurface'} paddingVertical="$0.5">{entry.title}</Typography>
              </Link>
            );
          })}
        </YStack>
      ))}
    </YStack>
  );
}
