import { Icon, IconProps } from './icon';
import { Typography } from './typography';
import { Container } from './container';
import { Separator } from './separator';
import { Badge } from './badge';
import React, { ReactNode } from 'react';
import { XStack, Stack, XStackProps, StackProps } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

export interface BottomNavigationProps extends XStackProps {
  children?: ReactNode;
  unsafe?: boolean;
  backgroundColor?: string;
  separator?: boolean;
  bottomInsetProps?: StackProps;
}

export function BottomNavigation({
  children,
  unsafe,
  backgroundColor = '$surfaceContainerHigh',
  separator = false,
  bottomInsetProps,
  ...props
}: BottomNavigationProps) {
  const insets = useSafeAreaInsets();

  const paddingBottom = unsafe ? 0 : insets.bottom;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    <Stack width={'100%'} bottom={0} style={Platform.OS === 'web' && { position: 'fixed' }}>
      {separator && (
        <Separator
          backgroundColor="$outlineOpacity16P"
          borderColor="$outlineOpacity16P"
          height={1}
        />
      )}
      <XStack
        maxHeight={'$7'}
        height={'$7'}
        bg={backgroundColor}
        w="100%"
        {...props}
        alignItems="center"
        justifyContent="center">
        {children}
      </XStack>
      <Stack
        backgroundColor={backgroundColor}
        paddingBottom={paddingBottom}
        {...bottomInsetProps}
      />
    </Stack>
  );
}

export type BottomNavigationActionProps = IconProps & {
  label: string;
  icon: ReactNode;
  active?: boolean;
  badge?: string | number;
};

export function BottomNavigationAction({
  label,
  active = false,
  icon,
  backgroundColor = '$surfaceContainerHigh',
  ...props
}: BottomNavigationActionProps) {
  const color = active ? '$primary' : '$onSurfaceVariant';
  return (
    <Container
      backgroundColor={backgroundColor}
      {...props}
      cursor="pointer"
      $gtMd={{ flex: 0, marginHorizontal: '$3' }}
      $md={{ flex: 1 }}
      alignItems="center"
      justifyContent="center"
      borderRadius={0}>
      {props.badge ? (
        <Badge badgeContent={undefined}>
          <Icon {...props} size={24} color={color} icon={icon} marginLeft="$1" />
          <Typography variant="caption2" color={color}>
            {label}
          </Typography>
          <Badge.Content anchor={{ right: '0%', top: 0 }} color="$error" />
        </Badge>
      ) : (
        <>
          <Icon {...props} size={24} color={color} icon={icon} />
          <Typography variant="caption2" color={color}>
            {label}
          </Typography>
        </>
      )}
    </Container>
  );
}

export function BottomNavigationPadding() {
  return <Stack pointerEvents="none" height={'$7'} />;
}
