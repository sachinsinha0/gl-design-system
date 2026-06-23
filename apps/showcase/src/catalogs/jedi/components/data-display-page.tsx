import {
  Stack,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Chip,
  Avatar
} from '@mui/material';

/**
 * Jedi spec §6.6 — Table scannability:
 *   rule 15: numbers right-align, lining/tabular figures
 *   rule 16: front-load the distinguishing word
 *   rule 17: label muted (text.secondary), value emphasized (text.primary)
 *   rule 20: clean left edges, no centered body
 *
 * Theme override emits `font-variant-numeric: tabular-nums` on every `TableCell`.
 */
type Row = { name: string; cohort: string; seats: number; revenue: number; status: 'Active' | 'Draft' | 'Archived' };

const rows: Row[] = [
  { name: 'Analytics 101', cohort: '2026-Spring', seats: 42, revenue: 168_400, status: 'Active' },
  { name: 'Analytics 201', cohort: '2026-Spring', seats: 18, revenue: 90_000, status: 'Active' },
  { name: 'Cloud Architecture', cohort: '2025-Fall', seats: 7, revenue: 35_000, status: 'Draft' },
  { name: 'Cloud Architecture (legacy)', cohort: '2024-Fall', seats: 0, revenue: 0, status: 'Archived' },
  { name: 'Machine Learning', cohort: '2026-Spring', seats: 96, revenue: 432_000, status: 'Active' }
];

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const statusColor: Record<Row['status'], 'success' | 'warning' | 'default'> = {
  Active: 'success',
  Draft: 'warning',
  Archived: 'default'
};

export function DataDisplayPage() {
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Tables &amp; key-value</Typography>
        <Typography variant="body2" color="text.secondary">
          Numbers right-align with tabular figures. Distinguishing word goes first.
        </Typography>
      </Stack>

      <Paper sx={{ overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Cohort</TableCell>
              <TableCell align="right">Seats filled</TableCell>
              <TableCell align="right">Revenue</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.name} hover>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.cohort}</TableCell>
                <TableCell align="right">{r.seats}</TableCell>
                <TableCell align="right">{inr.format(r.revenue)}</TableCell>
                <TableCell>
                  <Chip size="small" label={r.status} color={statusColor[r.status]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Stack spacing={1.5}>
        <Typography variant="overline">Key-value display</Typography>
        <Typography variant="body2" color="text.secondary">
          Label muted, value emphasized — lets the eye skip labels and jump value-to-value (§6.6 rule 17).
        </Typography>
        <Paper sx={{ p: 3, maxWidth: 520 }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Avatar>JC</Avatar>
            <Stack>
              <Typography variant="subtitle1">Jane Cooper</Typography>
              <Typography variant="body2" color="text.secondary">Senior PM · Bengaluru</Typography>
            </Stack>
          </Stack>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: 3, rowGap: 1 }}>
            {[
              ['Employee ID', 'JD-09241'],
              ['Cohort', '2026-Spring'],
              ['Joined', '14 Mar 2024'],
              ['Manager', 'A. Krishnan'],
              ['Outstanding', inr.format(0)]
            ].map(([label, value]) => (
              <>
                <Typography key={`${label}-l`} variant="body2" color="text.secondary">{label}</Typography>
                <Typography key={`${label}-v`} variant="body2" sx={{ fontVariantNumeric: 'tabular-nums' }}>
                  {value}
                </Typography>
              </>
            ))}
          </Box>
        </Paper>
      </Stack>
    </Stack>
  );
}
