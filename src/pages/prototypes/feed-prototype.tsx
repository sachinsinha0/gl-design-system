import { useState } from 'react';
import { YStack, ScrollView, Typography, Tabs, IconButton } from '@gl/elements';
import { Search } from '@tamagui/lucide-icons';
import { ScreenAppBar, ListItem } from '../../patterns';
import { PEOPLE } from '../../mocks/data';

type Course = {
  id: string;
  title: string;
  meta: string;
  avatar?: string;
  inProgress: boolean;
};

const COURSES: Course[] = [
  { id: 'c1', title: 'Intro to Data Science', meta: `${PEOPLE[0].name} · 12 lessons`, avatar: PEOPLE[0].avatar, inProgress: true },
  { id: 'c2', title: 'Machine Learning Foundations', meta: `${PEOPLE[1].name} · 18 lessons`, avatar: PEOPLE[1].avatar, inProgress: true },
  { id: 'c3', title: 'Cloud Computing Essentials', meta: `${PEOPLE[2].name} · 9 lessons`, avatar: PEOPLE[2].avatar, inProgress: false },
  { id: 'c4', title: 'Cybersecurity Basics', meta: 'Self-paced · 14 lessons', avatar: undefined, inProgress: false }
];

const TABS = [
  { value: 'all', label: 'All' },
  { value: 'in-progress', label: 'In progress' }
];

export function FeedPrototype() {
  const [tab, setTab] = useState('all');
  const courses = tab === 'in-progress' ? COURSES.filter((c) => c.inProgress) : COURSES;

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScreenAppBar
        title="Courses"
        trailing={<IconButton icon={Search} variant="text" onPress={() => {}} />}
      />
      <YStack paddingHorizontal="$3" paddingTop="$2">
        <Tabs value={tab} onValueChange={setTab}>
          <Tabs.List>
            {TABS.map((t) => (
              <Tabs.Tab key={t.value} value={t.value}>
                <Typography variant="subtitle2">{t.label}</Typography>
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </YStack>
      <ScrollView>
        <YStack gap="$1" padding="$3">
          {courses.map((course) => (
            <ListItem
              key={course.id}
              title={course.title}
              meta={course.meta}
              avatarUrl={course.avatar}
              onPress={() => {}}
            />
          ))}
        </YStack>
      </ScrollView>
    </YStack>
  );
}
