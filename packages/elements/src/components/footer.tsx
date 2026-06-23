// import { StatusBar } from './status-bar';
import { IconProps } from './icon';
import { Separator } from './separator';
import { IconButton } from './icon-button';
import { GLTheme } from '../theme/themes';
import { useThemeSetting } from '../hooks';
import React, { ReactNode } from 'react';
import { Platform } from 'react-native';
import { Stack, StackProps, Theme, withStaticProperties, XStack, XStackProps } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type FooterProps = {
  children?: ReactNode;
  backgroundColor?: string;
  unsafe?: boolean;
  separator?: boolean;
  position?: 'relative' | 'absolute' | 'fixed';
  theme?: GLTheme;
  bottomInsetProps?: StackProps;
} & StackProps;

export type FooterContentProps = XStackProps;

function FooterContent({ children, ...props }: FooterContentProps) {
  return (
    // <XStack  px="$2" py="$1.25" alignItems="center" {...props}>
    <XStack minHeight="$7" px="$2" py="$1" alignItems="center" {...props}>
      {children}
    </XStack>
  );
}

export const Footer = withStaticProperties(
  ({
    children,
    unsafe,
    backgroundColor = '$surfaceContainerLow',
    separator = false,
    position,
    bottomInsetProps,
    ...props
  }: FooterProps) => {
    const { theme } = useThemeSetting();
    const insets = useSafeAreaInsets();

    const computedTheme = props.theme || theme;
    const paddingBottom = unsafe ? 0 : insets.bottom;

    return (
      <Stack>
        <Theme name={computedTheme}>
          <Stack
            w="100%"
            bottom={0}
            left={0}
            zIndex={5}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            position={position || Platform.select({ native: 'relative', web: 'fixed' })}
            backgroundColor={backgroundColor}
            {...props}>
            {separator && (
              <Separator
                backgroundColor="$background"
                borderColor="$outlineOpacity16P"
                height={1}
              />
            )}
            {children}
            <Stack
              backgroundColor={backgroundColor}
              paddingBottom={paddingBottom}
              {...bottomInsetProps}
            />
          </Stack>
        </Theme>
      </Stack>
    );
  },
  { Content: FooterContent }
);

export type FooterIconProps = IconProps;

export function FooterIcon({ color = '$onSurfaceVariant', onPress, ...props }: FooterIconProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return <IconButton variant="text" color={color} {...props} onPress={onPress} />;
}
