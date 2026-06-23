import { DialogProps } from './dialog';
import { Icon } from './icon';
import { Typography, Stack, Dialog, Container, Button, YStack, useGetThemedIcon } from '../';
import { XOctagon, CheckCircle, AlertTriangle, Info } from '../icons';
import React, { ReactNode } from 'react';

const iconMapping = {
  error: XOctagon,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info
};

const colorMapping = {
  error: {
    icon: '$error',
    text: '$onErrorContainer',
    container: '$errorContainer'
  },
  success: {
    icon: '$success',
    text: '$onSuccessContainer',
    container: '$successContainer'
  },
  info: {
    icon: '$primary',
    text: '$onPrimaryContainer',
    container: '$primaryContainer'
  },
  warning: {
    icon: '$warning',
    text: '$onWarningContainer',
    container: '$warningContainer'
  }
};

export type AlertDialogBodyProps = {
  title?: string;
  content?: string;
  children?: ReactNode;
  textColor?: string;
};

export type AlertDialogProps = {
  open: boolean;
  actionLabel?: string;
  cancelLabel: string;
  onClose: () => void;
  onActionPress?: () => void;
  severity?: 'info' | 'success' | 'warning' | 'error';
} & DialogProps &
  Omit<AlertDialogBodyProps, 'textColor'>;

function AlertDialogBody({ title, content, children, textColor }: AlertDialogBodyProps) {
  return (
    <YStack justifyContent="center" alignContent="center">
      {title && (
        <Stack
          paddingVertical="$1.5"
          paddingHorizontal="$3"
          justifyContent="center"
          alignItems="center">
          <Typography textAlign="center" color={textColor} variant="h4" justifyContent="center">
            {title}
          </Typography>
        </Stack>
      )}
      {content && (
        <Stack
          paddingVertical="$1"
          paddingHorizontal="$3"
          justifyContent="center"
          alignItems="center">
          <Typography textAlign="center" color={textColor} variant="body2" justifyContent="center">
            {content}
          </Typography>
        </Stack>
      )}
      {children}
    </YStack>
  );
}

export function AlertDialog({
  open = false,
  children,
  severity = 'info',
  actionLabel,
  cancelLabel,
  onClose,
  onActionPress,
  sheetProps,
  ...props
}: AlertDialogProps) {
  const alertColors = colorMapping[severity];
  const getThemedIcon = useGetThemedIcon({
    size: 68,
    color: alertColors.icon
  });

  return (
    <Dialog
      {...props}
      safeAreaEdges={['top', 'bottom']}
      open={open}
      maxWidth={328}
      fullWidth
      onClose={onClose}
      sheetProps={{ ...sheetProps }}>
      <Container container="lowest" paddingVertical="$3">
        <Stack alignItems="center">
          <Stack height={112} justifyContent="center" alignItems="center">
            {getThemedIcon(iconMapping[severity])}
          </Stack>
          <AlertDialogBody textColor={alertColors.text} {...props}>
            {children}
          </AlertDialogBody>
          {actionLabel && (
            <Stack paddingVertical="$1" paddingHorizontal="$6">
              <Button variant="text" size="md" onPress={onActionPress}>
                {actionLabel}
              </Button>
            </Stack>
          )}
          <Stack paddingVertical="$1" paddingHorizontal="$6">
            <Button variant="text" size="md" onPress={onClose}>
              {cancelLabel}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
}
