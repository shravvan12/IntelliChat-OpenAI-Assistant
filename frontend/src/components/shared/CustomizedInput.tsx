import React from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
      margin='normal'
      name={props.name}
      label={props.label}
      type={props.type}
      variant="outlined"
      fullWidth
      sx={{
        width: '400px',
        input: {
          color: 'white',
          fontSize: '20px',
        },
        label: {
          color: 'white',
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'cyan',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'aqua',
          },
        },
      }}
    />
  );
};

export default CustomizedInput;
