import { Box, Chip, Divider, Typography } from '@mui/material';
import { InstallationPage } from './get-started/installation-page';

export function HomePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <Box
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #e8eaf6 0%, #fce4ec 100%)',
          p: { xs: 3, sm: 5 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box>
          <Chip
            label="MUI v6 · Internal tools"
            size="small"
            sx={{ bgcolor: 'white', fontWeight: 600, fontSize: 11 }}
          />
        </Box>
        <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
          Jedi Design System
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
          MUI v6 themed by Jedi — the opinionated layer that makes Great Learning's internal
          tools, partner dashboards, and admin UIs feel like one product. Pick up the skill,
          import from <code style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: '0.9em' }}>@gl/jedi</code>, and build.
        </Typography>
      </Box>

      <Divider />

      {/* ── Installation ───────────────────────────────────────────────────── */}
      <Box>
        <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          Get started
        </Typography>
        <InstallationPage />
      </Box>
    </Box>
  );
}
