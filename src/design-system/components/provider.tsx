import { ThemeProvider } from './theme-provider';
import { config } from '../theme/tamagui.config';
import { GLTheme } from '../theme';
import { ColorScheme, TamaguiProvider, TamaguiProviderProps, Theme } from '@tamagui/core';
import { PortalProvider } from '@tamagui/portal';
import React, { useState } from 'react';

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const [theme, setTheme] = useState<GLTheme | null>(null);
  const [colorScheme, setColorScheme] = useState<ColorScheme | null>(null);

  return (
    <ThemeProvider
      onChangeColorScheme={(cs) => setColorScheme(cs)}
      onChangeTheme={(t) => setTheme(t)}>
      {colorScheme && theme && (
        <TamaguiProvider config={config} defaultTheme={colorScheme} {...rest}>
          <Theme name={theme}>
            <PortalProvider shouldAddRootHost>{children}</PortalProvider>
          </Theme>
        </TamaguiProvider>
      )}
    </ThemeProvider>
  );
}
