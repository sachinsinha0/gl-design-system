import { useState } from 'react';
import {
  YStack,
  XStack,
  Stack,
  Container,
  Typography,
  TextField,
  Button,
  Separator,
  Icon
} from '@gl/elements';
import { Mail, Lock, GraduationCap, Check } from '@tamagui/lucide-icons';

const VALUE_PROPS = [
  '1,000+ expert-led courses & programs',
  'Hands-on projects with mentor feedback',
  'Industry-recognised certificates'
];

export function LoginPrototype() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <YStack alignItems="center" paddingVertical="$4">
      <Container
        container="lowest"
        outlined
        shadow="md"
        borderRadius={24}
        overflow="hidden"
        width="100%"
        maxWidth={920}
      >
        <XStack flexWrap="wrap">
          {/* Brand / value panel */}
          <YStack
            flex={1}
            minWidth={300}
            backgroundColor="$primary"
            padding="$6"
            gap="$5"
            justifyContent="space-between"
          >
            <XStack alignItems="center" gap="$2">
              <Stack
                width={40}
                height={40}
                borderRadius={12}
                backgroundColor="$onPrimary"
                alignItems="center"
                justifyContent="center"
              >
                <Icon icon={<GraduationCap />} size={22} color="$primary" />
              </Stack>
              <Typography variant="subtitle1" color="$onPrimary">
                Great Learning
              </Typography>
            </XStack>
            <YStack gap="$3">
              <Typography variant="h2" color="$onPrimary">
                Keep learning, keep growing.
              </Typography>
              <YStack gap="$2">
                {VALUE_PROPS.map((v) => (
                  <XStack key={v} alignItems="center" gap="$2">
                    <Icon icon={<Check />} size={18} color="$onPrimary" />
                    <Typography variant="body2" color="$onPrimary">
                      {v}
                    </Typography>
                  </XStack>
                ))}
              </YStack>
            </YStack>
            <Typography variant="caption1" color="$onPrimary" opacity={0.85}>
              Trusted by 9M+ learners worldwide
            </Typography>
          </YStack>

          {/* Form panel */}
          <YStack flex={1} minWidth={320} padding="$6" gap="$4">
            <YStack gap="$1">
              <Typography variant="h3">Welcome back</Typography>
              <Typography variant="body2" color="$onSurfaceVariant">
                Sign in to continue your learning journey.
              </Typography>
            </YStack>

            <YStack gap="$3">
              <TextField
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                startIcon={Mail}
              />
              <TextField
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                startIcon={Lock}
              />
              <XStack justifyContent="flex-end">
                <Button variant="text" size="sm" onPress={() => {}}>
                  Forgot password?
                </Button>
              </XStack>
            </YStack>

            <YStack gap="$3">
              <Button variant="contained" size="lg" width="100%" onPress={() => {}}>
                Sign in
              </Button>
              <XStack alignItems="center" gap="$2">
                <Separator flex={1} />
                <Typography variant="caption1" color="$onSurfaceVariant">
                  or
                </Typography>
                <Separator flex={1} />
              </XStack>
              <Button variant="outlined" size="lg" width="100%" onPress={() => {}}>
                Continue with Google
              </Button>
            </YStack>

            <XStack justifyContent="center" alignItems="center" gap="$1">
              <Typography variant="body2" color="$onSurfaceVariant">
                New to Great Learning?
              </Typography>
              <Button variant="text" size="sm" onPress={() => {}}>
                Create account
              </Button>
            </XStack>
          </YStack>
        </XStack>
      </Container>
    </YStack>
  );
}
