import { Link } from 'react-router-dom';
import { YStack, XStack, Typography } from '@gl/elements';
import { InfoCard } from '../../patterns';

const PROTOTYPES = [
  {
    slug: 'proto-login',
    title: 'Sign in',
    subtitle: 'Auth screen',
    body: 'A branded split-panel sign-in with value props, email/password, and social login.'
  },
  {
    slug: 'proto-feed',
    title: 'Learner home',
    subtitle: 'Dashboard',
    body: 'A greeting, a continue-learning hero with progress, learning stats, and course rails.'
  },
  {
    slug: 'proto-detail',
    title: 'Course detail',
    subtitle: 'Detail + curriculum',
    body: 'A course hero, mentor & rating, resume CTA, and tabbed overview / curriculum / reviews.'
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
