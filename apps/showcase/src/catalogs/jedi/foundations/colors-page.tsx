import { Box, Stack, Typography, Paper } from '@mui/material';
import { jediTokens } from '@gl/jedi/theme';

export function ColorsPage() {
  const entries = Object.entries(jediTokens.palette as Record<string, any>);
  return (
    <Stack spacing={2}>
      <Typography variant="h4">Palette</Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 2 }}>
        {entries.map(([name, value]) => {
          const main = typeof value === 'object' && value !== null ? (value as any).main ?? '#000' : String(value);
          return (
            <Paper key={name} variant="outlined" sx={{ overflow: 'hidden' }}>
              <Box sx={{ height: 72, bgcolor: main }} />
              <Box sx={{ p: 1.5 }}>
                <Typography variant="subtitle2">{name}</Typography>
                <Typography variant="caption" color="text.secondary">{main}</Typography>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Stack>
  );
}
