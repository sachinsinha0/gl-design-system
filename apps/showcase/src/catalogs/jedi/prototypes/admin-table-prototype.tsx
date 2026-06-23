import { useMemo, useState } from 'react';
import {
  Stack,
  Typography,
  Paper,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  IconButton,
  Tooltip,
  Chip,
  InputAdornment,
  Button
} from '@mui/material';
import { TextField } from '@gl/jedi';
import { Search, MoreVertical, RefreshCw } from 'lucide-react';

/**
 * Internal-tool prototype: admin learner table.
 * Demonstrates §6.6 scannability (right-aligned numbers, front-loaded distinguishing word,
 * label/value distinction in side panel, clean left edges, one primary action),
 * §6.4 rule 13 (empty states are starting points), and §4.2 rule 10 (dense internal density).
 */
type Learner = {
  id: string;
  name: string;
  cohort: string;
  attended: number;
  total: number;
  outstanding: number;
  status: 'Active' | 'At risk' | 'Paused';
};

const ALL_LEARNERS: Learner[] = [
  { id: '09241', name: 'Aakash Krishnan',  cohort: '2026-Spring', attended: 12, total: 14, outstanding: 0,     status: 'Active' },
  { id: '09242', name: 'Bhavana Rao',      cohort: '2026-Spring', attended: 8,  total: 14, outstanding: 0,     status: 'At risk' },
  { id: '09243', name: 'Chen Wei',         cohort: '2026-Spring', attended: 14, total: 14, outstanding: 0,     status: 'Active' },
  { id: '09244', name: 'Daniel Okafor',    cohort: '2025-Fall',   attended: 5,  total: 12, outstanding: 22000, status: 'At risk' },
  { id: '09245', name: 'Esha Patel',       cohort: '2026-Spring', attended: 11, total: 14, outstanding: 0,     status: 'Active' },
  { id: '09246', name: 'Fernando García',  cohort: '2026-Summer', attended: 2,  total: 4,  outstanding: 18000, status: 'Paused' },
  { id: '09247', name: 'Grace Lin',        cohort: '2026-Spring', attended: 13, total: 14, outstanding: 0,     status: 'Active' },
  { id: '09248', name: 'Hari Mohan',       cohort: '2025-Fall',   attended: 11, total: 12, outstanding: 0,     status: 'Active' }
];

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const statusColor: Record<Learner['status'], 'success' | 'warning' | 'default'> = {
  Active: 'success',
  'At risk': 'warning',
  Paused: 'default'
};

type SortKey = keyof Pick<Learner, 'name' | 'cohort' | 'attended' | 'outstanding'>;

export function AdminTablePrototype() {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? ALL_LEARNERS.filter((l) => l.name.toLowerCase().includes(q) || l.id.includes(q)) : ALL_LEARNERS;
    return [...list].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return dir === 'asc' ? cmp : -cmp;
    });
  }, [query, sortKey, dir]);

  const paged = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  function toggleSort(key: SortKey) {
    if (key === sortKey) setDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setDir('asc'); }
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="overline">Internal · Admin</Typography>
        <Typography variant="h3">Learner roster</Typography>
        <Typography variant="body2" color="text.secondary">
          Scan-first table: numbers right-align with tabular figures, distinguishing word first, status pairs color with label.
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          size="small"
          placeholder="Search by name or ID"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(0); }}
          sx={{ maxWidth: 320 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              )
            }
          }}
        />
        <Box sx={{ flex: 1 }} />
        <Tooltip title="Refresh">
          <IconButton aria-label="Refresh roster" onClick={() => {}}>
            <RefreshCw size={18} />
          </IconButton>
        </Tooltip>
        <Button variant="contained">Add learner</Button>
      </Stack>

      <Paper sx={{ overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sortDirection={sortKey === 'name' ? dir : false}>
                <TableSortLabel active={sortKey === 'name'} direction={dir} onClick={() => toggleSort('name')}>
                  Learner
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={sortKey === 'cohort' ? dir : false}>
                <TableSortLabel active={sortKey === 'cohort'} direction={dir} onClick={() => toggleSort('cohort')}>
                  Cohort
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sortDirection={sortKey === 'attended' ? dir : false}>
                <TableSortLabel active={sortKey === 'attended'} direction={dir} onClick={() => toggleSort('attended')}>
                  Attended
                </TableSortLabel>
              </TableCell>
              <TableCell align="right" sortDirection={sortKey === 'outstanding' ? dir : false}>
                <TableSortLabel active={sortKey === 'outstanding'} direction={dir} onClick={() => toggleSort('outstanding')}>
                  Outstanding
                </TableSortLabel>
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right" sx={{ width: 56 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Stack spacing={1} sx={{ py: 4, alignItems: 'center' }}>
                    <Typography variant="subtitle1">No learners match "{query}"</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try a different name or ID, or add the first learner to this view.
                    </Typography>
                    <Button variant="contained" onClick={() => setQuery('')}>Clear search</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ) : paged.map((l) => (
              <TableRow key={l.id} hover>
                <TableCell>
                  <Stack>
                    <Typography variant="body2">{l.name}</Typography>
                    <Typography variant="caption" color="text.secondary">ID · {l.id}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{l.cohort}</TableCell>
                <TableCell align="right">{l.attended} / {l.total}</TableCell>
                <TableCell align="right">{l.outstanding === 0 ? '—' : inr.format(l.outstanding)}</TableCell>
                <TableCell><Chip size="small" label={l.status} color={statusColor[l.status]} /></TableCell>
                <TableCell align="right">
                  <Tooltip title={`More actions for ${l.name}`}>
                    <IconButton size="small" aria-label={`More actions for ${l.name}`}>
                      <MoreVertical size={16} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, p) => setPage(p)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
        />
      </Paper>
    </Stack>
  );
}
