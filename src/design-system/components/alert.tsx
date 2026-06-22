import { Button } from './button';
import { Icon } from './icon';
import { IconButton } from './icon-button';
import { Typography } from './typography';
import { GetProps, Stack, StackProps, styled } from '@tamagui/core';
import { AlertCircle, CheckCircle2, Info, X, XCircle } from '@tamagui/lucide-icons';
import React, { ReactNode } from 'react';
import { XStack, YStack } from 'tamagui';

const iconMapping = {
  error: XCircle,
  warning: AlertCircle,
  info: Info,
  success: CheckCircle2
};

const colorMapping = {
  filled: {
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
  },
  outlined: {
    error: {
      icon: '$error',
      text: '$onSurface',
      container: '$outlineVariant'
    },
    success: {
      icon: '$success',
      text: '$onSurface',
      container: '$outlineVariant'
    },
    info: {
      icon: '$primary',
      text: '$onSurface',
      container: '$outlineVariant'
    },
    warning: {
      icon: '$warning',
      text: '$onSurface',
      container: '$outlineVariant'
    }
  },
  standard: {
    error: {
      icon: '$errorMain',
      text: '$errorShades160P',
      container: '$errorShades190P'
    },
    success: {
      icon: '$successMain',
      text: '$successShades160P',
      container: '$successShades190P'
    },
    info: {
      icon: '$infoMain',
      text: '$infoShades160P',
      container: '$infoShades190P'
    },
    warning: {
      icon: '$warningMain',
      text: '$warningShades160P',
      container: '$warningShades190P'
    }
  }
};

function getAlertFrameVariantStyle(val, { props }) {
  const alertColors = colorMapping[props.variant][props.severity];
  if (props.variant === 'outlined') {
    return { borderColor: alertColors.container };
  }
  return { backgroundColor: alertColors.container, borderColor: alertColors.container };
}

export const AlertFrame = styled(Stack, {
  name: 'AlertFrame',
  padding: '$1.5',
  borderRadius: '$true',
  borderWidth: 1,
  variants: {
    variant: {
      standard: getAlertFrameVariantStyle,
      filled: getAlertFrameVariantStyle,
      outlined: getAlertFrameVariantStyle
    },
    severity: {
      error: {},
      warning: {},
      info: {},
      success: {}
    }
  } as const,
  defaultVariants: {
    severity: 'info',
    variant: 'filled'
  }
});

export type AlertBodyProps = {
  title?: string;
  content?: string;
  children?: ReactNode;
  textColor?: string;
};

export type AlertProps = GetProps<typeof AlertFrame> &
  AlertBodyProps & {
    icon?: string | ReactNode;
    action?: string | ReactNode;
    onClose?: () => void;
    onActionPress?: () => void;
    severity?: 'info' | 'success' | 'warning' | 'error';
    variant?: 'standard' | 'filled' | 'outlined';
    contentContainerProps?: StackProps;
  };

function AlertBody({ title, content, children, textColor }: AlertBodyProps) {
  return (
    <YStack flex={1} space="$0.5" justifyContent="center">
      {title && (
        <Typography color={textColor} variant="subtitle1">
          {title}
        </Typography>
      )}
      {content && (
        <Typography color={textColor} variant="body2">
          {content}
        </Typography>
      )}
      {children}
    </YStack>
  );
}

export const Alert = AlertFrame.extractable(
  ({
    children,
    severity = 'info',
    variant = 'filled',
    icon,
    action,
    onClose,
    onActionPress,
    ...props
  }: AlertProps) => {
    const alertColors = colorMapping[variant][severity];

    return (
      <AlertFrame variant={variant} severity={severity} {...props}>
        <XStack space="$1.5" alignItems="center" {...props.contentContainerProps}>
          <Stack>
            {icon ? (
              typeof icon == 'string' ? (
                <Icon color={alertColors.icon} size={24} icon={icon} />
              ) : (
                icon
              )
            ) : (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              <Icon color={alertColors.icon} size={24} icon={iconMapping[severity]} />
            )}
          </Stack>
          <AlertBody textColor={alertColors.text} {...props}>
            {children}
          </AlertBody>
          <XStack alignItems="center" space="$0.5">
            {typeof action === 'string' ? (
              <Button
                onPress={onActionPress}
                hoverStyle={{ backgroundColor: 'transparent' }}
                pressStyle={{ backgroundColor: 'transparent' }}
                variant="text"
                size="sm">
                {action}
              </Button>
            ) : (
              action
            )}
            {onClose && (
              <IconButton
                onPress={onClose}
                textColor={alertColors.icon}
                hoverStyle={{ backgroundColor: 'transparent' }}
                pressStyle={{ backgroundColor: 'transparent' }}
                variant="text"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                icon={X}
              />
            )}
          </XStack>
        </XStack>
      </AlertFrame>
    );
  }
);
