import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Input from "../atoms/Input";

import "../../index.css";

interface Props {
  onChange: (event: object) => void;
  onClickAddCard: VoidFunction;
  value: string;
  inputlabel: string;
}

const useStyles = makeStyles({
  add: {
    margin: "auto 5px",
  },
  root: {
    width: "330px",
  },
  input: {
    margin: 10,
  },
});

// カード一枚のコンポーネント Atoms
function AddList(props: Props) {
  const classes = useStyles();

  return (
    <div className="addlist">
      <Card className={classes.root}>
        <div className="addlistwrapper">
          <Button
            color="primary"
            className={classes.add}
            size="large"
            aria-label="add"
            onClick={props.onClickAddCard}
            variant="contained"
          >
            <AddIcon />
          </Button>
          <Input
            onChange={props.onChange}
            value={props.value}
            inputlabel={props.inputlabel}
            className={classes.input}
          />
        </div>
      </Card>
    </div>
  );
}

export default AddList;
