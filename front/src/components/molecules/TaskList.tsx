import React from "react";
import Task from "./Task";

import "../../index.css";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

import { useDrop } from "react-dnd";

interface Props {
  tasks: any;
  title: string;
  status: string;
  onClickAdd: any;
  onClickDelete: (id: number) => void;
  onClickDeleteCard: (id: number) => void;

  idx: number;
  onMove: any;
  onMoveSome: any;
}

const useStyles = makeStyles({
  center: {
    margin: "10px auto",
    width: "fit-content",
  },
  clearbutton: {
    position: "absolute",
    top: -24,
    right: -14,
    opacity: "0",

    "&:hover": {
      opacity: "1",
    },
  },
});

// カード一枚のコンポーネント Atoms
function TaskList(props: Props) {
  const classes = useStyles();

  const [, drop] = useDrop({
    accept: "task",
    // drop: (item, monitor) =>
    //   props.onMove(monitor.getItem().id, String(props.idx)),
    hover(item, monitor) {
      // console.log(item);
      const it = monitor.getItem();

      if (!it.size.current) return;

      const bottom = it.size.current.getBoundingClientRect().bottom;
      const sizeY = it.size.current.getBoundingClientRect().height;
      const mousePosition = monitor.getClientOffset();
      if (!mousePosition) return;

      const index = (mousePosition.y - bottom) / sizeY;

      let moveIndex = Math.floor(index) + it.index + 1;

      if (props.tasks.length < moveIndex) {
        moveIndex = props.tasks.length;
      }

      if (moveIndex < 0) {
        moveIndex = 0;
      }

      // console.log(moveIndex);

      // console.log(Math.floor(index));

      // console.log(bottom, sizeY);
      // console.log(mousePosition);

      if (String(props.idx) === it.status) {
        console.log(moveIndex, it.index);

        // 同じ時
        if (
          moveIndex === it.index ||
          moveIndex + 1 === it.index ||
          moveIndex - 1 === it.index
        )
          return;

        if (moveIndex > it.index) moveIndex -= 1;
        else moveIndex += 1;

        props.onMoveSome(it.id, String(props.idx), moveIndex);
        return;
      }

      // console.log(moveIndex);

      props.onMove(it.id, String(props.idx), moveIndex);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className="tasklist">
      <Card className="box" ref={drop}>
        <Typography variant="h5" component="h2" className={classes.center}>
          {props.title}
        </Typography>
        <TextField
          id="standard-basic"
          variant="outlined"
          margin="normal"
          fullWidth
          label="add a card"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              // エンターキー押下時の処理
              console.log((e.target as HTMLInputElement).value);
              props.onClickAdd(
                (e.target as HTMLInputElement).value,
                props.status
              );
            }
          }}
        />
        {props.tasks &&
          props.tasks.map((task: any, idx: number) => (
            <Task
              key={"task" + idx}
              {...task}
              onClickDelete={props.onClickDeleteCard}
            />
          ))}
      </Card>
      <IconButton
        className={classes.clearbutton}
        color="primary"
        onClick={() => props.onClickDelete(props.idx)}
      >
        <ClearIcon />
      </IconButton>
    </div>
  );
}

export default TaskList;
