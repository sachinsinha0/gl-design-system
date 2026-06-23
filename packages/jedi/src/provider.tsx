import type { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import { jediTheme } from './theme';

export function JediProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={jediTheme}>
      <ScopedCssBaseline>{children}</ScopedCssBaseline>
    </ThemeProvider>
  );
}
