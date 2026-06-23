import type { ComponentType, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { YStack, XStack, Stack, Typography, ScrollView, Separator } from '@gl/elements';
import { Home } from '@tamagui/lucide-icons';
import { catalog } from '../catalog/registry';

function BrandMark() {
  return (
    <XStack alignItems="center" gap="$2" paddingHorizontal="$3" paddingVertical="$3">
      <Stack
        width={36}
        height={36}
        borderRadius={10}
        backgroundColor="$primary"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="subtitle1" color="$onPrimary">
          GL
        </Typography>
      </Stack>
      <YStack>
        <Typography variant="subtitle1">GL Design</Typography>
        <Typography variant="caption2" color="$onSurfaceVariant">
          Design system catalog
        </Typography>
      </YStack>
    </XStack>
  );
}

function NavRow({
  to,
  label,
  active,
  icon
}: {
  to: string;
  label: string;
  active: boolean;
  icon?: ReactNode;
}) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <XStack
        alignItems="center"
        gap="$2"
        paddingHorizontal="$2.5"
        paddingVertical="$2"
        borderRadius={10}
        backgroundColor={active ? '$primaryContainer' : 'transparent'}
        hoverStyle={{ backgroundColor: active ? '$primaryContainer' : '$surfaceContainerHigh' }}
        cursor="pointer"
      >
        {icon ? <Stack width={18}>{icon}</Stack> : null}
        <Typography
          variant="body2"
          color={active ? '$onPrimaryContainer' : '$onSurface'}
        >
          {label}
        </Typography>
      </XStack>
    </Link>
  );
}

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <YStack
      width={264}
      height="100%"
      backgroundColor="$surfaceContainerLow"
      borderRightWidth={1}
      borderColor="$outlineVariant"
    >
      <BrandMark />
      <Separator />
      <ScrollView flex={1} contentContainerStyle={{ padding: 12, gap: 4 }}>
        <NavRow
          to="/"
          label="Home"
          active={pathname === '/'}
          icon={<Home size={18} color={pathname === '/' ? '$onPrimaryContainer' : '$onSurfaceVariant'} />}
        />
        {catalog.map((group) => {
          const GroupIcon = group.icon as
            | ComponentType<{ size?: number; color?: string }>
            | undefined;
          return (
            <YStack key={group.id} gap="$0.5" marginTop="$3">
              <XStack alignItems="center" gap="$1.5" paddingHorizontal="$2.5" paddingBottom="$1">
                {GroupIcon ? <GroupIcon size={14} color="$onSurfaceVariant" /> : null}
                <Typography variant="overline" color="$onSurfaceVariant">
                  {group.label}
                </Typography>
              </XStack>
              {group.entries.map((entry) => (
                <NavRow
                  key={entry.slug}
                  to={`/${entry.slug}`}
                  label={entry.title}
                  active={pathname === `/${entry.slug}`}
                />
              ))}
            </YStack>
          );
        })}
      </ScrollView>
      <Separator />
      <XStack paddingHorizontal="$3" paddingVertical="$2.5" justifyContent="space-between" alignItems="center">
        <Typography variant="caption2" color="$onSurfaceVariant">
          v0.0.1
        </Typography>
        <Typography variant="caption2" color="$onSurfaceVariant">
          Not for production
        </Typography>
      </XStack>
    </YStack>
  );
}
