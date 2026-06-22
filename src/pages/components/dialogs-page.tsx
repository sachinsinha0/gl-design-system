import { useState } from 'react';
import {
  YStack,
  XStack,
  Typography,
  Button,
  Container,
  Dialog,
  AlertDialog,
  ConfirmDialog
} from '@gl/elements';
import { DemoBlock } from '../../showcase-kit';

export function DialogsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <YStack gap="$3">
      <DemoBlock
        title="Dialog"
        description="Controlled overlay (open + onClose). Children are arbitrary content; compose your own title/body/actions. Closes on Escape or overlay press.">
        <Button variant="contained" onPress={() => setDialogOpen(true)}>
          Open dialog
        </Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} size="sm">
          <Container container="highest" padding="$3">
            <YStack gap="$2">
              <Typography variant="h4">Update your profile</Typography>
              <Typography variant="body2" color="$onSurfaceVariant">
                Add a few details so mentors can get to know you before the next session.
              </Typography>
              <XStack gap="$2" justifyContent="flex-end" paddingTop="$2">
                <Button variant="text" onPress={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="contained" onPress={() => setDialogOpen(false)}>
                  Save
                </Button>
              </XStack>
            </YStack>
          </Container>
        </Dialog>
      </DemoBlock>

      <DemoBlock
        title="AlertDialog"
        description="Centered alert with a severity icon (info | success | warning | error), title, content, an optional action button (actionLabel) and a required cancelLabel.">
        <Button variant="tonal" onPress={() => setAlertOpen(true)}>
          Open alert
        </Button>
        <AlertDialog
          open={alertOpen}
          severity="success"
          title="Enrollment confirmed"
          content="You are all set for the Data Science cohort starting next Monday."
          actionLabel="View schedule"
          cancelLabel="Dismiss"
          onActionPress={() => setAlertOpen(false)}
          onClose={() => setAlertOpen(false)}
        />
      </DemoBlock>

      <DemoBlock
        title="ConfirmDialog"
        description="Two-action confirmation. Requires title + body; actionLabel / cancelLabel drive the footer buttons, onActionPress / onClose handle the choice.">
        <Button variant="outlined" onPress={() => setConfirmOpen(true)}>
          Open confirm
        </Button>
        <ConfirmDialog
          open={confirmOpen}
          title="Leave this course?"
          body="Your progress is saved, but you will lose access to live sessions until you re-enroll."
          actionLabel="Leave course"
          cancelLabel="Stay enrolled"
          actionColor="$errorContainer"
          onActionPress={() => setConfirmOpen(false)}
          onClose={() => setConfirmOpen(false)}
        />
      </DemoBlock>
    </YStack>
  );
}
