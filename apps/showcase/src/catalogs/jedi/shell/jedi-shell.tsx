import { useState, type ComponentType, type ReactNode } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { withBase } from '../../../platform/base';
import { JediProvider } from '@gl/jedi';
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useActiveDS, useActiveDSId } from '../../../platform/ds-context';
import { type DSId } from '../../../platform/ds-registry';
import { useDSSearch } from '../../../platform/search-index';
import { usePageHeader } from '../../../platform/page-header';
import { SharedDSSwitcher } from '../../../platform/ds-switcher';

const SIDEBAR_WIDTH = 264;

function JediSearch() {
  const activeId = useActiveDSId();
  const [query, setQuery] = useState('');
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const results = useDSSearch(query);
  const open = Boolean(anchor) && query.trim().length > 0 && results.length > 0;

  function navigateTo(path: string, targetDsId: DSId) {
    setQuery('');
    setAnchor(null);
    if (targetDsId !== activeId) {
      window.location.assign(withBase(path));
    } else {
      window.history.pushState(null, '', withBase(path));
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }

  return (
    <>
      <TextField
        size="small"
        fullWidth
        type="search"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setAnchor(e.currentTarget);
        }}
        onFocus={(e) => setAnchor(e.currentTarget)}
        inputProps={{ 'aria-label': 'Search design systems', role: 'searchbox' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
      />
      <Popper
        open={open}
        anchorEl={anchor}
        placement="bottom-start"
        style={{ width: anchor?.clientWidth, zIndex: 1300 }}
      >
        <Paper elevation={4} sx={{ mt: 0.5, maxHeight: 360, overflow: 'auto' }}>
          <List dense disablePadding role="listbox">
            {results.map((r) => (
              <ListItemButton key={r.id} onClick={() => navigateTo(r.path, r.dsId)} role="option">
                <ListItemText
                  primary={r.title}
                  secondary={`${r.dsLabel} · ${r.group}`}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </Popper>
    </>
  );
}

function JediThemeSwitcher({ mode, setMode }: { mode: 'light' | 'dark'; setMode: (m: 'light' | 'dark') => void }) {
  const isDark = mode === 'dark';
  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ width: '100%' }}>
      <IconButton
        size="small"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={() => setMode(isDark ? 'light' : 'dark')}
        sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}
      >
        {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
      </IconButton>
    </Stack>
  );
}

function JediSidebarNav() {
  const { pathname } = useLocation();
  const ds = useActiveDS();
  const dsId = useActiveDSId();
  const homePath = `/${dsId}`;
  return (
    <Box sx={{ flex: 1, overflow: 'auto', py: 1.5 }}>
      <List dense disablePadding subheader={<li />}>
        <ListItemButton
          component={RouterLink}
          to={homePath}
          selected={pathname === homePath}
          sx={{ mx: 1, borderRadius: 1, py: '8px', px: '10px' }}
        >
          <ListItemIcon sx={{ minWidth: 28 }}>
            <HomeIcon sx={{ fontSize: 16 }} />
          </ListItemIcon>
          <ListItemText primary="Home" primaryTypographyProps={{ sx: { fontSize: 13 } }} />
        </ListItemButton>
        {ds.registry.map((group) => {
          const GroupIcon = group.icon as ComponentType<{ size?: number; color?: string }> | undefined;
          return (
            <Box key={group.id} sx={{ mt: 1.5 }}>
              <ListSubheader
                disableSticky
                sx={{
                  bgcolor: 'transparent',
                  px: 2,
                  py: 0.5,
                  lineHeight: 1.5,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 0.6,
                  color: 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75
                }}
              >
                {GroupIcon ? <GroupIcon size={13} color="currentColor" /> : null}
                {group.label}
              </ListSubheader>
              {group.entries.map((entry) => {
                const to = `${homePath}/${entry.slug}`;
                const selected = pathname === to;
                return (
                  <ListItemButton
                    key={entry.slug}
                    component={RouterLink}
                    to={to}
                    selected={selected}
                    sx={{ mx: 1, borderRadius: 1, py: '8px', px: '10px' }}
                  >
                    <ListItemText
                      primary={entry.title}
                      primaryTypographyProps={{ sx: { fontSize: 13 } }}
                    />
                  </ListItemButton>
                );
              })}
            </Box>
          );
        })}
      </List>
    </Box>
  );
}

function JediPageHeader() {
  const { eyebrow, title } = usePageHeader();
  const dsId = useActiveDSId();
  const { pathname } = useLocation();
  if (pathname === `/${dsId}` || pathname === '/') return null;
  return (
    <Box sx={{ pb: 2 }}>
      {eyebrow ? (
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ display: 'block', lineHeight: 1.6 }}
        >
          {eyebrow}
        </Typography>
      ) : null}
      <Typography variant="h4" sx={{ fontWeight: 600 }}>{title}</Typography>
    </Box>
  );
}

function JediShellInner({ children, mode, setMode }: { children: ReactNode; mode: 'light' | 'dark'; setMode: (m: 'light' | 'dark') => void }) {
  const theme = useTheme();
  return (
    <Stack direction="row" sx={{ height: '100vh', bgcolor: 'background.default' }}>
      <Paper
        component="aside"
        square
        elevation={0}
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRight: 1,
          borderColor: 'divider',
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50'
        }}
      >
        <SharedDSSwitcher />
        <Box sx={{ px: 2, pb: 1.5 }}>
          <JediSearch />
        </Box>
        <Divider />
        <JediSidebarNav />
        <Divider />
        <Box sx={{ p: 1.5 }}>
          <JediThemeSwitcher mode={mode} setMode={setMode} />
        </Box>
      </Paper>
      <Box component="main" sx={{ flex: 1, minWidth: 0, overflow: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: 5,
            py: 4.5
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 1180, minWidth: 0 }}>
            <JediPageHeader />
            {children}
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

export function JediShell({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  return (
    <JediProvider mode={mode}>
      <JediShellInner mode={mode} setMode={setMode}>{children}</JediShellInner>
    </JediProvider>
  );
}
