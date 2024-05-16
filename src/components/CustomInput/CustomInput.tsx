import { TextField } from '@mui/material';
import './CustomInput.scss';
import { ChangeEvent } from 'react';

type Props = {
  name: string;
  label: string;
  value: string;
  error: boolean | undefined;
  helperText: string | false | undefined;
  onChange: (e: ChangeEvent) => void;
  onBlur: (e: React.FocusEvent) => void;
};

export const CustomInput: React.FC<Props> = ({
  name,
  label,
  value,
  error,
  helperText,
  onChange,
  onBlur,
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
      onBlur={onBlur}
      color="secondary"
      variant="outlined"
      className="input-wrapper"
      fullWidth
      autoComplete={name}
    />
  );
};
