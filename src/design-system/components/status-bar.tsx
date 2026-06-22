import { Stack, useColorValue, useThemeSetting } from '../';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Platform, StatusBarProps as RNStatusBarProps } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type StatusBarProps = RNStatusBarProps & {
  unsafe?: boolean;
  themeMode?: 'light' | 'dark';
};

export function StatusBar({
  backgroundColor = '$surfaceContainerLowest',
  unsafe = false,
  themeMode = 'light',
  ...props
}: StatusBarProps) {
  const backgroundColorValue = useColorValue(backgroundColor.toString());
  const { colorScheme } = useThemeSetting();
  const insets = useSafeAreaInsets();
  const topInsetStyle = { height: unsafe ? 0 : insets.top };
  const statusBarThemeMode = themeMode ? themeMode : colorScheme;

  return Platform.OS === 'web' ? (
    <Helmet>
      <meta name="theme-color" content={backgroundColorValue} />
      <meta name="msapplication-navbutton-color" content={backgroundColorValue} />
      <meta name="apple-mobile-web-app-status-bar-style" content={backgroundColorValue} />
      <meta name="mobile-web-app-capable" content="yes" />
    </Helmet>
  ) : (
    <>
      <SystemBars
        {...props}
        style={{ statusBar: statusBarThemeMode === 'light' ? 'dark' : 'light' }}
      />
      <Stack style={topInsetStyle} backgroundColor={backgroundColorValue} />
    </>
  );
}
