import { useState } from 'react';
import {
  Stack,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListSubheader,
  Menu,
  MenuItem,
  Button,
  Box
} from '@mui/material';

/**
 * Jedi spec §3.3 — List subheader + menu item (standard + dense). §4.2 rule 10 —
 * density by posture: internal allows dense; partner-facing stays standard.
 */
export function MenusListsPage() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [denseAnchor, setDenseAnchor] = useState<HTMLElement | null>(null);
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Menus &amp; lists</Typography>
        <Typography variant="body2" color="text.secondary">
          Standard density on partner surfaces. Dense menu items are reserved for internal tool views.
        </Typography>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Menu (standard)</Typography>
        <Box>
          <Button variant="outlined" onClick={(e) => setAnchor(e.currentTarget)}>Open actions</Button>
          <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
            <MenuItem onClick={() => setAnchor(null)}>Open report</MenuItem>
            <MenuItem onClick={() => setAnchor(null)}>Duplicate cohort</MenuItem>
            <MenuItem onClick={() => setAnchor(null)}>Export CSV</MenuItem>
            <MenuItem onClick={() => setAnchor(null)} disabled>Archive (read-only)</MenuItem>
          </Menu>
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">Menu (dense — internal only)</Typography>
        <Box>
          <Button variant="outlined" onClick={(e) => setDenseAnchor(e.currentTarget)}>Open dense menu</Button>
          <Menu
            anchorEl={denseAnchor}
            open={Boolean(denseAnchor)}
            onClose={() => setDenseAnchor(null)}
            MenuListProps={{ dense: true }}
          >
            <MenuItem dense onClick={() => setDenseAnchor(null)}>Row · 1</MenuItem>
            <MenuItem dense onClick={() => setDenseAnchor(null)}>Row · 2</MenuItem>
            <MenuItem dense onClick={() => setDenseAnchor(null)}>Row · 3</MenuItem>
            <MenuItem dense onClick={() => setDenseAnchor(null)}>Row · 4</MenuItem>
            <MenuItem dense onClick={() => setDenseAnchor(null)}>Row · 5</MenuItem>
          </Menu>
        </Box>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="overline">List with subheaders</Typography>
        <Paper sx={{ maxWidth: 480 }}>
          <List
            subheader={<ListSubheader disableSticky>Active cohorts</ListSubheader>}
          >
            {['Analytics 101', 'Analytics 201', 'Machine Learning'].map((name) => (
              <ListItem key={name}>
                <ListItemAvatar>
                  <Avatar>{name.slice(0, 2).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} secondary="2026-Spring" />
              </ListItem>
            ))}
          </List>
          <List subheader={<ListSubheader disableSticky>Archived</ListSubheader>}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>CA</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cloud Architecture (legacy)" secondary="2024-Fall" />
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Stack>
  );
}
