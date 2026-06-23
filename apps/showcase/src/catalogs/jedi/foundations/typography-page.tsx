import { Stack, Typography } from '@mui/material';

export function TypographyPage() {
  return (
    <Stack spacing={2}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="body1">Body 1 — the quick brown fox jumps over the lazy dog.</Typography>
      <Typography variant="body2">Body 2 — the quick brown fox jumps over the lazy dog.</Typography>
      <Typography variant="caption">Caption — the quick brown fox jumps over the lazy dog.</Typography>
    </Stack>
  );
}
