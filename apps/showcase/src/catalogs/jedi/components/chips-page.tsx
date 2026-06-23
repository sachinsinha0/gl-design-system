import { Stack, Typography, Chip, Box, Avatar } from '@mui/material';
import { Check, X } from 'lucide-react';

/**
 * Jedi spec §3.3 — Chip type token (Inter 500, 12/16/0.16). §2.5 — chips remain
 * outlined (flat system). §4.2 rule 5 — never communicate state through color alone;
 * status chips pair color with an icon.
 */
export function ChipsPage() {
  return (
    <Stack spacing={4} sx={{ maxWidth: 700 }}>
      <Stack spacing={1}>
        <Typography variant="h4">Chips</Typography>
        <Typography variant="body2" color="text.secondary">
          Outlined by default. Status chips pair color with an icon — never color alone.
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Filter chips</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label="All" color="primary" />
          <Chip label="Active" />
          <Chip label="Archived" />
          <Chip label="Draft" />
        </Stack>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Status (color + icon)</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip label="Approved" icon={<Check size={14} />} color="success" />
          <Chip label="Rejected" icon={<X size={14} />} color="error" />
          <Chip label="Pending" color="warning" />
          <Chip label="Note" color="info" />
        </Stack>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">With avatar / deletable</Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            avatar={<Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>JC</Avatar>}
            label="Jane Cooper"
            onDelete={() => {}}
          />
          <Chip label="Cohort 2026" onDelete={() => {}} />
        </Stack>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Sizes</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip label="Small" size="small" />
          <Chip label="Medium" />
        </Box>
      </Stack>
    </Stack>
  );
}
