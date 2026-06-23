import { useState } from 'react';
import {
  YStack,
  XStack,
  Stack,
  ScrollView,
  Container,
  Typography,
  Chip,
  Button,
  Avatar,
  Icon,
  IconButton,
  Separator,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@gl/elements';
import { Share2, Bookmark, Star, Check, PlayCircle } from '@tamagui/lucide-icons';
import { ScreenAppBar, ProgressBar } from '../../patterns';
import { COURSES } from '../../mocks/data';

const course = COURSES[0];
const TOPICS = ['Python', 'Statistics', 'Pandas', 'Visualization'];
const LEARN = [
  'Load, clean and explore real datasets',
  'Compute and interpret descriptive statistics',
  'Build clear charts that communicate findings',
  'Frame a data problem from question to insight'
];
const MODULES: { title: string; lessons: [string, string][] }[] = [
  { title: '1 · Getting started', lessons: [['Welcome & course tour', '4 min'], ['Set up your notebook', '9 min']] },
  {
    title: '2 · Working with data',
    lessons: [['Loading datasets', '12 min'], ['Cleaning & missing values', '15 min'], ['Filtering & grouping', '11 min']]
  },
  { title: '3 · Telling the story', lessons: [['Descriptive statistics', '10 min'], ['Plotting with matplotlib', '14 min']] }
];

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <YStack alignItems="center" flex={1}>
      <Typography variant="subtitle1">{value}</Typography>
      <Typography variant="caption1" color="$onSurfaceVariant">
        {label}
      </Typography>
    </YStack>
  );
}

export function DetailPrototype() {
  const [tab, setTab] = useState('overview');

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScreenAppBar
        title="Course"
        onBack={() => {}}
        trailing={
          <XStack gap="$1">
            <IconButton icon={Share2} variant="text" onPress={() => {}} />
            <IconButton icon={Bookmark} variant="text" onPress={() => {}} />
          </XStack>
        }
      />
      <ScrollView>
        <YStack paddingBottom="$6">
          {/* Hero image */}
          <Stack
            height={200}
            backgroundColor="$surfaceContainerHigh"
            style={{
              backgroundImage: `url(${course.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          <YStack padding="$4" gap="$4">
            {/* Title block */}
            <YStack gap="$2">
              <Typography variant="overline" color="$primary">
                {course.category}
              </Typography>
              <Typography variant="h3">{course.title}</Typography>
              <XStack alignItems="center" gap="$2" flexWrap="wrap">
                <XStack alignItems="center" gap="$1.5">
                  <Avatar circular size={24}>
                    <Avatar.Image src={course.mentorAvatar} />
                  </Avatar>
                  <Typography variant="body2" color="$onSurfaceVariant">
                    {course.mentor}
                  </Typography>
                </XStack>
                <Typography variant="body2" color="$onSurfaceVariant">
                  ·
                </Typography>
                <XStack alignItems="center" gap="$1">
                  <Icon icon={<Star />} size={15} color="$primary" />
                  <Typography variant="body2" color="$onSurface">
                    {course.rating.toFixed(1)}
                  </Typography>
                  <Typography variant="body2" color="$onSurfaceVariant">
                    ({course.learners})
                  </Typography>
                </XStack>
              </XStack>
            </YStack>

            {/* Enrol / resume card */}
            <Container container="lowest" outlined borderRadius={16} padding="$4" gap="$3">
              <XStack>
                <StatItem value={String(course.lessons)} label="Lessons" />
                <Separator vertical />
                <StatItem value={`${course.hours}h`} label="Content" />
                <Separator vertical />
                <StatItem value={course.level} label="Level" />
              </XStack>
              <Separator />
              <YStack gap="$1">
                <ProgressBar value={course.progress} />
                <Typography variant="caption1" color="$onSurfaceVariant">
                  {course.progress}% complete · 8 of {course.lessons} lessons
                </Typography>
              </YStack>
              <Button variant="contained" size="lg" width="100%" startIcon={PlayCircle} onPress={() => {}}>
                Resume course
              </Button>
            </Container>

            {/* Tabs */}
            <Tabs value={tab} onValueChange={setTab}>
              <Tabs.List>
                <Tabs.Tab value="overview">
                  <Typography variant="subtitle2">Overview</Typography>
                </Tabs.Tab>
                <Tabs.Tab value="curriculum">
                  <Typography variant="subtitle2">Curriculum</Typography>
                </Tabs.Tab>
                <Tabs.Tab value="reviews">
                  <Typography variant="subtitle2">Reviews</Typography>
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Content value="overview">
                <YStack gap="$4" paddingTop="$3">
                  <Typography variant="body2">
                    Build a practical foundation in data science: load and clean datasets, explore
                    them with descriptive statistics, and communicate findings with clear
                    visualizations. Each lesson pairs a short concept with a hands-on exercise.
                  </Typography>
                  <YStack gap="$2">
                    <Typography variant="subtitle2">What you&apos;ll learn</Typography>
                    {LEARN.map((item) => (
                      <XStack key={item} gap="$2" alignItems="flex-start">
                        <Icon icon={<Check />} size={18} color="$primary" />
                        <Typography variant="body2" flexShrink={1}>
                          {item}
                        </Typography>
                      </XStack>
                    ))}
                  </YStack>
                  <YStack gap="$2">
                    <Typography variant="subtitle2">Topics</Typography>
                    <XStack flexWrap="wrap" gap="$2">
                      {TOPICS.map((t) => (
                        <Chip key={t} label={t} variant="outlined" />
                      ))}
                    </XStack>
                  </YStack>
                </YStack>
              </Tabs.Content>

              <Tabs.Content value="curriculum">
                <YStack gap="$2" paddingTop="$3">
                  {MODULES.map((m, i) => (
                    <Accordion
                      key={m.title}
                      container="lowest"
                      borderRadius={12}
                      defaultExpanded={i === 0}
                    >
                      <AccordionSummary>
                        <Typography variant="subtitle2">{m.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <YStack gap="$1">
                          {m.lessons.map(([name, dur]) => (
                            <XStack key={name} alignItems="center" gap="$2" paddingVertical="$1.5">
                              <Icon icon={<PlayCircle />} size={18} color="$primary" />
                              <Typography variant="body2" flexShrink={1}>
                                {name}
                              </Typography>
                              <Typography variant="caption1" color="$onSurfaceVariant">
                                {dur}
                              </Typography>
                            </XStack>
                          ))}
                        </YStack>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </YStack>
              </Tabs.Content>

              <Tabs.Content value="reviews">
                <YStack gap="$3" paddingTop="$3">
                  <XStack alignItems="center" gap="$3">
                    <Typography variant="h2">{course.rating.toFixed(1)}</Typography>
                    <YStack>
                      <XStack gap="$0.5">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Icon key={i} icon={<Star />} size={16} color="$primary" />
                        ))}
                      </XStack>
                      <Typography variant="caption1" color="$onSurfaceVariant">
                        {course.learners} learners
                      </Typography>
                    </YStack>
                  </XStack>
                  <Separator />
                  <YStack gap="$2">
                    <XStack alignItems="center" gap="$2">
                      <Avatar circular size={28}>
                        <Avatar.Image src={course.mentorAvatar} />
                      </Avatar>
                      <Typography variant="subtitle2">Rohan M.</Typography>
                    </XStack>
                    <Typography variant="body2" color="$onSurfaceVariant">
                      “Clear, practical, and well paced — the hands-on exercises made the concepts
                      actually stick.”
                    </Typography>
                  </YStack>
                </YStack>
              </Tabs.Content>
            </Tabs>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
