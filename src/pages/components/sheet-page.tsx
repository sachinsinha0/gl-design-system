import { useState } from 'react';
import {
  YStack,
  XStack,
  Typography,
  Button,
  IconButton,
  Separator,
  Sheet,
  Drawer
} from '@gl/elements';
import { X } from '@tamagui/lucide-icons';
import { DemoBlock } from '../../showcase-kit';
import { SELECT_OPTIONS, PEOPLE } from '../../mocks/data';

export function SheetPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <YStack gap="$3">
      <DemoBlock
        title="Sheet (bottom)"
        description="Controlled bottom sheet (open + onClose). snapPoints set the rest heights; a drag handle shows by default. Content renders in a modal portal.">
        <Button variant="contained" onPress={() => setSheetOpen(true)}>
          Open sheet
        </Button>
        <Sheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          onOpenChange={(next: boolean) => setSheetOpen(next)}
          snapPoints={[50]}
          backgroundColor="$surfaceContainerLow">
          <YStack padding="$3" gap="$2">
            <Typography variant="h4">Choose a track</Typography>
            <Separator />
            {SELECT_OPTIONS.map((opt) => (
              <YStack key={opt.value} paddingVertical="$1">
                <Typography variant="body1">{opt.label}</Typography>
              </YStack>
            ))}
            <Button variant="text" onPress={() => setSheetOpen(false)}>
              Close
            </Button>
          </YStack>
        </Sheet>
      </DemoBlock>

      <DemoBlock
        title="Drawer (side)"
        description="Controlled side panel (open + onClose). orientation: left | right; drawerWidth sets the panel width. Renders fixed over the viewport; tap the scrim to close.">
        <Button variant="tonal" onPress={() => setDrawerOpen(true)}>
          Open drawer
        </Button>
        <Drawer
          open={drawerOpen}
          orientation="right"
          drawerWidth={320}
          onClose={() => setDrawerOpen(false)}>
          <YStack flex={1} padding="$3" gap="$2">
            <XStack justifyContent="space-between" alignItems="center">
              <Typography variant="h4">Participants</Typography>
              <IconButton icon={X} variant="text" onPress={() => setDrawerOpen(false)} />
            </XStack>
            <Separator />
            {PEOPLE.map((person) => (
              <YStack key={person.id} paddingVertical="$1">
                <Typography variant="subtitle2">{person.name}</Typography>
                <Typography variant="body2" color="$onSurfaceVariant">
                  {person.role}
                </Typography>
              </YStack>
            ))}
          </YStack>
        </Drawer>
      </DemoBlock>
    </YStack>
  );
}
