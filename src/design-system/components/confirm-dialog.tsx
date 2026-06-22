import { Typography } from './typography';
import { Container } from './container';
import { Button, Dialog, Stack, XStack, YStack, useColorValue } from '../';
import React from 'react';

export type ConfirmDialogProps = {
  open: boolean;
  actionLabel?: string;
  cancelLabel?: string;
  actionColor?: string;
  cancelColor?: string;
  title: string;
  body: string;
  onClose?: () => void;
  onActionPress?: () => void;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  actionLabel,
  cancelLabel,
  actionColor = '$surfaceContainerLow',
  cancelColor = '$surfaceContainerLow',
  title,
  body,
  onClose,
  onActionPress
}) => {
  const tActionColor = useColorValue(actionColor);
  const tCancelColor = useColorValue(cancelColor);

  return (
    // <Dialog open={open} maxWidth={328} adaptToSheet={false} fullWidth>
    <Dialog open={open} adaptToSheet={false} fullWidth>      
      <Container container="highest">
        <YStack paddingLeft="$1">
          <Stack padding="$2" paddingTop="$3" paddingBottom="$0.5">
            <Typography variant="h4">{title}</Typography>
          </Stack>
          <Stack padding="$2" paddingBottom="$1">
            <Typography variant="body2">{body}</Typography>
          </Stack>
          <XStack space padding="$2" justifyContent="flex-end">
            <Button backgroundColor={tCancelColor} variant="text" onPress={onClose}>
              {cancelLabel}
            </Button>
            <Button backgroundColor={tActionColor} variant="text" onPress={onActionPress}>
              {actionLabel}
            </Button>
          </XStack>
        </YStack>
      </Container>
    </Dialog>
  );
};
