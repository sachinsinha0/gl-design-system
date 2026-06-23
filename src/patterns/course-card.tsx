import { YStack, XStack, Stack, Container, Typography, Avatar, Icon } from '@gl/elements';
import { Star, CheckCircle2 } from '@tamagui/lucide-icons';
import type { Course } from '../mocks/data';
import { ProgressBar } from './progress-bar';

export type CourseCardProps = {
  course: Course;
  width?: number;
  onPress?: () => void;
};

export function CourseCard({ course, width = 280, onPress }: CourseCardProps) {
  const started = course.progress > 0;
  const done = course.progress >= 100;
  return (
    <Container
      container="lowest"
      outlined
      borderRadius={16}
      overflow="hidden"
      width={width}
      cursor={onPress ? 'pointer' : 'default'}
      hoverStyle={onPress ? { borderColor: '$primary' } : undefined}
      pressStyle={onPress ? { opacity: 0.92 } : undefined}
      onPress={onPress}
    >
      <Stack
        height={150}
        backgroundColor="$surfaceContainerHigh"
        style={{
          backgroundImage: `url(${course.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <YStack padding="$3" gap="$2">
        <XStack justifyContent="space-between" alignItems="center">
          <Typography variant="overline" color="$primary">
            {course.category}
          </Typography>
          <XStack alignItems="center" gap="$0.5">
            <Icon icon={<Star />} size={13} color="$primary" />
            <Typography variant="caption1" color="$onSurfaceVariant">
              {course.rating.toFixed(1)}
            </Typography>
          </XStack>
        </XStack>

        <Typography variant="subtitle1" numberOfLines={2}>
          {course.title}
        </Typography>

        <XStack alignItems="center" gap="$1.5">
          {course.mentorAvatar ? (
            <Avatar circular size={20}>
              <Avatar.Image src={course.mentorAvatar} />
            </Avatar>
          ) : (
            <Stack
              width={20}
              height={20}
              borderRadius={999}
              backgroundColor="$primaryContainer"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="caption2" color="$onPrimaryContainer">
                {course.mentor.charAt(0)}
              </Typography>
            </Stack>
          )}
          <Typography variant="caption1" color="$onSurfaceVariant" numberOfLines={1} flexShrink={1}>
            {course.mentor}
          </Typography>
        </XStack>

        {started ? (
          <YStack gap="$1" paddingTop="$0.5">
            <ProgressBar value={course.progress} />
            <XStack alignItems="center" gap="$1">
              {done ? <Icon icon={<CheckCircle2 />} size={13} color="$primary" /> : null}
              <Typography variant="caption1" color="$onSurfaceVariant">
                {done ? 'Completed' : `${course.progress}% complete`}
              </Typography>
            </XStack>
          </YStack>
        ) : (
          <Typography variant="caption1" color="$onSurfaceVariant">
            {course.lessons} lessons · {course.hours}h · {course.level}
          </Typography>
        )}
      </YStack>
    </Container>
  );
}
