import { useState } from 'react';
import {
  Stack,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
  AlertTitle,
  Snackbar
} from '@mui/material';
import { TextField } from '@gl/jedi';

/**
 * Partner-facing prototype: cohort registration form.
 * Demonstrates §6.1 rule 2 (7±2 visible fields per step), rule 4 (one primary action),
 * §6.2 rules 5–7 (visible state, explicit success, no confirm for reversible),
 * §6.3 rules 8–10 (validate on blur, helpful errors, never destroy input),
 * §6.4 rule 12 (multi-step shows where you are).
 */
const steps = ['Faculty', 'Cohort', 'Review'] as const;

type Form = {
  fullName: string;
  email: string;
  designation: string;
  cohort: string;
  startDate: string;
  capacity: string;
  consent: boolean;
};

const empty: Form = {
  fullName: '',
  email: '',
  designation: '',
  cohort: '2026-spring',
  startDate: '',
  capacity: '40',
  consent: false
};

export function PartnerFormPrototype() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [touched, setTouched] = useState<Record<keyof Form, boolean>>({} as Record<keyof Form, boolean>);
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function blur<K extends keyof Form>(key: K) {
    setTouched((t) => ({ ...t, [key]: true }));
  }

  const emailError = touched.email && form.email.length > 0 && !form.email.includes('@');
  const nameError = touched.fullName && form.fullName.trim().length < 2;
  const step0Valid = form.fullName.trim().length >= 2 && form.email.includes('@');

  return (
    <Stack spacing={3} sx={{ maxWidth: 640 }}>
      <Stack spacing={1}>
        <Typography variant="overline">Partner · Visiting faculty</Typography>
        <Typography variant="h3">Register a cohort</Typography>
        <Typography variant="body2" color="text.secondary">
          Three short steps. Inline validation runs on blur, not every keystroke.
        </Typography>
      </Stack>

      <Stepper activeStep={step}>
        {steps.map((label) => (
          <Step key={label}><StepLabel>{label}</StepLabel></Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3 }}>
        {step === 0 && (
          <Stack spacing={2}>
            <TextField
              label="Full name"
              value={form.fullName}
              onChange={(e) => set('fullName', e.target.value)}
              onBlur={() => blur('fullName')}
              error={nameError}
              helperText={nameError ? 'Enter at least 2 characters.' : 'Appears on enrollment confirmations.'}
              required
            />
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              onBlur={() => blur('email')}
              error={emailError}
              helperText={emailError ? 'Must contain @.' : 'We will email the cohort link here.'}
              required
            />
            <TextField
              label="Designation"
              value={form.designation}
              onChange={(e) => set('designation', e.target.value)}
              helperText="Optional. Shown to learners."
            />
          </Stack>
        )}

        {step === 1 && (
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel id="cohort-label">Cohort</InputLabel>
              <Select
                labelId="cohort-label"
                label="Cohort"
                value={form.cohort}
                onChange={(e) => set('cohort', e.target.value)}
              >
                <MenuItem value="2026-spring">2026 — Spring</MenuItem>
                <MenuItem value="2026-summer">2026 — Summer</MenuItem>
                <MenuItem value="2025-fall">2025 — Fall</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Start date"
              type="date"
              value={form.startDate}
              onChange={(e) => set('startDate', e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              helperText="Constrain free-text dates with a date picker (§6.3 rule 8)."
            />
            <TextField
              label="Capacity"
              type="number"
              value={form.capacity}
              onChange={(e) => set('capacity', e.target.value)}
              helperText="Default = the most common cohort size (Tesler's law)."
            />
          </Stack>
        )}

        {step === 2 && (
          <Stack spacing={2}>
            <Typography variant="subtitle1">Review</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: 3, rowGap: 1 }}>
              {[
                ['Faculty', form.fullName || '—'],
                ['Email', form.email || '—'],
                ['Designation', form.designation || '—'],
                ['Cohort', form.cohort],
                ['Start date', form.startDate || '—'],
                ['Capacity', form.capacity]
              ].map(([label, value]) => (
                <>
                  <Typography key={`${label}-l`} variant="body2" color="text.secondary">{label}</Typography>
                  <Typography key={`${label}-v`} variant="body2">{value}</Typography>
                </>
              ))}
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.consent}
                  onChange={(e) => set('consent', e.target.checked)}
                />
              }
              label="I confirm the information above is correct."
            />
            {!form.consent && touched.consent && (
              <Alert severity="warning">
                <AlertTitle>Almost there</AlertTitle>
                Tick the confirmation box to submit. Your entries are kept either way.
              </Alert>
            )}
          </Stack>
        )}
      </Paper>

      <Stack direction="row" spacing={1}>
        <Button variant="text" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          Back
        </Button>
        <Box sx={{ flex: 1 }} />
        {step < steps.length - 1 ? (
          <Button
            variant="contained"
            disabled={step === 0 && !step0Valid}
            onClick={() => setStep((s) => s + 1)}
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              blur('consent');
              if (!form.consent) return;
              setSubmitted(true);
            }}
          >
            Submit
          </Button>
        )}
      </Stack>

      <Snackbar
        open={submitted}
        autoHideDuration={3500}
        onClose={() => setSubmitted(false)}
        message={`Cohort ${form.cohort} registered.`}
      />
    </Stack>
  );
}
