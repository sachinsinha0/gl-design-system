import {
  YStack,
  XStack,
  Stack,
  ScrollView,
  Container,
  Typography,
  Button,
  Avatar,
  IconButton,
  Icon
} from '@gl/elements';
import { Link } from 'react-router-dom';
import { Bell, Search, Flame, Clock, Award, Play } from '@tamagui/lucide-icons';
import { ProgressBar, CourseCard } from '../patterns';
import { COURSES, AVATAR_URL } from '../../mocks/data';

const STATS = [
  { icon: Flame, label: 'Day streak', value: '7' },
  { icon: Clock, label: 'Hours learned', value: '24' },
  { icon: Award, label: 'Certificates', value: '3' }
];

export function FeedPrototype() {
  const current = COURSES[0];
  const myCourses = COURSES.filter((c) => c.progress > 0);
  const recommended = COURSES.filter((c) => c.progress === 0);

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* Header */}
      <XStack
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal="$4"
        paddingVertical="$3"
        gap="$3"
      >
        <YStack>
          <Typography variant="body2" color="$onSurfaceVariant">
            Good morning,
          </Typography>
          <Typography variant="h4">Aanya 👋</Typography>
        </YStack>
        <XStack alignItems="center" gap="$1">
          <IconButton icon={Search} variant="text" onPress={() => {}} />
          <IconButton icon={Bell} variant="text" onPress={() => {}} />
          <Avatar circular size={36}>
            <Avatar.Image src={AVATAR_URL} />
          </Avatar>
        </XStack>
      </XStack>

      <ScrollView>
        <YStack gap="$5" padding="$4" paddingTop="$2" paddingBottom="$6">
          {/* Continue learning */}
          <YStack gap="$2">
            <Typography variant="subtitle1">Continue learning</Typography>
            <Container container="lowest" outlined borderRadius={20} overflow="hidden">
              <XStack flexWrap="wrap">
                <Stack
                  flex={1}
                  minWidth={220}
                  height={170}
                  backgroundColor="$surfaceContainerHigh"
                  style={{
                    backgroundImage: `url(${current.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <YStack flex={2} minWidth={260} padding="$4" gap="$3" justifyContent="center">
                  <YStack gap="$1">
                    <Typography variant="overline" color="$primary">
                      {current.category}
                    </Typography>
                    <Typography variant="h5">{current.title}</Typography>
                    <Typography variant="caption1" color="$onSurfaceVariant">
                      Module 3 · Lesson 2 of {current.lessons}
                    </Typography>
                  </YStack>
                  <YStack gap="$1">
                    <ProgressBar value={current.progress} />
                    <Typography variant="caption1" color="$onSurfaceVariant">
                      {current.progress}% complete
                    </Typography>
                  </YStack>
                  <Link to="/proto-detail" style={{ textDecoration: 'none', alignSelf: 'flex-start' }}>
                    <Button variant="contained" size="lg" startIcon={Play} onPress={() => {}}>
                      Resume
                    </Button>
                  </Link>
                </YStack>
              </XStack>
            </Container>
          </YStack>

          {/* Stats */}
          <XStack gap="$3" flexWrap="wrap">
            {STATS.map((s) => {
              const StatIcon = s.icon;
              return (
                <Container
                  key={s.label}
                  container="lowest"
                  outlined
                  borderRadius={16}
                  padding="$3"
                  flex={1}
                  minWidth={150}
                >
                  <XStack alignItems="center" gap="$2">
                    <Stack
                      width={38}
                      height={38}
                      borderRadius={10}
                      backgroundColor="$primaryContainer"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon icon={<StatIcon />} size={18} color="$onPrimaryContainer" />
                    </Stack>
                    <YStack>
                      <Typography variant="h5">{s.value}</Typography>
                      <Typography variant="caption1" color="$onSurfaceVariant">
                        {s.label}
                      </Typography>
                    </YStack>
                  </XStack>
                </Container>
              );
            })}
          </XStack>

          {/* My courses */}
          <YStack gap="$3">
            <XStack justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1">My courses</Typography>
              <Button variant="text" size="sm" onPress={() => {}}>
                See all
              </Button>
            </XStack>
            <XStack gap="$3" flexWrap="wrap">
              {myCourses.map((c) => (
                <Link key={c.id} to="/proto-detail" style={{ textDecoration: 'none' }}>
                  <CourseCard course={c} onPress={() => {}} />
                </Link>
              ))}
            </XStack>
          </YStack>

          {/* Recommended */}
          <YStack gap="$3">
            <Typography variant="subtitle1">Recommended for you</Typography>
            <XStack gap="$3" flexWrap="wrap">
              {recommended.map((c) => (
                <Link key={c.id} to="/proto-detail" style={{ textDecoration: 'none' }}>
                  <CourseCard course={c} onPress={() => {}} />
                </Link>
              ))}
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
