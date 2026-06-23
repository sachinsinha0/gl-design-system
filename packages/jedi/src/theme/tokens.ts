export const jediTokens = {
  palette: {
    primary: { main: '#3F51B5', contrastText: '#FFFFFF' },
    secondary: { main: '#E91E63', contrastText: '#FFFFFF' },
    error: { main: '#D32F2F' },
    warning: { main: '#ED6C02' },
    info: { main: '#0288D1' },
    success: { main: '#2E7D32' },
    background: { default: '#FAFAFA', paper: '#FFFFFF' }
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontSize: 48, fontWeight: 700, lineHeight: 1.15 },
    h2: { fontSize: 36, fontWeight: 700, lineHeight: 1.2 },
    h3: { fontSize: 28, fontWeight: 600, lineHeight: 1.25 },
    body1: { fontSize: 16, lineHeight: 1.5 }
  },
  shape: { borderRadius: 8 },
  spacing: 8
} as const;
