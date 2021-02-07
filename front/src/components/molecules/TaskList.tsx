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
  onChange: any;

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

const ItemTypes = ["item" as const];

type ItemType = typeof ItemTypes[number];

type Item = {
  id: number;
  type: ItemType;
};

type ItemWithIndex = Item & {
  index: number;
  status: string;
};

// カード一枚のコンポーネント Atoms
function TaskList(props: Props) {
  const classes = useStyles();

  const [, drop] = useDrop({
    accept: "task",
    // drop: (item, monitor) =>
    //   props.onMove(monitor.getItem().id, String(props.idx)),
    hover(dragItem: ItemWithIndex, monitor) {
      const it = monitor.getItem();

      if (!it.size.current) return;

      const middleY =
        (it.size.current.getBoundingClientRect().top +
          it.size.current.getBoundingClientRect().bottom) /
        2;
      const sizeY = it.size.current.getBoundingClientRect().height;
      const mousePosition = monitor.getClientOffset();
      if (!mousePosition) return;

      const index = (mousePosition.y - middleY) / sizeY;

      let moveIndex = Math.trunc(index) + dragItem.index;

      if (props.tasks.length < moveIndex) {
        moveIndex = props.tasks.length;
      }

      if (moveIndex < 0) {
        moveIndex = 0;
      }

      // 同じstatusでの移動
      if (String(props.idx) === dragItem.status) {
        // 同じ時
        if (moveIndex === it.index) return;

        if (props.tasks.length <= moveIndex) {
          moveIndex = props.tasks.length - 1;
        }

        props.onMoveSome(it.id, String(props.idx), moveIndex);
        dragItem.index = moveIndex;

        return;
      }

      props.onMove(it.id, String(props.idx), moveIndex);
      dragItem.index = moveIndex;
      dragItem.status = String(props.idx);
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
          onChange={(event) => props.onChange(event)}
        />
        {props.tasks &&
          props.tasks.map((task: any) => (
            <Task
              key={"task" + task.id}
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
