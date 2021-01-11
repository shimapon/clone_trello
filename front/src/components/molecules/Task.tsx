import React from "react";
import "../../index.css";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

interface Props {
  name: string;
  id: number;
  status: string;
  onClickDelete: (id: number) => void;
}

const useStyles = makeStyles({
  taskname: {
    margin: "auto",
  },
  clearbutton: {
    position: "absolute",
    top: -24,
    right: -20,
    opacity: "0",

    "&:hover": {
      color: "red",
      opacity: "1",
    },
  },
  div: {
    position: "relative",
  },
});

function Task(props: Props) {
  const classes = useStyles();

  const handleDragStart = (event: any) => {
    event.dataTransfer.setData(
      "text/plain",
      `${event.target.id.replace("task-", "")},${props.status}`
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={classes.div}>
      <Card
        className="task"
        draggable="true"
        id={`task-${props.id}`}
        onDragStart={(e) => handleDragStart(e)}
      >
        <Typography className={classes.taskname}>{props.name}</Typography>
      </Card>
      <IconButton
        className={classes.clearbutton}
        onClick={() => props.onClickDelete(props.id)}
      >
        <ClearIcon />
      </IconButton>
    </div>
  );
}

export default Task;
