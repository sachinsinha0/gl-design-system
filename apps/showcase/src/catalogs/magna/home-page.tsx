import { YStack, XStack, Typography, Container, Icon } from '@gl/elements';
import { Sparkles } from '@tamagui/lucide-icons';
import { InstallationPage } from './get-started/installation-page';

export function HomePage() {
  return (
    <YStack gap="$5">
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
            Tamagui · React-Native-Web · M3
          </Typography>
        </XStack>
        <YStack gap="$2" maxWidth={680}>
          <Typography variant="h1">Magna Design System</Typography>
          <Typography variant="body1" color="$onSurfaceVariant">
            Learner-facing UI for gl-app-native — colors, type, components, and patterns
            built on Tamagui + Material 3. Import from{' '}
            <Typography tag="span" variant="body1" color="$primary">@gl/elements</Typography>,
            pick up the AI skill, and ship.
          </Typography>
        </YStack>
      </Container>

      <YStack gap="$3">
        <Typography variant="h3">Install</Typography>
        <InstallationPage />
      </YStack>
    </YStack>
  );
}
