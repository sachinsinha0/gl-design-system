import { YStack, Typography, Button } from '@gl/elements';
import { Inbox } from '@tamagui/lucide-icons';

export type EmptyStateProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <YStack alignItems="center" gap="$3" padding="$5">
      <Inbox size={48} color="$onSurfaceVariant" />
      <Typography variant="h4">{title}</Typography>
      {description ? (
        <Typography variant="body2" color="$onSurfaceVariant" textAlign="center">
          {description}
        </Typography>
      ) : null}
      {actionLabel ? (
        <Button variant="contained" size="sm" onPress={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </YStack>
  );
}
