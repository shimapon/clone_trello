import React from "react";
import TaskList from "../molecules/TaskList";

import "../../index.css";

interface Props {
  initialState: {
    boardnames: string[];
    tasks: { id: number; name: string; status: string }[];
  };
  onClickAdd: any;
  onMoveTask: any;
  onClickDelete: (id: number) => void;
  onClickDeleteCard: (id: number) => void;
}

// カード一枚のコンポーネント Atoms
function CardList(props: Props) {
  const reducer = (action: any) => {
    switch (action.type) {
      case "ADD_TASK":
        console.log("addtask");
        return props.initialState;
      case "MOVE_TASK":
        console.log("movetask");

        const { id, newStatus } = action.payload;
        const task: any = props.initialState.tasks.find(
          (task: { id: number }) => task.id === id
        );
        const changedTask = {
          ...task,
          status: newStatus,
          order: props.initialState.tasks.length + 1,
        };

        // console.log({
        //   ...state,
        //   tasks: state.tasks.map((task: { id: number; }) =>
        //     task.id !== id ? task : changedTask)
        // });
        props.onMoveTask({
          ...props.initialState,
          tasks: props.initialState.tasks.map((task: { id: number }) =>
            task.id !== id ? task : changedTask
          ),
        });

        return props.initialState;

      case "DELETE_TASK":
        return props.initialState;
      default:
        return props.initialState;
    }
  };

  const returnTasks = (idx: number) => {
    return props.initialState.tasks.filter(
      (task: { status: string }) => task.status === String(idx)
    );
  };

  return (
    <div>
      <div className="wrapper">
        {props.initialState.boardnames &&
          props.initialState.boardnames.map((boardname: any, idx: number) => (
            <TaskList
              tasks={returnTasks(idx)}
              title={boardname}
              status={String(idx)}
              key={"board_" + idx}
              onClickAdd={props.onClickAdd}
              onClickDelete={props.onClickDelete}
              onClickDeleteCard={props.onClickDeleteCard}
              idx={idx}
              reducer={reducer}
            />
          ))}
      </div>
    </div>
  );
}

export default CardList;
