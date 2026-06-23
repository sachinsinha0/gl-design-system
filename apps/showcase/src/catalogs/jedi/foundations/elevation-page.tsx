import { Box, Stack, Typography, Paper, Menu, MenuItem, Tooltip, Button } from '@mui/material';
import { useState } from 'react';

/**
 * Jedi spec §2.5 — Flat-outlined system: cards are always `variant="outlined"`,
 * no shadows on cards in either mode. The `paper-elevation-*` tokens exist only
 * for the rare overlay surfaces that genuinely float (menus, dialogs, tooltips)
 * in dark mode — this page demonstrates that distinction.
 */
const elevationLevels = [0, 2, 8, 16, 24] as const;

export function ElevationPage() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Elevation</Typography>
        <Typography variant="body2" color="text.secondary">
          Surfaces are flat. Cards use <code>variant="outlined"</code> — never raised.
          The five elevation tokens exist for true overlays (menu, dialog, tooltip) in dark mode.
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Cards (always outlined)</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
          {[1, 2, 3].map((n) => (
            <Paper key={n} sx={{ p: 2 }}>
              <Typography variant="subtitle2">Card {n}</Typography>
              <Typography variant="body2" color="text.secondary">
                Outlined, never shadowed.
              </Typography>
            </Paper>
          ))}
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Paper elevation tokens</Typography>
        <Typography variant="caption" color="text.secondary">
          Reserved for true overlays. In light mode each step is white; dark mode steps up the surface tint.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2 }}>
          {elevationLevels.map((lvl) => (
            <Box
              key={lvl}
              sx={{
                p: 3,
                bgcolor: `var(--background-paper-elevation-${lvl})`,
                border: '1px solid var(--other-divider)',
                borderRadius: 1,
                textAlign: 'center'
              }}
            >
              <Typography variant="overline" sx={{ display: 'block' }}>
                paper {lvl}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">True overlays (allowed to float)</Typography>
        <Stack direction="row" spacing={2}>
          <Tooltip title="Tooltip overlays may use shadow">
            <Button variant="outlined">Hover for tooltip</Button>
          </Tooltip>
          <Button variant="outlined" onClick={(e) => setAnchor(e.currentTarget)}>
            Open menu
          </Button>
          <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
            <MenuItem onClick={() => setAnchor(null)}>Action one</MenuItem>
            <MenuItem onClick={() => setAnchor(null)}>Action two</MenuItem>
            <MenuItem onClick={() => setAnchor(null)}>Action three</MenuItem>
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  );
}
