import MuiButton, { type ButtonProps } from '@mui/material/Button';

export type JediButtonProps = ButtonProps;

export function Button(props: JediButtonProps) {
  return <MuiButton variant="contained" disableElevation {...props} />;
}
