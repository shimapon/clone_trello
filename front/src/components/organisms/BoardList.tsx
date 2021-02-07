import React from "react";
import Board from "../molecules/Board";
import "../../index.css";

interface Props {
  boardnames: string[];
  onClick: Function;
}

class BoardList extends React.Component<Props> {
  renderBoard(data: string, index: number) {
    return (
      <Board
        text={data}
        onClick={this.props.onClick}
        key={data + "boardlist11"}
        id={index}
      />
    );
  }

  render() {
    return (
      <div className="boardlist">
        {this.props.boardnames.map((data: string, index: number) => {
          return this.renderBoard(data, index);
        })}
      </div>
    );
  }
}

export default BoardList;
