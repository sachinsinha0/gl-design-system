import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { YStack, XStack, Stack, Typography, Container, Button, Icon, Separator } from '@gl/elements';
import { ArrowRight, Sparkles, Palette } from '@tamagui/lucide-icons';
import { catalog } from './registry';
import type { CatalogGroup } from '../_shared/types';
import { useActiveDSId } from '../../platform/ds-context';
import { InstallationPage } from './get-started/installation-page';

const THEME_COUNT = 22;

function groupCount(id: string): number {
  return catalog.find((g) => g.id === id)?.entries.length ?? 0;
}

const STATS: { value: string; label: string }[] = [
  { value: String(groupCount('foundations')), label: 'Foundations' },
  { value: String(groupCount('components')), label: 'Components' },
  { value: `${THEME_COUNT}`, label: 'Color themes' },
  { value: String(groupCount('prototypes')), label: 'Prototypes' }
];

function firstSlug(group: CatalogGroup): string {
  return group.entries[0]?.slug ?? '';
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <Container
      container="lowest"
      outlined
      flex={1}
      minWidth={150}
      padding="$3"
      borderRadius={16}
      gap="$1"
    >
      <Typography variant="h2" color="$primary">
        {value}
      </Typography>
      <Typography variant="caption1" color="$onSurfaceVariant">
        {label}
      </Typography>
    </Container>
  );
}

function GroupCard({ group, dsId }: { group: CatalogGroup; dsId: string }) {
  const GroupIcon = group.icon as ComponentType<{ size?: number; color?: string }> | undefined;
  const preview = group.entries.slice(0, 4).map((e) => e.title);
  return (
    <Link to={`/${dsId}/${firstSlug(group)}`} style={{ textDecoration: 'none', flex: 1, minWidth: 260 }}>
      <Container
        container="lowest"
        outlined
        padding="$4"
        borderRadius={18}
        gap="$3"
        height="100%"
        hoverStyle={{ borderColor: '$primary', backgroundColor: '$surfaceContainerLow' }}
        pressStyle={{ opacity: 0.9 }}
        cursor="pointer"
      >
        <Stack
          width={44}
          height={44}
          borderRadius={12}
          backgroundColor="$primaryContainer"
          alignItems="center"
          justifyContent="center"
        >
          {GroupIcon ? <GroupIcon size={22} color="$onPrimaryContainer" /> : null}
        </Stack>
        <YStack gap="$1.5">
          <XStack alignItems="center" gap="$2">
            <Typography variant="h5">{group.label}</Typography>
            <Container
              container="high"
              paddingHorizontal="$1.5"
              paddingVertical={2}
              borderRadius={999}
            >
              <Typography variant="caption2" color="$onSurfaceVariant">
                {group.entries.length}
              </Typography>
            </Container>
          </XStack>
          <Typography variant="body2" color="$onSurfaceVariant">
            {group.description}
          </Typography>
        </YStack>
        <XStack gap="$1.5" flexWrap="wrap">
          {preview.map((title) => (
            <Container
              key={title}
              container="high"
              paddingHorizontal="$2"
              paddingVertical="$0.5"
              borderRadius={999}
            >
              <Typography variant="caption1" color="$onSurfaceVariant">
                {title}
              </Typography>
            </Container>
          ))}
        </XStack>
        <XStack alignItems="center" gap="$1" marginTop="auto">
          <Typography variant="subtitle2" color="$primary">
            Explore {group.label.toLowerCase()}
          </Typography>
          <Icon icon={<ArrowRight />} size={16} color="$primary" />
        </XStack>
      </Container>
    </Link>
  );
}

export function HomePage() {
  const dsId = useActiveDSId();
  return (
    <YStack gap="$5">
      {/* Hero */}
      <Container
        backgroundColor="$primaryFixedOpacity16P"
        borderRadius={24}
        padding="$6"
        gap="$4"
        overflow="hidden"
      >
        <XStack
          alignItems="center"
          gap="$2"
          alignSelf="flex-start"
          backgroundColor="$surface"
          paddingHorizontal="$2.5"
          paddingVertical="$1"
          borderRadius={999}
        >
          <Icon icon={<Sparkles />} size={14} color="$primary" />
          <Typography variant="overline" color="$primary">
            Design &amp; prototyping environment
          </Typography>
        </XStack>
        <YStack gap="$2" maxWidth={680}>
          <Typography variant="h1">The GL Design System</Typography>
          <Typography variant="body1" color="$onSurfaceVariant">
            A live catalog of every color, type style, component and pattern from
            gl-app-native — plus a playground to compose new screens. Browse the building
            blocks, switch themes, and prototype freely. Nothing here ships to production.
          </Typography>
        </YStack>
        <XStack gap="$2" flexWrap="wrap">
          <Link to={`/${dsId}/buttons`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" endIcon={ArrowRight}>
              Browse components
            </Button>
          </Link>
          <Link to={`/${dsId}/colors`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" startIcon={Palette}>
              View foundations
            </Button>
          </Link>
          <Link to={`/${dsId}/prototypes`} style={{ textDecoration: 'none' }}>
            <Button variant="text">See prototypes</Button>
          </Link>
        </XStack>
      </Container>

      {/* Stats */}
      <XStack gap="$3" flexWrap="wrap">
        {STATS.map((s) => (
          <StatTile key={s.label} value={s.value} label={s.label} />
        ))}
      </XStack>

      {/* Group cards */}
      <YStack gap="$3">
        <Typography variant="overline" color="$onSurfaceVariant">
          Explore the system
        </Typography>
        <XStack gap="$3" flexWrap="wrap" alignItems="stretch">
          {catalog.map((group) => (
            <GroupCard key={group.id} group={group} dsId={dsId} />
          ))}
        </XStack>
      </YStack>

      {/* Installation */}
      <Separator />
      <YStack gap="$2">
        <Typography variant="overline" color="$onSurfaceVariant">Get started</Typography>
        <InstallationPage />
      </YStack>
    </YStack>
  );
}
