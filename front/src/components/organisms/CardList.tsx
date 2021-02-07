import React from "react";
import TaskList from "../molecules/TaskList";

import "../../index.css";

interface Props {
  initialState: {
    boardnames: string[];
    tasks: { id: number; name: string; status: string }[];
  };
  onClickAdd: any;
  onClickDelete: (id: number) => void;
  onClickDeleteCard: (id: number) => void;
  onMove: any;
  onMoveSome: any;
}

// カード一枚のコンポーネント Atoms
function CardList(props: Props) {
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
              onMove={props.onMove}
              onMoveSome={props.onMoveSome}
            />
          ))}
      </div>
    </div>
  );
}

export default CardList;
