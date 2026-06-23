import { Stack, Typography, Box, Paper } from '@mui/material';

const SCALE = [
  { variant: 'h1', label: 'Heading 1', spec: '32 / 600 / 1.125 / -0.4' },
  { variant: 'h2', label: 'Heading 2', spec: '28 / 600 / 1.2 / -0.4' },
  { variant: 'h3', label: 'Heading 3', spec: '24 / 600 / 1.167 / -0.4' },
  { variant: 'h4', label: 'Heading 4', spec: '20 / 600 / 1.235 / -0.4' },
  { variant: 'h5', label: 'Heading 5', spec: '18 / 600 / 1.334 / -0.4' },
  { variant: 'subtitle1', label: 'Subtitle 1', spec: '16 / 500 / 1.75 / -0.4' },
  { variant: 'subtitle2', label: 'Subtitle 2', spec: '14 / 500 / 1.57 / -0.4' },
  { variant: 'body1', label: 'Body 1 — the quick brown fox jumps over the lazy dog', spec: '16 / 400 / 1.5 / 0' },
  { variant: 'body2', label: 'Body 2 — the quick brown fox jumps over the lazy dog', spec: '14 / 400 / 1.43 / 0' },
  { variant: 'caption', label: 'Caption — metadata only', spec: '12 / 400 / 1.66 / 0.4' },
  { variant: 'overline', label: 'OVERLINE — UPPERCASE LABEL', spec: '10 / 600 / 1.66 / 1.25' }
] as const;

export function TypographyPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Type</Typography>
        <Typography variant="body2" color="text.secondary">
          Inter, weights 400/500/600. SemiBold headlines with -0.4px negative tracking. There is no h6.
        </Typography>
      </Stack>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          {SCALE.map(({ variant, label, spec }) => (
            <Stack key={variant} direction="row" spacing={3} alignItems="baseline">
              <Box sx={{ minWidth: 88 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {variant}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant={variant as any}>{label}</Typography>
              </Box>
              <Box sx={{ minWidth: 140 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {spec}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Paper>

      <Stack spacing={1}>
        <Typography variant="overline">Why these rules</Typography>
        <Typography variant="body2" color="text.secondary">
          Hierarchy comes from weight + size, never color — headings render in the same ink as body. Uppercase is
          reserved for buttons and overlines. Mobile (&lt; md) relaxes letter-spacing to 0 on subtitles/body to keep
          small-screen text legible.
        </Typography>
      </Stack>
    </Stack>
  );
}

