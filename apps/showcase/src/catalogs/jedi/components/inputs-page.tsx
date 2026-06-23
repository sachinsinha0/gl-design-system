import { useState } from 'react';
import {
  Stack,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormGroup,
  Switch,
  FormHelperText
} from '@mui/material';
import { TextField } from '@gl/jedi';

/**
 * Jedi spec §3.3 (input/helper/menu type tokens), §4.2 (focus visible, no fake-disable),
 * §6.3 (validate on blur — prevent before scold).
 */
export function InputsPage() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const emailError = touched && email.length > 0 && !email.includes('@');

  return (
    <Stack spacing={4} sx={{ maxWidth: 560 }}>
      <Stack spacing={1}>
        <Typography variant="h4">Inputs</Typography>
        <Typography variant="body2" color="text.secondary">
          Validate on blur, not every keystroke. Helper text is part of the layout — reserve the space.
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="overline">Text fields</Typography>
        <TextField label="Full name" placeholder="Jane Cooper" helperText="Used on certificates." />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          error={emailError}
          helperText={emailError ? 'Enter a valid email address (must contain @).' : 'Work email preferred.'}
        />
        <TextField label="Password" type="password" helperText="At least 12 characters." />
        <TextField label="Disabled" value="Not editable" disabled helperText="action.disabled — never opacity." />
      </Stack>

      <Stack spacing={2}>
        <Typography variant="overline">Select</Typography>
        <FormControl fullWidth>
          <InputLabel id="cohort-label">Cohort</InputLabel>
          <Select labelId="cohort-label" label="Cohort" defaultValue="2026-spring">
            <MenuItem value="2026-spring">2026 — Spring</MenuItem>
            <MenuItem value="2026-summer">2026 — Summer</MenuItem>
            <MenuItem value="2025-fall">2025 — Fall</MenuItem>
          </Select>
          <FormHelperText>Default = the most common option (Tesler's law).</FormHelperText>
        </FormControl>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="overline">Selection controls</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Email me weekly digests" />
          <FormControlLabel control={<Checkbox />} label="Share my profile with mentors" />
        </FormGroup>
        <RadioGroup defaultValue="standard">
          <FormControlLabel value="standard" control={<Radio />} label="Standard density" />
          <FormControlLabel value="dense" control={<Radio />} label="Dense (internal only)" />
        </RadioGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Notifications" />
      </Stack>
    </Stack>
  );
}
