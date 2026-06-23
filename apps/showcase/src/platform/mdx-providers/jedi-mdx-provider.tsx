import type { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Typography, Box, Paper } from '@mui/material';

const components = {
  h1: ({ children }: { children?: ReactNode }) => (
    <Typography variant="h1" gutterBottom>
      {children}
    </Typography>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
      {children}
    </Typography>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <Typography variant="h3" sx={{ mt: 3, mb: 2 }}>
      {children}
    </Typography>
  ),
  h4: ({ children }: { children?: ReactNode }) => (
    <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
      {children}
    </Typography>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <Typography variant="body1" paragraph>
      {children}
    </Typography>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <Box component="ul" sx={{ pl: 3, mb: 2 }}>
      {children}
    </Box>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <Box component="li" sx={{ mb: 0.5 }}>
      <Typography variant="body1" component="span">
        {children}
      </Typography>
    </Box>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <Box
      component="code"
      sx={{ fontFamily: 'monospace', fontSize: '0.875em', color: 'text.secondary' }}
    >
      {children}
    </Box>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <Paper variant="outlined" sx={{ p: 2, my: 2, overflow: 'auto' }}>
      <Box component="pre" sx={{ m: 0, fontFamily: 'monospace', fontSize: 13 }}>
        {children}
      </Box>
    </Paper>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <Box
      sx={{
        borderLeft: 3,
        borderColor: 'primary.main',
        pl: 2,
        py: 1,
        my: 2,
        bgcolor: 'action.hover'
      }}
    >
      {children}
    </Box>
  )
};

export function JediMDXProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
