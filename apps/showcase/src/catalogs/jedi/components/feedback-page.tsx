import { useState } from 'react';
import { Alert, AlertTitle, Snackbar, Stack, Typography, LinearProgress, Skeleton, Button } from '@mui/material';

/**
 * Jedi spec §2.3 (Alert 160-p text on 190-p bg), §3.3 (alert title type token),
 * §6.2 rules 5–6 (every action >400ms shows state; success is explicit, never silent).
 */
export function FeedbackPage() {
  const [snackOpen, setSnackOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Feedback</Typography>
        <Typography variant="body2" color="text.secondary">
          Standard alerts use the 160-p text on 190-p background tint recipe. Success is explicit; silence is bug-like.
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Alerts — tint recipe</Typography>
        <Stack spacing={1.5}>
          <Alert severity="error">
            <AlertTitle>Couldn't save changes</AlertTitle>
            The server returned 500. Your edits are kept — try Save again.
          </Alert>
          <Alert severity="warning">
            <AlertTitle>Cohort capacity nearly full</AlertTitle>
            2 seats remaining. Notify ops if you expect more enrollments today.
          </Alert>
          <Alert severity="info">
            <AlertTitle>Maintenance window</AlertTitle>
            Reports will be unavailable Saturday 2–4 AM IST.
          </Alert>
          <Alert severity="success">
            <AlertTitle>Enrollment complete</AlertTitle>
            14 learners moved to "active" status.
          </Alert>
        </Stack>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Snackbar — explicit success</Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={() => setSnackOpen(true)}>
            Save settings
          </Button>
        </Stack>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3500}
          onClose={() => setSnackOpen(false)}
          message="Settings saved."
        />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Loading — skeleton over spinner</Typography>
        <Typography variant="body2" color="text.secondary">
          Skeletons read as faster for content areas (Doherty threshold). Spinners only for short waits inside controls.
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button variant="outlined" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}>
            Trigger 1.5s wait
          </Button>
          {loading ? <LinearProgress sx={{ flex: 1 }} /> : <Typography variant="body2" color="text.secondary">Idle</Typography>}
        </Stack>
        <Stack spacing={1}>
          <Skeleton variant="text" width={280} />
          <Skeleton variant="text" width={220} />
          <Skeleton variant="rectangular" height={64} />
        </Stack>
      </Stack>
    </Stack>
  );
}
