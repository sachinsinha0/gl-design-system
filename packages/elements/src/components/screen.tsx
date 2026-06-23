import { mapSurfacePropsToColorTokens, Surface, SurfaceType } from './surface';
import { Footer } from './footer';
import { StatusBar } from './status-bar';
import { useConstructor, useThemeSetting } from '../hooks';
import { GLTheme } from '../theme/themes';
import { isNil } from 'ramda';
import React, { Context, createContext, useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ViewStyle } from 'react-native';
import { ScrollView, ScrollViewProps, Stack, Theme } from 'tamagui';
import { Helmet } from 'react-helmet';

const isIos = Platform.OS === 'ios';

/**
 * All screen keyboard offsets.
 */
const offsets = {
  none: 0
};

/**
 * The variations of keyboard offsets.
 */
type KeyboardOffsets = keyof typeof offsets;

/**
 * All the variations of screens.
 */
const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      ...Platform.select({ native: { flex: 1, height: '100%' }, web: { height: '100vh' } })
    } as ViewStyle,
    inner: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      height: '100%',
      width: '100%'
    } as ViewStyle
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      flex: 1
    } as ViewStyle,
    inner: { justifyContent: 'flex-start', alignItems: 'stretch' } as ViewStyle
  }
};

/**
 * The variations of screens.
 */
type ScreenPresets = keyof typeof presets;

/**
 * Is this preset a non-scrolling one?
 *
 * @param preset The preset to check
 */
function isNonScrolling(preset: ScreenPresets) {
  // any of these things will make you scroll
  return isNil(preset) || !preset.length || isNil(presets[preset]) || preset === 'fixed';
}

export type ScreenProps = {
  /**
   * Children components.
   */
  children?: React.ReactNode;

  footer?: React.ReactNode;

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle;

  /**
   * One of the different types of presets.
   */
  preset?: ScreenPresets;

  /**
   * An optional background color
   */
  backgroundColor?: string;

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  barStyle?: 'light-content' | 'dark-content';

  statusBackgroundColor?: string;

  /**
   * Should we not wrap in View? Defaults to false.
   */
  unsafe?: boolean;

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets;

  appBar?: React.ReactNode;

  surface?: SurfaceType;

  theme?: GLTheme;

  scrollProps?: ScrollViewProps;

  title?: string;

  safeAreaEdges?: ('top' | 'bottom')[];
};

const ScreenThemeContext: Context<{
  theme: GLTheme | null;
}> = createContext({ theme: 'blue_light' });

export function useScreenTheme(): [GLTheme, (theme: GLTheme) => void] {
  const { theme } = useContext(ScreenThemeContext);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return [theme];
}

function ScreenWithoutScrolling({
  surface = 'default',
  backgroundColor,
  safeAreaEdges = ['top', 'bottom'],
  ...props
}: ScreenProps) {
  const preset = presets.fixed;

  return (
    <Theme name={props.theme}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <KeyboardAvoidingView
        style={[preset.outer]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'undefined'}
        keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
        {props.appBar &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          React.cloneElement(props.appBar, {
            theme: props.theme
          })}
        <Stack flex={1}>
          {safeAreaEdges.includes('top') && <StatusBar backgroundColor={backgroundColor} />}
          <Surface flex={1} surface={surface} backgroundColor={backgroundColor}>
            {props.children}
          </Surface>
          {props.footer ||
            (safeAreaEdges.includes('bottom') ? <Footer backgroundColor={'transparent'} /> : <></>)}
        </Stack>
      </KeyboardAvoidingView>
    </Theme>
  );
}

function ScreenWithScrolling({
  surface = 'default',
  backgroundColor,
  scrollProps,
  safeAreaEdges = [],
  ...props
}: ScreenProps) {
  const preset = presets.scroll;
  const style = props.style || {};

  return (
    <Theme name={props.theme}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <KeyboardAvoidingView
        style={[preset.outer]}
        behavior={isIos ? 'padding' : undefined}
        keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
        {props.appBar &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          React.cloneElement(props.appBar, {
            theme: props.theme
          })}
        <Stack flex={1}>
          <ScrollView
            {...scrollProps}
            backgroundColor={backgroundColor || mapSurfacePropsToColorTokens(surface)}
            contentContainerStyle={[preset.inner, style]}
            keyboardShouldPersistTaps={'never'}
            showsVerticalScrollIndicator={false}>
            {safeAreaEdges.includes('top') ? (
              <StatusBar
                backgroundColor={backgroundColor || mapSurfacePropsToColorTokens(surface)}
              />
            ) : (
              <></>
            )}
            {props.children}
            {safeAreaEdges.includes('bottom') ? <Footer backgroundColor={'transparent'} /> : <></>}
          </ScrollView>
          {props.footer}
        </Stack>
      </KeyboardAvoidingView>
    </Theme>
  );
}

export function ScreenNative(props: ScreenProps) {
  const { theme } = useThemeSetting();

  if (props.preset && isNonScrolling(props.preset)) {
    return (
      <ScreenThemeContext.Provider value={{ theme: props.theme || theme }}>
        <ScreenWithoutScrolling {...props} />
      </ScreenThemeContext.Provider>
    );
  } else {
    return (
      <ScreenThemeContext.Provider value={{ theme: props.theme || theme }}>
        <ScreenWithScrolling {...props} />
      </ScreenThemeContext.Provider>
    );
  }
}

export function ScreenWeb({
  surface = 'default',
  backgroundColor,
  children,
  footer,
  title,
  ...props
}: ScreenProps) {
  const { theme } = useThemeSetting();
  const computedTheme = props.theme || theme;
  const [footerHeight, setFooterHeight] = useState<number>(0);

  useConstructor(() => {
    let appBarElement = document.getElementById('app-bar');
    if (!appBarElement) {
      appBarElement = document.createElement('div');
      appBarElement.setAttribute('id', 'app-bar');
      document.body.prepend(appBarElement);
    }

    // Options for the observer (which mutations to observe)
    const config = { childList: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          const currentAppBarElement = document.getElementById('app-bar');
          if (currentAppBarElement) {
            currentAppBarElement.childNodes.forEach((child: HTMLDivElement, index) => {
              if (index === currentAppBarElement.childNodes.length - 1) {
                child.style.display = 'flex';
              } else {
                child.style.display = 'none';
              }
            });
          }
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(appBarElement, config);

    return () => observer.disconnect();
  });

  useEffect(() => {
    const transformedDiv = document.querySelectorAll(
      '[style="flex: 1 1 0%; transform: translateX(0px);"]'
    );
    function removeTransform() {
      // eslint-disable-next-line @typescript-eslint/ban{-ts-comment
      //@ts-ignore
      transformedDiv[0].style.transform = null;
    }

    if (transformedDiv.length) {
      const observer = new MutationObserver(removeTransform);
      observer.observe(transformedDiv[0], {
        attributes: true,
        attributeFilter: ['style']
      });
      // eslint-disable-next-line @typescript-eslint/ban{-ts-comment
      //@ts-ignore
      transformedDiv[0].style.transform = null;
    }
  });

  return (
    <ScreenThemeContext.Provider value={{ theme: computedTheme }}>
      <Theme name={computedTheme}>
        {title && (
          <Helmet>
            <title>{title}</title>
          </Helmet>
        )}
        <Surface
          minHeight={`calc(100vh - ${footerHeight}px)`}
          surface={surface}
          {...(backgroundColor && { backgroundColor })}>
          {props.appBar}
          {/* <Portal node={document.getElementById('app-bar')}>
          {props.appBar &&
            React.cloneElement(props.appBar, {
              theme: computedTheme
            })}
        </Portal> */}
          {children}
        </Surface>
        <Stack
          onLayout={(e) => {
            setFooterHeight(e.nativeEvent.layout.height);
          }}>
          {footer}
        </Stack>
      </Theme>
    </ScreenThemeContext.Provider>
  );
}

export const Screen = Platform.OS == 'web' ? ScreenWeb : ScreenNative;
