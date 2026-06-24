import { useState } from 'react';
import {
  Box,
  Chip,
  InputAdornment,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

type MuiComponent = {
  name: string;
  category: string;
  uiSlug: string;
  apiSlug?: string;
};

function toKebab(name: string): string {
  return name.replace(/([A-Z])/g, (m, c, i) => (i ? '-' : '') + c.toLowerCase()).replace(/^-/, '');
}

const COMPONENTS: MuiComponent[] = [
  // Inputs
  { name: 'Autocomplete', category: 'Inputs', uiSlug: 'autocomplete' },
  { name: 'Button', category: 'Inputs', uiSlug: 'button' },
  { name: 'ButtonGroup', category: 'Inputs', uiSlug: 'button-group' },
  { name: 'Checkbox', category: 'Inputs', uiSlug: 'checkbox' },
  { name: 'DatePicker', category: 'Inputs', uiSlug: 'date-picker', apiSlug: 'date-picker' },
  { name: 'DateTimePicker', category: 'Inputs', uiSlug: 'date-time-picker' },
  { name: 'FilledInput', category: 'Inputs', uiSlug: 'text-field', apiSlug: 'filled-input' },
  { name: 'FormControl', category: 'Inputs', uiSlug: 'text-field', apiSlug: 'form-control' },
  { name: 'FormControlLabel', category: 'Inputs', uiSlug: 'checkbox', apiSlug: 'form-control-label' },
  { name: 'FormGroup', category: 'Inputs', uiSlug: 'checkbox', apiSlug: 'form-group' },
  { name: 'FormHelperText', category: 'Inputs', uiSlug: 'text-field', apiSlug: 'form-helper-text' },
  { name: 'FormLabel', category: 'Inputs', uiSlug: 'text-field', apiSlug: 'form-label' },
  { name: 'IconButton', category: 'Inputs', uiSlug: 'button', apiSlug: 'icon-button' },
  { name: 'InputAdornment', category: 'Inputs', uiSlug: 'text-field', apiSlug: 'input-adornment' },
  { name: 'InputLabel', category: 'Inputs', uiSlug: 'text-field', apiSlug: 'input-label' },
  { name: 'NativeSelect', category: 'Inputs', uiSlug: 'select', apiSlug: 'native-select' },
  { name: 'OutlinedInput', category: 'Inputs', uiSlug: 'text-field', apiSlug: 'outlined-input' },
  { name: 'Radio', category: 'Inputs', uiSlug: 'radio-button', apiSlug: 'radio' },
  { name: 'RadioGroup', category: 'Inputs', uiSlug: 'radio-button', apiSlug: 'radio-group' },
  { name: 'Rating', category: 'Inputs', uiSlug: 'rating' },
  { name: 'Select', category: 'Inputs', uiSlug: 'select' },
  { name: 'Slider', category: 'Inputs', uiSlug: 'slider' },
  { name: 'Switch', category: 'Inputs', uiSlug: 'switch' },
  { name: 'TextField', category: 'Inputs', uiSlug: 'text-field' },
  { name: 'TimePicker', category: 'Inputs', uiSlug: 'time-picker' },
  { name: 'ToggleButton', category: 'Inputs', uiSlug: 'toggle-button', apiSlug: 'toggle-button' },
  { name: 'ToggleButtonGroup', category: 'Inputs', uiSlug: 'toggle-button', apiSlug: 'toggle-button-group' },
  // Data display
  { name: 'Avatar', category: 'Data display', uiSlug: 'avatar' },
  { name: 'AvatarGroup', category: 'Data display', uiSlug: 'avatar', apiSlug: 'avatar-group' },
  { name: 'Badge', category: 'Data display', uiSlug: 'badge' },
  { name: 'Chip', category: 'Data display', uiSlug: 'chip' },
  { name: 'Divider', category: 'Data display', uiSlug: 'divider' },
  { name: 'List', category: 'Data display', uiSlug: 'list' },
  { name: 'ListItem', category: 'Data display', uiSlug: 'list', apiSlug: 'list-item' },
  { name: 'ListItemAvatar', category: 'Data display', uiSlug: 'list', apiSlug: 'list-item-avatar' },
  { name: 'ListItemButton', category: 'Data display', uiSlug: 'list', apiSlug: 'list-item-button' },
  { name: 'ListItemIcon', category: 'Data display', uiSlug: 'list', apiSlug: 'list-item-icon' },
  { name: 'ListItemText', category: 'Data display', uiSlug: 'list', apiSlug: 'list-item-text' },
  { name: 'Table', category: 'Data display', uiSlug: 'table' },
  { name: 'TableBody', category: 'Data display', uiSlug: 'table', apiSlug: 'table-body' },
  { name: 'TableCell', category: 'Data display', uiSlug: 'table', apiSlug: 'table-cell' },
  { name: 'TableContainer', category: 'Data display', uiSlug: 'table', apiSlug: 'table-container' },
  { name: 'TableHead', category: 'Data display', uiSlug: 'table', apiSlug: 'table-head' },
  { name: 'TablePagination', category: 'Data display', uiSlug: 'table', apiSlug: 'table-pagination' },
  { name: 'TableRow', category: 'Data display', uiSlug: 'table', apiSlug: 'table-row' },
  { name: 'TableSortLabel', category: 'Data display', uiSlug: 'table', apiSlug: 'table-sort-label' },
  { name: 'Tooltip', category: 'Data display', uiSlug: 'tooltip' },
  { name: 'Typography', category: 'Data display', uiSlug: 'typography' },
  // Feedback
  { name: 'Alert', category: 'Feedback', uiSlug: 'alert' },
  { name: 'AlertTitle', category: 'Feedback', uiSlug: 'alert', apiSlug: 'alert-title' },
  { name: 'Backdrop', category: 'Feedback', uiSlug: 'backdrop' },
  { name: 'CircularProgress', category: 'Feedback', uiSlug: 'progress', apiSlug: 'circular-progress' },
  { name: 'Dialog', category: 'Feedback', uiSlug: 'dialog' },
  { name: 'DialogActions', category: 'Feedback', uiSlug: 'dialog', apiSlug: 'dialog-actions' },
  { name: 'DialogContent', category: 'Feedback', uiSlug: 'dialog', apiSlug: 'dialog-content' },
  { name: 'DialogTitle', category: 'Feedback', uiSlug: 'dialog', apiSlug: 'dialog-title' },
  { name: 'LinearProgress', category: 'Feedback', uiSlug: 'progress', apiSlug: 'linear-progress' },
  { name: 'Skeleton', category: 'Feedback', uiSlug: 'skeleton' },
  { name: 'Snackbar', category: 'Feedback', uiSlug: 'snackbar' },
  // Surfaces
  { name: 'Accordion', category: 'Surfaces', uiSlug: 'accordion' },
  { name: 'AccordionDetails', category: 'Surfaces', uiSlug: 'accordion', apiSlug: 'accordion-details' },
  { name: 'AccordionSummary', category: 'Surfaces', uiSlug: 'accordion', apiSlug: 'accordion-summary' },
  { name: 'AppBar', category: 'Surfaces', uiSlug: 'app-bar' },
  { name: 'Card', category: 'Surfaces', uiSlug: 'card' },
  { name: 'CardActionArea', category: 'Surfaces', uiSlug: 'card', apiSlug: 'card-action-area' },
  { name: 'CardActions', category: 'Surfaces', uiSlug: 'card', apiSlug: 'card-actions' },
  { name: 'CardContent', category: 'Surfaces', uiSlug: 'card', apiSlug: 'card-content' },
  { name: 'CardHeader', category: 'Surfaces', uiSlug: 'card', apiSlug: 'card-header' },
  { name: 'CardMedia', category: 'Surfaces', uiSlug: 'card', apiSlug: 'card-media' },
  { name: 'Paper', category: 'Surfaces', uiSlug: 'paper' },
  { name: 'Toolbar', category: 'Surfaces', uiSlug: 'app-bar', apiSlug: 'toolbar' },
  // Navigation
  { name: 'BottomNavigation', category: 'Navigation', uiSlug: 'bottom-navigation' },
  { name: 'BottomNavigationAction', category: 'Navigation', uiSlug: 'bottom-navigation', apiSlug: 'bottom-navigation-action' },
  { name: 'Breadcrumbs', category: 'Navigation', uiSlug: 'breadcrumbs' },
  { name: 'Drawer', category: 'Navigation', uiSlug: 'drawer' },
  { name: 'Link', category: 'Navigation', uiSlug: 'link' },
  { name: 'Menu', category: 'Navigation', uiSlug: 'menu' },
  { name: 'MenuList', category: 'Navigation', uiSlug: 'menu', apiSlug: 'menu-list' },
  { name: 'MenuItem', category: 'Navigation', uiSlug: 'menu', apiSlug: 'menu-item' },
  { name: 'Pagination', category: 'Navigation', uiSlug: 'pagination' },
  { name: 'SpeedDial', category: 'Navigation', uiSlug: 'speed-dial' },
  { name: 'Stepper', category: 'Navigation', uiSlug: 'stepper' },
  { name: 'Step', category: 'Navigation', uiSlug: 'stepper', apiSlug: 'step' },
  { name: 'StepLabel', category: 'Navigation', uiSlug: 'stepper', apiSlug: 'step-label' },
  { name: 'SwipeableDrawer', category: 'Navigation', uiSlug: 'drawer', apiSlug: 'swipeable-drawer' },
  { name: 'Tab', category: 'Navigation', uiSlug: 'tabs', apiSlug: 'tab' },
  { name: 'Tabs', category: 'Navigation', uiSlug: 'tabs' },
  // Layout
  { name: 'Box', category: 'Layout', uiSlug: 'box' },
  { name: 'Container', category: 'Layout', uiSlug: 'container' },
  { name: 'Grid', category: 'Layout', uiSlug: 'grid' },
  { name: 'Grid2', category: 'Layout', uiSlug: 'grid2', apiSlug: 'grid2' },
  { name: 'ImageList', category: 'Layout', uiSlug: 'image-list' },
  { name: 'Stack', category: 'Layout', uiSlug: 'stack' },
];

const BASE = 'https://mui.com/material-ui';

const CATEGORIES = Array.from(new Set(COMPONENTS.map((c) => c.category)));

export function MuiBrowsePage() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const filtered = q
    ? COMPONENTS.filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
    : COMPONENTS;

  const grouped = CATEGORIES.map((cat) => ({
    cat,
    items: filtered.filter((c) => c.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Search any MUI component — links open the official docs in a new tab.
        </Typography>
        <TextField
          size="small"
          fullWidth
          placeholder="Search components…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 480 }}
        />
        {q ? (
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </Typography>
        ) : null}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {grouped.map(({ cat, items }) => (
          <Box key={cat}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Typography variant="overline" color="text.secondary">{cat}</Typography>
              <Chip label={items.length} size="small" sx={{ height: 18, fontSize: 11 }} />
            </Box>
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>Component</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>UI docs</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 12 }}>API reference</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((c) => {
                    const apiSlug = c.apiSlug ?? toKebab(c.name);
                    return (
                      <TableRow key={c.name} hover>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{c.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`${BASE}/react-${c.uiSlug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: 13 }}
                          >
                            UI guide <OpenInNewIcon sx={{ fontSize: 13 }} />
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`${BASE}/api/${apiSlug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, fontSize: 13 }}
                          >
                            API <OpenInNewIcon sx={{ fontSize: 13 }} />
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
        {filtered.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No components match &ldquo;{query}&rdquo;. Try a shorter term or check the spelling.
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}
