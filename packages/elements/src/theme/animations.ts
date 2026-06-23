import { createAnimations } from '@tamagui/animations-react-native';

export const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60
  },
  quicker: {
    type: 'spring',
    damping: 40,
    stiffness: 600
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250
  },
  fast: {
    damping: 30,
    mass: 1.2,
    stiffness: 250
  },
  medium: {
    damping: 20,
    mass: 0.9,
    stiffness: 100
  },
  slow: {
    damping: 20,
    stiffness: 60
  }
});
