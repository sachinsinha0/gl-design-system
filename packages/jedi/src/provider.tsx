import { useMemo, type ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { buildJediTheme, type ColorMode } from './theme';

export function JediProvider({ children, mode = 'light' }: { children: ReactNode; mode?: ColorMode }) {
  const theme = useMemo(() => buildJediTheme(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>{children}</ScopedCssBaseline>
    </ThemeProvider>
  );
}
