import { YStack, XStack, ScrollView, Container, Typography, Chip, Button } from '@gl/elements';
import { ScreenAppBar, EmptyState } from '../../patterns';
import { SAMPLE_IMAGE } from '../../mocks/data';

const TOPICS = ['Python', 'Statistics', 'Pandas', 'Visualization'];

export function DetailPrototype() {
  return (
    <YStack flex={1} backgroundColor="$background">
      <ScreenAppBar title="Course detail" onBack={() => {}} />
      <ScrollView>
        <YStack gap="$4" padding="$3" paddingBottom="$6">
          <Container
            container="high"
            height={180}
            borderRadius="$3"
            overflow="hidden"
            justifyContent="flex-end"
            padding="$3"
            style={{
              backgroundImage: `url(${SAMPLE_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          <YStack gap="$1">
            <Typography variant="h3">Intro to Data Science</Typography>
            <Typography variant="caption1" color="$onSurfaceVariant">
              12 lessons · 4 hours · Beginner
            </Typography>
          </YStack>

          <Typography variant="body2">
            Build a practical foundation in data science: load and clean datasets, explore them with
            descriptive statistics, and communicate findings with clear visualizations. Each lesson
            pairs a short concept with a hands-on exercise.
          </Typography>

          <YStack gap="$2">
            <Typography variant="subtitle2">Topics</Typography>
            <XStack flexWrap="wrap" gap="$2">
              {TOPICS.map((topic) => (
                <Chip key={topic} label={topic} variant="outlined" />
              ))}
            </XStack>
          </YStack>

          <YStack gap="$2">
            <Typography variant="subtitle2">Reviews</Typography>
            <Container container="lowest" outlined borderRadius="$3">
              <EmptyState
                title="No reviews yet"
                description="Be the first to share what you thought about this course."
                actionLabel="Write a review"
              />
            </Container>
          </YStack>

          <Button variant="contained" width="100%" onPress={() => {}}>
            Enroll now
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
