import { Stack, Typography } from '@mui/material';
import { Button } from '@gl/jedi';

export function ButtonsPage() {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="overline">Contained</Typography>
        <Stack direction="row" spacing={1.5}>
          <Button>Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button disabled>Disabled</Button>
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="overline">Outlined</Typography>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined">Primary</Button>
          <Button variant="outlined" color="secondary">Secondary</Button>
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="overline">Text</Typography>
        <Stack direction="row" spacing={1.5}>
          <Button variant="text">Primary</Button>
          <Button variant="text" color="secondary">Secondary</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
