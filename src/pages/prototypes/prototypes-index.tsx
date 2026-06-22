import { Link } from 'react-router-dom';
import { YStack, XStack, Typography } from '@gl/elements';
import { InfoCard } from '../../patterns';

const PROTOTYPES = [
  {
    slug: 'proto-login',
    title: 'Login screen',
    subtitle: 'Auth template',
    body: 'A centered sign-in card with email + password fields and primary action.'
  },
  {
    slug: 'proto-feed',
    title: 'Feed screen',
    subtitle: 'List + tabs',
    body: 'An app-bar, segmented tabs, and a scrollable list of course rows.'
  },
  {
    slug: 'proto-detail',
    title: 'Detail screen',
    subtitle: 'Hero + content',
    body: 'A back-navigable detail view with hero, topic chips, and an empty section.'
  }
];

export function PrototypesIndex() {
  return (
    <YStack gap="$4">
      <YStack gap="$2" maxWidth={640}>
        <Typography variant="h4">Prototypes</Typography>
        <Typography variant="body2" color="$onSurfaceVariant">
          These are full-screen mockups assembled entirely from @gl/elements primitives and the
          reusable pattern blocks in src/patterns. They are intentionally self-contained: to start a
          new flow, copy one of these files, rename the component, register it in the catalog, and
          edit. Treat them as starting templates rather than shared components.
        </Typography>
      </YStack>
      <XStack flexWrap="wrap" gap="$3">
        {PROTOTYPES.map((proto) => (
          <Link key={proto.slug} to={`/${proto.slug}`} style={{ textDecoration: 'none' }}>
            <InfoCard
              title={proto.title}
              subtitle={proto.subtitle}
              body={proto.body}
              actionLabel="Open prototype"
            />
          </Link>
        ))}
      </XStack>
    </YStack>
  );
}
