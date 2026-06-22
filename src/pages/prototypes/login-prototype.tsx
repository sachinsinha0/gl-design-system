import { useState } from 'react';
import { YStack, Container, Typography, TextField, Button } from '@gl/elements';
import { Mail, Lock } from '@tamagui/lucide-icons';

export function LoginPrototype() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <YStack alignItems="center" justifyContent="center" padding="$5" minHeight={520}>
      <Container container="lowest" outlined shadow="sm" padding="$5" gap="$4" width={360} maxWidth="100%">
        <YStack gap="$1">
          <Typography variant="h3">Welcome back</Typography>
          <Typography variant="body2" color="$onSurfaceVariant">
            Sign in to continue to your courses.
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
        </YStack>

        <YStack gap="$2">
          <Button variant="contained" width="100%" onPress={() => {}}>
            Sign in
          </Button>
          <Button variant="text" onPress={() => {}}>
            Forgot password?
          </Button>
        </YStack>
      </Container>
    </YStack>
  );
}
