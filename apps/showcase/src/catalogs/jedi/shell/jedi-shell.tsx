import { useMemo, useState, type ComponentType, type ReactNode } from 'react';
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
  Menu,
  MenuItem,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/UnfoldMore';
import CheckIcon from '@mui/icons-material/Check';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useActiveDS, useActiveDSId, useSetActiveDS } from '../../../platform/ds-context';
import { listDesignSystems, hasDesignSystem, type DSId } from '../../../platform/ds-registry';
import { equivalentSlug } from '../../../platform/ds-equivalence';
import { useDSSearch } from '../../../platform/search-index';
import { usePageHeader } from '../../../platform/page-header';

const SIDEBAR_WIDTH = 264;

function DSSwitcher() {
  const activeId = useActiveDSId();
  const ds = useActiveDS();
  const setActive = useSetActiveDS();
  const { pathname } = useLocation();
  const systems = listDesignSystems();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(anchor);
  const theme = useTheme();

  function switchTo(newId: DSId) {
    setAnchor(null);
    if (newId === activeId) return;
    const parts = pathname.split('/').filter(Boolean);
    const [first, ...rest] = parts;
    const currentSlug = first && hasDesignSystem(first) && rest.length > 0 ? rest.join('/') : 'home';
    const targetSlug = equivalentSlug(activeId, currentSlug, newId);
    if (typeof window !== 'undefined' && targetSlug !== 'home') {
      window.localStorage.setItem('ds.pendingSlug', targetSlug);
    }
    setActive(newId);
  }

  return (
    <>
      <ListItemButton
        onClick={(e) => setAnchor(e.currentTarget)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Switch design system. Current: ${ds.label}`}
        sx={{ p: 1.5, gap: 1.25, flexGrow: 0, flexShrink: 0 }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.25,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 14
          }}
        >
          {ds.label.slice(0, 2).toUpperCase()}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>{ds.label}</Typography>
          <Typography variant="caption" color="text.secondary">{ds.tagline}</Typography>
        </Box>
        <ExpandMoreIcon fontSize="small" sx={{ color: 'text.secondary' }} />
      </ListItemButton>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={() => setAnchor(null)}
        slotProps={{ paper: { sx: { width: SIDEBAR_WIDTH - 24, mt: 0.5 } } }}
        MenuListProps={{ role: 'listbox', dense: true }}
      >
        {systems.map((d) => {
          const isActive = d.id === activeId;
          return (
            <MenuItem
              key={d.id}
              role="option"
              aria-selected={isActive}
              selected={isActive}
              onClick={() => switchTo(d.id)}
              sx={{ alignItems: 'flex-start', py: 1.25 }}
            >
              <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}>
                {isActive ? <CheckIcon fontSize="small" color="primary" /> : null}
              </ListItemIcon>
              <ListItemText
                primary={d.label}
                secondary={d.tagline}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: { color: isActive ? theme.palette.primary.main : 'text.primary', fontWeight: isActive ? 600 : 400 }
                }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

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
          endAdornment: (
            <InputAdornment position="end">
              <Box
                component="kbd"
                sx={{
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                  fontSize: 10,
                  px: 0.75,
                  py: 0.25,
                  borderRadius: 0.5,
                  border: 1,
                  borderColor: 'divider',
                  color: 'text.secondary'
                }}
              >
                ⌘K
              </Box>
            </InputAdornment>
          )
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

function JediThemeSwitcher() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
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
          sx={{ mx: 1, borderRadius: 1 }}
        >
          <ListItemIcon sx={{ minWidth: 32 }}>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Home" primaryTypographyProps={{ variant: 'body2' }} />
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
                    sx={{ mx: 1, borderRadius: 1 }}
                  >
                    <ListItemText
                      primary={entry.title}
                      primaryTypographyProps={{ variant: 'body2' }}
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

function JediShellInner({ children }: { children: ReactNode }) {
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
        <DSSwitcher />
        <Box sx={{ px: 2, pb: 1.5 }}>
          <JediSearch />
        </Box>
        <Divider />
        <JediSidebarNav />
        <Divider />
        <Box sx={{ p: 1.5 }}>
          <JediThemeSwitcher />
        </Box>
      </Paper>
      <Box component="main" sx={{ flex: 1, overflow: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: 5,
            py: 4.5
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 1180 }}>
            <JediPageHeader />
            {children}
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}

export function JediShell({ children }: { children: ReactNode }) {
  return (
    <JediProvider>
      <JediShellInner>{children}</JediShellInner>
    </JediProvider>
  );
}
