import { GLTheme } from '../theme/themes';
import { saveString } from '../utils';
import { loadString } from '../utils/storage';
import React, {
  Context,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { ColorScheme } from '@tamagui/core';

export type ThemeSettingsContextType = {
  theme: GLTheme | null;
  colorScheme: ColorScheme;
  setTheme: (theme: GLTheme) => void;
  setColorScheme: (colorScheme: ColorScheme) => void;
};

export const ThemeSettingsContext: Context<ThemeSettingsContextType> = createContext({
  theme: null,
  colorScheme: 'light',
  setTheme: () => {
    //
  },
  setColorScheme: () => {
    //
  }
});

const ThemeStorageKey = '@elements-theme';
const ColorSchemeStorageKey = '@elements-color-scheme';

export function ThemeProvider({
  children,
  onChangeTheme,
  onChangeColorScheme
}: {
  children: ReactNode;
  onChangeTheme: (theme: GLTheme) => void;
  onChangeColorScheme: (colorScheme: ColorScheme) => void;
}) {
  const [theme, setTheme] = useState<GLTheme | null>(null);
  const [colorScheme, setColorScheme] = useState<ColorScheme | null>();

  const setThemeWithStorage = useCallback((t: GLTheme) => {
    (async function () {
      saveString(ThemeStorageKey, t);
    })();
    onChangeTheme(t);
    setTheme(t);
  }, []);
  const setColorSchemeWithStorage = useCallback((cs: ColorScheme) => {
    (async function () {
      saveString(ColorSchemeStorageKey, cs);
    })();
    onChangeColorScheme(cs);
    setColorScheme(cs);
  }, []);

  const contextValue = useMemo(() => {
    return {
      theme,
      colorScheme,
      setTheme: setThemeWithStorage,
      setColorScheme: setColorSchemeWithStorage
    };
  }, [theme, colorScheme, setThemeWithStorage, setColorSchemeWithStorage]);

  useEffect(() => {
    (async function () {
      const storedTheme = await loadString(ThemeStorageKey);
      const storedColorScheme = await loadString(ColorSchemeStorageKey);
      setThemeWithStorage((storedTheme || 'blue') as GLTheme);
      setColorSchemeWithStorage((storedColorScheme || 'light') as ColorScheme);
    })();
  }, []);

  return (
    <ThemeSettingsContext.Provider value={contextValue}>{children}</ThemeSettingsContext.Provider>
  );
}
