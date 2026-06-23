import { XStack, YStack, Typography, Avatar, Container, IconButton } from '@gl/elements';
import { ChevronRight } from '@tamagui/lucide-icons';

export type ListItemProps = {
  title: string;
  meta?: string;
  avatarUrl?: string;
  onPress?: () => void;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function ListItem({ title, meta, avatarUrl, onPress }: ListItemProps) {
  const interactive = Boolean(onPress);
  return (
    <XStack
      gap="$3"
      alignItems="center"
      paddingVertical="$2"
      paddingHorizontal="$2"
      borderRadius="$2"
      onPress={onPress}
      cursor={interactive ? 'pointer' : undefined}
      pressStyle={interactive ? { backgroundColor: '$surfaceVariant' } : undefined}
      hoverStyle={interactive ? { backgroundColor: '$surfaceVariant' } : undefined}>
      {avatarUrl ? (
        <Avatar circular size={40}>
          <Avatar.Image src={avatarUrl} />
          <Avatar.Fallback backgroundColor="$primaryContainer" />
        </Avatar>
      ) : (
        <Container
          width={40}
          height={40}
          borderRadius={9999}
          backgroundColor="$primaryContainer"
          alignItems="center"
          justifyContent="center">
          <Typography variant="subtitle2" color="$onPrimaryContainer">
            {getInitials(title)}
          </Typography>
        </Container>
      )}
      <YStack flex={1}>
        <Typography variant="subtitle2">{title}</Typography>
        {meta ? (
          <Typography variant="caption1" color="$onSurfaceVariant">
            {meta}
          </Typography>
        ) : null}
      </YStack>
      {interactive ? <IconButton icon={ChevronRight} variant="text" /> : null}
    </XStack>
  );
}
