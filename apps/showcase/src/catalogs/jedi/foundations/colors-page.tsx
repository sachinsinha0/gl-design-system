import { Box, Stack, Typography, Paper, Chip } from '@mui/material';
import { useState } from 'react';
import { jediTokens, getColors, type ColorMode } from '@gl/jedi/theme';

const STATUS_PALETTES = ['error', 'warning', 'info', 'success'] as const;
const SEMANTIC_PALETTES = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
const RAMPS = ['grey', 'purple', 'light-blue', 'yellow', 'blue', 'blue-gray'] as const;
const RAMP_STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box sx={{ height: 56, bgcolor: value }} />
      <Box sx={{ p: 1.25 }}>
        <Typography variant="subtitle2">{name}</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

export function ColorsPage() {
  const [mode, setMode] = useState<ColorMode>('light');
  const c = getColors(mode);

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Color</Typography>
        <Typography variant="body2" color="text.secondary">
          Live tokens from <code>getColors('{mode}')</code>. The whole tree is also emitted as CSS variables on the
          Jedi baseline — e.g. <code>var(--primary-main)</code>, <code>var(--error-shades-190-p)</code>.
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Light" color={mode === 'light' ? 'primary' : 'default'} onClick={() => setMode('light')} />
          <Chip label="Dark" color={mode === 'dark' ? 'primary' : 'default'} onClick={() => setMode('dark')} />
        </Stack>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Semantic palettes</Typography>
        {SEMANTIC_PALETTES.map((name) => {
          const p = c[name];
          return (
            <Stack key={name} spacing={1}>
              <Typography variant="subtitle1">{name}</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 1.5 }}>
                <Swatch name="main" value={p.main} />
                <Swatch name="dark" value={p.dark} />
                <Swatch name="light" value={p.light} />
                <Swatch name="contrast" value={p.contrast} />
              </Box>
            </Stack>
          );
        })}
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Status tint recipe — 160-p on 190-p</Typography>
        <Typography variant="body2" color="text.secondary">
          The standard Alert / banner pairing. Measured AA+ in both modes.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 2 }}>
          {STATUS_PALETTES.map((name) => {
            const p = c[name] as Record<string, string>;
            return (
              <Paper key={name} sx={{ p: 2, bgcolor: p['shades-190-p'], color: p['shades-160-p'] }}>
                <Typography variant="subtitle2" sx={{ color: 'inherit' }}>{name}</Typography>
                <Typography variant="body2" sx={{ color: 'inherit' }}>
                  Background {p['shades-190-p']} · text {p['shades-160-p']}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Text · action · other</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 1.5 }}>
          {Object.entries(c.text).map(([k, v]) => (
            <Swatch key={`text-${k}`} name={`text.${k}`} value={v as string} />
          ))}
          {Object.entries(c.action).map(([k, v]) => (
            <Swatch key={`action-${k}`} name={`action.${k}`} value={v as string} />
          ))}
          {Object.entries(c.other).map(([k, v]) => (
            <Swatch key={`other-${k}`} name={`other.${k}`} value={v as string} />
          ))}
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Background · paper elevation</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 1.5 }}>
          {Object.entries(c.background).map(([k, v]) => (
            <Swatch key={`bg-${k}`} name={`background.${k}`} value={v as string} />
          ))}
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Extended ramps — data-viz escape hatch only</Typography>
        <Typography variant="body2" color="text.secondary">
          Reach for these only for charts and tag categories. Don't use them on UI chrome — that's what the semantic palettes are for.
        </Typography>
        {RAMPS.map((name) => {
          const ramp = c.ramps[name] as Record<string, string>;
          return (
            <Stack key={name} spacing={0.75}>
              <Typography variant="subtitle2">{name}</Typography>
              <Box sx={{ display: 'flex', gap: 0.5, overflow: 'auto' }}>
                {RAMP_STEPS.map((step) => (
                  <Box
                    key={step}
                    sx={{
                      flex: '0 0 64px',
                      height: 56,
                      bgcolor: ramp[step],
                      borderRadius: 0.5,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      pb: 0.5
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255,255,255,0.85)',
                        mixBlendMode: 'difference',
                        fontVariantNumeric: 'tabular-nums'
                      }}
                    >
                      {step}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          );
        })}
      </Stack>

      <Stack spacing={1}>
        <Typography variant="overline">Snapshot</Typography>
        <Typography variant="caption" color="text.secondary">
          {Object.keys(jediTokens.palette).length} top-level palette keys · {Object.keys(c.ramps).length} data-viz ramps · CSS variables emitted on{' '}
          <code>[data-ds="jedi"]</code>.
        </Typography>
      </Stack>
    </Stack>
  );
}

