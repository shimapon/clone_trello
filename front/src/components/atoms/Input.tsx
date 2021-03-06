import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  onChange: any;
  value: string;
  inputlabel: string;
  className: string;
}

// カード一枚のコンポーネント Atoms
function Input(props: Props) {
  return (
    <TextField
      className={props.className}
      variant="outlined"
      margin="normal"
      fullWidth
      label={props.inputlabel}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default Input;
