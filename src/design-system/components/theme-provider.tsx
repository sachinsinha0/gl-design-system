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

const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const v = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    return (v as unknown as T) || fallback;
  } catch {
    return fallback;
  }
};

export function ThemeProvider({
  children,
  onChangeTheme,
  onChangeColorScheme
}: {
  children: ReactNode;
  onChangeTheme: (theme: GLTheme) => void;
  onChangeColorScheme: (colorScheme: ColorScheme) => void;
}) {
  const [theme, setTheme] = useState<GLTheme | null>(() =>
    readStored<GLTheme>(ThemeStorageKey, 'blue')
  );
  const [colorScheme, setColorScheme] = useState<ColorScheme | null>(() =>
    readStored<ColorScheme>(ColorSchemeStorageKey, 'light')
  );

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

  // On mount, synchronously push the seeded values to the parent Provider so
  // the TamaguiProvider mounts immediately on first paint (no blank flash).
  useEffect(() => {
    if (theme) {
      onChangeTheme(theme);
    }
    if (colorScheme) {
      onChangeColorScheme(colorScheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reconcile against persisted (async) storage after first paint.
  useEffect(() => {
    (async function () {
      const storedTheme = await loadString(ThemeStorageKey);
      const storedColorScheme = await loadString(ColorSchemeStorageKey);
      setThemeWithStorage((storedTheme || theme || 'blue') as GLTheme);
      setColorSchemeWithStorage((storedColorScheme || colorScheme || 'light') as ColorScheme);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeSettingsContext.Provider value={contextValue}>{children}</ThemeSettingsContext.Provider>
  );
}
