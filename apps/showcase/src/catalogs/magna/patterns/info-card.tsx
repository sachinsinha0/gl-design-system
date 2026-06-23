import { Container, YStack, XStack, Typography, Button, Avatar } from '@gl/elements';

export type InfoCardProps = {
  title: string;
  subtitle?: string;
  body?: string;
  avatarUrl?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function InfoCard({
  title,
  subtitle,
  body,
  avatarUrl,
  actionLabel,
  onAction
}: InfoCardProps) {
  return (
    <Container container="lowest" outlined padding="$3" gap="$2" width={320}>
      <XStack gap="$2" alignItems="center">
        {avatarUrl ? (
          <Avatar circular size={40}>
            <Avatar.Image src={avatarUrl} />
            <Avatar.Fallback backgroundColor="$primaryContainer" />
          </Avatar>
        ) : null}
        <YStack>
          <Typography variant="subtitle1">{title}</Typography>
          {subtitle ? (
            <Typography variant="caption1" color="$onSurfaceVariant">
              {subtitle}
            </Typography>
          ) : null}
        </YStack>
      </XStack>
      {body ? <Typography variant="body2">{body}</Typography> : null}
      {actionLabel ? (
        <Button variant="tonal" size="sm" onPress={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Container>
  );
}
