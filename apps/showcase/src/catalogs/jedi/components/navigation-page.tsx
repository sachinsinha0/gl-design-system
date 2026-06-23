import { useState } from 'react';
import {
  Stack,
  Typography,
  Tabs,
  Tab,
  Breadcrumbs,
  Link,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Box
} from '@mui/material';
import { Home as HomeIcon, Users, BarChart3, Settings as SettingsIcon } from 'lucide-react';

/**
 * Jedi spec §6.1 rule 1 (Hick's law: ≤7 options at a designed decision point) and
 * §6.4 rule 12 (multi-step shows where you are). Tabs + Breadcrumbs + Stepper + BottomNav.
 */
export function NavigationPage() {
  const [tab, setTab] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [step, setStep] = useState(1);
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Navigation</Typography>
        <Typography variant="body2" color="text.secondary">
          Multi-step anything shows where the user is. Cap a designed decision at ~7 options; data-driven lists get search/filter instead.
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Breadcrumbs</Typography>
        <Breadcrumbs>
          <Link underline="hover" component="button" onClick={() => {}}>Home</Link>
          <Link underline="hover" component="button" onClick={() => {}}>Cohorts</Link>
          <Typography color="text.primary">2026 — Spring</Typography>
        </Breadcrumbs>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Tabs</Typography>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Overview" />
          <Tab label="Learners" />
          <Tab label="Revenue" />
          <Tab label="Reports" />
        </Tabs>
        <Typography variant="body2" color="text.secondary">
          Selected: {['Overview', 'Learners', 'Revenue', 'Reports'][tab]}
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Stepper</Typography>
        <Stepper activeStep={step}>
          <Step><StepLabel>Account</StepLabel></Step>
          <Step><StepLabel>Cohort</StepLabel></Step>
          <Step><StepLabel>Review</StepLabel></Step>
          <Step><StepLabel>Done</StepLabel></Step>
        </Stepper>
        <Stack direction="row" spacing={1}>
          <Link component="button" onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</Link>
          <Box sx={{ flex: 1 }} />
          <Link component="button" onClick={() => setStep((s) => Math.min(3, s + 1))}>Next</Link>
        </Stack>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Bottom navigation</Typography>
        <Paper sx={{ overflow: 'hidden' }}>
          <BottomNavigation showLabels value={bottom} onChange={(_, v) => setBottom(v)}>
            <BottomNavigationAction label="Home" icon={<HomeIcon size={18} />} />
            <BottomNavigationAction label="Learners" icon={<Users size={18} />} />
            <BottomNavigationAction label="Reports" icon={<BarChart3 size={18} />} />
            <BottomNavigationAction label="Settings" icon={<SettingsIcon size={18} />} />
          </BottomNavigation>
        </Paper>
      </Stack>
    </Stack>
  );
}
