import { Provider, Button, Typography, YStack } from '@gl/elements';
import { Home } from '@tamagui/lucide-icons';
export function App() {
  return (
    <Provider>
      <YStack gap="$3" padding="$4">
        <Typography variant="h3">GL Design Repository</Typography>
        <Button variant="contained" startIcon={Home}>It renders</Button>
      </YStack>
    </Provider>
  );
}
