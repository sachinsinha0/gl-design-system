import { Box, Stack, Typography, Paper } from '@mui/material';
import { spacing as spacingScale } from '@gl/jedi/theme';

/**
 * Jedi spec §3.4 — Spacing is the indexed scale [0,4,8,16,24,32,40,48,64,96,128].
 * `theme.spacing(n)` returns `spacingScale[n]` (e.g. spacing(3) = 16px, not MUI's 24).
 */
export function SpacingPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Spacing scale</Typography>
        <Typography variant="body2" color="text.secondary">
          Indexed, non-linear. The jump from 48 → 64 → 96 → 128 keeps large layout gaps
          coming from a sanctioned set, not arbitrary multiples.
        </Typography>
      </Stack>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          {spacingScale.map((px, i) => (
            <Stack key={i} direction="row" alignItems="center" spacing={3}>
              <Typography
                variant="caption"
                sx={{ fontVariantNumeric: 'tabular-nums', width: 24, textAlign: 'right', color: 'text.secondary' }}
              >
                {i}
              </Typography>
              <Box sx={{ height: 12, width: `${px}px`, bgcolor: 'primary.main', borderRadius: 0.5 }} />
              <Typography variant="body2" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                {px}px
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>

      <Stack spacing={1}>
        <Typography variant="overline">Usage</Typography>
        <Typography variant="body2" color="text.secondary">
          Read from <code>theme.spacing(n)</code> or pass an integer to MUI's spacing props
          (<code>p</code>, <code>m</code>, <code>gap</code>). Magic-number values like
          <code> mt: '20px'</code> are off-system.
        </Typography>
      </Stack>
    </Stack>
  );
}
