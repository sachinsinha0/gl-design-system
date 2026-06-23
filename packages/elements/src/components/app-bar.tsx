// import { StatusBar } from './status-bar';
import { IconProps } from './icon';
import { StatusBar, StatusBarProps } from './status-bar';
import { Separator } from './separator';
import { IconButton } from './icon-button';
import { GLTheme } from '../theme/themes';
import { useThemeSetting } from '../hooks';
import React, { ReactNode } from 'react';
import { Platform } from 'react-native';
import { Stack, StackProps, Theme, withStaticProperties, XStack, XStackProps } from 'tamagui';

export type AppBarProps = {
  children?: ReactNode;
  backgroundColor?: string;
  unsafe?: boolean;
  separator?: boolean;
  withStatusBar?: boolean;
  position?: 'relative' | 'absolute' | 'fixed';
  theme?: GLTheme;
  statusBarProps?: StatusBarProps;
} & StackProps;

export type AppBarContentProps = XStackProps;

function AppBarContent({ children, ...props }: AppBarContentProps) {
  return (
    <XStack minHeight="$8" px="$2" py="$1" alignItems="center" {...props}>
      {children}
    </XStack>
  );
}

function AppBarSubContent({ children, ...props }: AppBarContentProps) {
  return (
    <XStack minHeight="$6" px="$2" py="$1" alignItems="center" {...props}>
      {children}
    </XStack>
  );
}

function AppBarSeparator(props) {
  return (
    <Separator
      backgroundColor="$outlineOpacity16P"
      borderColor="$outlineOpacity16P"
      height={1}
      {...props}
    />
  );
}

export const AppBar = withStaticProperties(
  ({
    children,
    unsafe,
    backgroundColor = '$surfaceContainerLowest',
    separator = true,
    withStatusBar = true,
    statusBarProps = {},
    position,
    ...props
  }: AppBarProps) => {
    const { theme } = useThemeSetting();
    const computedTheme = props.theme || theme;
    return (
      <Theme name={computedTheme}>
        {withStatusBar && (
          <StatusBar backgroundColor={backgroundColor} unsafe={unsafe} {...statusBarProps} />
        )}
        <Stack
          w="100%"
          top={0}
          left={0}
          zIndex={100}
          position={position || Platform.select({ native: 'relative', web: 'fixed' })}
          backgroundColor={backgroundColor}
          // backgroundColor={'$errorOpacity8P'}
          {...props}>
          {children}
          {separator && <AppBarSeparator />}
        </Stack>
      </Theme>
    );
  },
  { Content: AppBarContent, SubContent: AppBarSubContent, Separator: AppBarSeparator }
);

export type AppBarIconProps = IconProps;

export function AppBarIcon({ color = '$onSurfaceVariant', onPress, ...props }: AppBarIconProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <IconButton size="lg" variant="text" color={color} {...props} onPress={onPress} />;
}
