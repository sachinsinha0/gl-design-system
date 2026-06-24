import type { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Typography, Box, Paper } from '@mui/material';

const components = {
  h1: () => null,
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
    <Box component="ul" sx={{ pl: 3, mb: 2, listStyleType: 'disc' }}>
      {children}
    </Box>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <Box component="ol" sx={{ pl: 3, mb: 2, listStyleType: 'decimal' }}>
      {children}
    </Box>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <Box component="li" sx={{ mb: 0.75, display: 'list-item' }}>
      <Typography variant="body1" component="span">
        {children}
      </Typography>
    </Box>
  ),
  code: ({ children }: { children?: ReactNode }) => (
    <Box
      component="code"
      sx={{
        fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
        fontSize: '0.875em',
        bgcolor: 'action.hover',
        color: 'text.primary',
        px: 0.6,
        py: 0.15,
        borderRadius: 0.5,
      }}
    >
      {children}
    </Box>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        my: 2,
        overflow: 'auto',
        bgcolor: '#0f172a',
        borderColor: '#1e293b',
      }}
    >
      <Box
        component="pre"
        sx={{
          m: 0,
          fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
          fontSize: 13,
          lineHeight: 1.6,
          color: '#e2e8f0',
          whiteSpace: 'pre',
          '& code': {
            background: 'transparent',
            color: 'inherit',
            padding: 0,
            fontFamily: 'inherit',
            fontSize: 'inherit',
          },
        }}
      >
        {children}
      </Box>
    </Paper>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <Box
      sx={(theme) => ({
        my: 3,
        px: 2.5,
        py: 2,
        background: theme.palette.mode === 'dark'
          ? 'rgba(25,106,229,0.12)'
          : 'linear-gradient(135deg, #e8f0fe 0%, #f5f8ff 100%)',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(25,106,229,0.28)' : '#c5d5fb',
        borderRadius: 2.5,
        '& p': { mb: 0, '& + p': { mt: 1 } },
        '& strong': { color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark' },
      })}
    >
      {children}
    </Box>
  ),
  table: ({ children }: { children?: ReactNode }) => (
    <Box sx={{ overflowX: 'auto', my: 2 }}>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        {children}
      </Box>
    </Box>
  ),
  thead: ({ children }: { children?: ReactNode }) => <thead>{children}</thead>,
  tbody: ({ children }: { children?: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children?: ReactNode }) => <tr>{children}</tr>,
  th: ({ children }: { children?: ReactNode }) => (
    <Box
      component="th"
      sx={{
        textAlign: 'left',
        fontWeight: 600,
        fontSize: 12,
        p: '10px 14px',
        borderBottom: 2,
        borderColor: 'divider',
        color: 'text.secondary',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </Box>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <Box
      component="td"
      sx={{
        p: '9px 14px',
        borderBottom: 1,
        borderColor: 'divider',
        color: 'text.primary',
        verticalAlign: 'top',
        lineHeight: 1.55,
      }}
    >
      {children}
    </Box>
  ),
};

export function JediMDXProvider({ children }: { children: ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
