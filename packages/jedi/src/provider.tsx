import { useMemo, type CSSProperties, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { buildJediTheme, type ColorMode } from './theme';
import { toCssVariables } from './theme/colors';

/**
 * Wraps children with the Jedi MUI theme + ScopedCssBaseline.
 * Also emits the entire `getColors(mode)` tree as CSS custom properties on the
 * baseline root (e.g. `--primary-main`, `--error-shades-190-p`,
 * `--background-paper-elevation-2`, `--ramps-grey-100`) so consumers can
 * reach tokens from plain CSS / styled-components without `getColors(mode)`.
 */
export function JediProvider({ children, mode = 'light' }: { children: ReactNode; mode?: ColorMode }) {
  const theme = useMemo(() => buildJediTheme(mode), [mode]);
  const cssVars = useMemo(() => toCssVariables(mode) as CSSProperties, [mode]);
  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline sx={{ ...cssVars, fontFamily: theme.typography.fontFamily }} data-ds="jedi" data-ds-mode={mode}>
        {children}
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}
