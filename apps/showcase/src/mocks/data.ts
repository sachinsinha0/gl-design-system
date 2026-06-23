export const AVATAR_URL = 'https://i.pravatar.cc/120?img=12';
export const AVATAR_URL_2 = 'https://i.pravatar.cc/120?img=32';
export const AVATAR_URL_3 = 'https://i.pravatar.cc/120?img=5';
export const SAMPLE_IMAGE = 'https://images.pexels.com/photos/239548/pexels-photo-239548.jpeg?w=640';

export const PEOPLE = [
  { id: '1', name: 'Aanya Sharma', role: 'Mentor', avatar: AVATAR_URL },
  { id: '2', name: 'Rohan Mehta', role: 'Learner', avatar: AVATAR_URL_2 },
  { id: '3', name: 'Priya Nair', role: 'Learner', avatar: undefined }
];

export const SELECT_OPTIONS = [
  { label: 'Data Science', value: 'ds' },
  { label: 'Machine Learning', value: 'ml' },
  { label: 'Cloud Computing', value: 'cloud' },
  { label: 'Cybersecurity', value: 'sec' }
];

export type Course = {
  id: string;
  title: string;
  category: string;
  mentor: string;
  mentorAvatar?: string;
  thumbnail: string;
  lessons: number;
  hours: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  learners: string;
  /** 0–100; 0 = not started */
  progress: number;
};

export const COURSES: Course[] = [
  {
    id: 'ds',
    title: 'Intro to Data Science',
    category: 'Data Science',
    mentor: 'Aanya Sharma',
    mentorAvatar: AVATAR_URL,
    thumbnail: 'https://picsum.photos/seed/datascience/640/360',
    lessons: 24,
    hours: 6,
    level: 'Beginner',
    rating: 4.8,
    learners: '12,480',
    progress: 65
  },
  {
    id: 'ml',
    title: 'Machine Learning Foundations',
    category: 'Machine Learning',
    mentor: 'Rohan Mehta',
    mentorAvatar: AVATAR_URL_2,
    thumbnail: 'https://picsum.photos/seed/ml/640/360',
    lessons: 32,
    hours: 9,
    level: 'Intermediate',
    rating: 4.7,
    learners: '8,210',
    progress: 20
  },
  {
    id: 'cloud',
    title: 'Cloud Computing Essentials',
    category: 'Cloud',
    mentor: 'Priya Nair',
    mentorAvatar: AVATAR_URL_3,
    thumbnail: 'https://picsum.photos/seed/cloud/640/360',
    lessons: 18,
    hours: 5,
    level: 'Beginner',
    rating: 4.6,
    learners: '5,940',
    progress: 0
  },
  {
    id: 'sec',
    title: 'Cybersecurity Basics',
    category: 'Security',
    mentor: 'Self-paced',
    mentorAvatar: undefined,
    thumbnail: 'https://picsum.photos/seed/security/640/360',
    lessons: 21,
    hours: 7,
    level: 'Beginner',
    rating: 4.9,
    learners: '9,330',
    progress: 100
  }
];
