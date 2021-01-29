import React, { MouseEvent } from "react";
import Title from "../atoms/Title";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import IconButton from "@material-ui/core/IconButton";

interface Props {
  onClick: (event: MouseEvent) => void;
}

// カード一枚のコンポーネント Atoms
function BoardLabel(props: Props) {
  return (
    <div>
      <IconButton
        color="primary"
        aria-label="backPage"
        component="span"
        onClick={props.onClick}
      >
        <KeyboardBackspaceIcon fontSize="large" />
      </IconButton>

      <Title text="Board A" />
    </div>
  );
}

export default BoardLabel;
