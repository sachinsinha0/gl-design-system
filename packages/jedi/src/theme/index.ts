import { createTheme } from '@mui/material/styles';
import { jediTokens } from './tokens';

export { jediTokens } from './tokens';

export const jediTheme = createTheme({
  palette: jediTokens.palette,
  typography: jediTokens.typography,
  shape: jediTokens.shape,
  spacing: jediTokens.spacing
});
