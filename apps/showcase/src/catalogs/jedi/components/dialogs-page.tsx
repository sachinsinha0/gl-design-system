import { useState } from 'react';
import {
  Stack,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar
} from '@mui/material';

/**
 * Jedi spec §6.2 rule 7 — Destructive actions confirm; reversible actions don't.
 * Pair the destructive confirm with an explicit success snackbar (§6.2 rule 6).
 */
export function DialogsPage() {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Dialogs</Typography>
        <Typography variant="body2" color="text.secondary">
          Confirm destructive actions only. Reversible actions execute immediately with an undo path.
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Destructive confirm</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined" color="error" onClick={() => setOpen(true)}>
            Delete cohort
          </Button>
        </Stack>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Delete cohort 2026-Spring?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              42 enrolled learners will lose access to course content. This cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={() => setOpen(false)}>Keep cohort</Button>
            <Button variant="contained" color="error" onClick={() => { setOpen(false); setDone(true); }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={done} autoHideDuration={3500} onClose={() => setDone(false)} message="Cohort deleted." />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Informational</Typography>
        <Button variant="outlined" onClick={() => setInfoOpen(true)}>What's in this report?</Button>
        <Dialog open={infoOpen} onClose={() => setInfoOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Cohort revenue report</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Includes paid + complimentary enrollments. Excludes refunds processed in the last 24 hours.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setInfoOpen(false)}>Got it</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Stack>
  );
}
