import MuiTextField, { type TextFieldProps } from '@mui/material/TextField';

export type JediTextFieldProps = TextFieldProps;

export function TextField(props: JediTextFieldProps) {
  return <MuiTextField variant="outlined" fullWidth {...props} />;
}
