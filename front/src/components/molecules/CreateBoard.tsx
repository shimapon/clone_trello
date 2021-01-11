import React from "react";
import Input from "../atoms/Input";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";

interface Props {
  text: string;
  onChange: (event: object) => void;
  value: string;
  inputlabel: string;
  onClickCreate: VoidFunction;
  onClickCancel: VoidFunction;
  onClickFab: VoidFunction;
  textCreate: string;
  textCancel: string;
  openflag: boolean;
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: "fit-content",
    margin: "auto 0",
  },
  center: {
    margin: "10px auto",
    width: "fit-content",
  },
  button: {
    display: "flex",
    flexDirection: "column",
    margin: "10px auto",
    width: "fit-content",
  },
  add: {
    display: "flex",
    flexDirection: "column",
    margin: "10px auto",
  },
});

// カード一枚のコンポーネント Atoms
function CreateBoard(props: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.center}>
          Create Board
        </Typography>
        {props.openflag ? (
          <Box>
            <Input
              onChange={props.onChange}
              value={props.value}
              inputlabel={props.inputlabel}
              className="input"
            />
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={props.onClickCreate}
            >
              {props.textCreate}
            </Button>
            <Button
              size="large"
              color="primary"
              className={classes.button}
              onClick={props.onClickCancel}
            >
              {props.textCancel}
            </Button>
          </Box>
        ) : (
          <Fab
            color="primary"
            className={classes.add}
            size="large"
            aria-label="add"
            onClick={props.onClickFab}
          >
            <AddIcon />
          </Fab>
        )}
      </CardContent>
    </Card>
  );
}

export default CreateBoard;
