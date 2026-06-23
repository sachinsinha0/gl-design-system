import { Box, Typography, Stack, Button as MuiButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useActiveDSId } from '../../platform/ds-context';

export function HomePage() {
  const dsId = useActiveDSId();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Stack spacing={1}>
        <Typography variant="overline">Jedi</Typography>
        <Typography variant="h2">MUI v6 Design System</Typography>
        <Typography variant="body1">
          Jedi is built on Material-UI v6 with our own token set.
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <Link to={`/${dsId}/buttons`} style={{ textDecoration: 'none' }}>
          <MuiButton variant="contained">Browse components</MuiButton>
        </Link>
        <Link to={`/${dsId}/colors`} style={{ textDecoration: 'none' }}>
          <MuiButton variant="outlined">View foundations</MuiButton>
        </Link>
      </Stack>
    </Box>
  );
}
