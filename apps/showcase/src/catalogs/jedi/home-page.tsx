import { Box, Stack, Typography, alpha } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { InstallationPage } from './get-started/installation-page';

export function HomePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Box
        sx={(theme) => ({
          borderRadius: 3,
          bgcolor: alpha(theme.palette.primary.main, 0.06),
          p: { xs: 3, sm: 6 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        })}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.75}
          alignSelf="flex-start"
          sx={{
            bgcolor: 'background.paper',
            px: 1.25,
            py: 0.5,
            borderRadius: 999,
          }}
        >
          <AutoAwesome sx={{ fontSize: 14, color: 'primary.main' }} />
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', lineHeight: 1.4, letterSpacing: '0.08em' }}
          >
            MUI v6 · Inter · Light &amp; Dark
          </Typography>
        </Stack>

        <Stack spacing={1.25} sx={{ maxWidth: 680 }}>
          <Typography variant="h1" sx={{ fontWeight: 700 }}>
            Jedi Design System
          </Typography>
          <Typography variant="body1" color="text.secondary">
            MUI v6 themed by Jedi — the opinionated layer that makes Great Learning&apos;s
            internal tools, partner dashboards, and admin UIs feel like one product. Import
            from{' '}
            <Typography component="span" variant="body1" sx={{ color: 'primary.main' }}>
              @gl/jedi
            </Typography>
            , pick up the AI skill, and build.
          </Typography>
        </Stack>
      </Box>

      <Box>
        <Typography variant="h3" sx={{ mb: 2 }}>Install</Typography>
        <InstallationPage />
      </Box>
    </Box>
  );
}
