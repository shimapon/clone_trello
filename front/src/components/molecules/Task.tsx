import React, { useRef } from "react";
import "../../index.css";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { useDrag } from "react-dnd";

interface Props {
  name: string;
  id: number;
  status: string;
  index: number;
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
  const elm = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: {
      type: "task",
      id: props.id,
      status: props.status,
      size: elm,
      index: props.index,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div className={classes.div} ref={elm}>
      <Card
        className="task"
        id={`task-${props.id}`}
        ref={drag}
        style={{
          opacity: isDragging ? 0.4 : 1,
          cursor: "move",
        }}
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
