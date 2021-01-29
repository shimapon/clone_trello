import React from "react";

import "../../index.css";

import BoardLabel from "../organisms/BoardLabel";
import AddList from "../organisms/AddList";
import CardList from "../organisms/CardList";

interface Props {
  history: any;
}

interface State {
  cardname: string;
  initialState: {
    boardnames: string[];
    tasks: { id: number; name: string; status: string }[];
  };
}

class BoardPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      cardname: "",
      initialState: {
        boardnames: ["作業前", "進行中"],
        tasks: [
          { id: 1, name: "Routerを繋ぐ", status: "0" },
          { id: 2, name: "リストないで並べ替えできるように", status: "0" },
          { id: 3, name: "押した時のアニメーション", status: "1" },
          { id: 5, name: "フォント変えてみる", status: "0" },
        ],
      },
    };

    this.handleChangeCardName = this.handleChangeCardName.bind(this);
    this.handleClickAddCard = this.handleClickAddCard.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleMoveTask = this.handleMoveTask.bind(this);
    this.handleClickClearKanBan = this.handleClickClearKanBan.bind(this);
    this.handleClickClearCard = this.handleClickClearCard.bind(this);
    this.handleClickBackButton = this.handleClickBackButton.bind(this);
  }

  handleMoveTask(initialState: {
    boardnames: string[];
    tasks: { id: number; name: string; status: string }[];
  }) {
    this.setState({
      initialState: initialState,
    });
  }

  handleChangeCardName(event: any) {
    event.preventDefault();
    this.setState({ cardname: event.target.value });
  }

  handleClickAddCard() {
    if (this.state.cardname === "") {
      alert("The board name in the text field is empty");
      return false;
    }
    const initialState = this.state.initialState;
    const boardnames = initialState.boardnames;
    boardnames.push(this.state.cardname);
    initialState.boardnames = boardnames;

    this.setState({
      cardname: "",
      initialState: initialState,
    });
  }

  handleClickAdd(text: string, status: string) {
    if (this.state.cardname === "") {
      alert("The card name in the text field is empty");
      return false;
    }
    const initialState = this.state.initialState;
    const tasks = initialState.tasks;

    tasks.push({
      id: tasks[tasks.length - 1].id + 1,
      name: text,
      status: status,
    });
    initialState.tasks = tasks;

    console.log(initialState);

    this.setState({
      initialState: initialState,
    });
  }

  handleClickClearKanBan(id: number) {
    let initialState = this.state.initialState;
    initialState.boardnames.splice(id, 1);
    for (let task of initialState.tasks) {
      if (Number(task.status) > id) {
        task.status = String(Number(task.status) - 1);
      } else if (Number(task.status) === id) {
        task.status = "-1";
      }
    }

    this.setState({
      initialState: initialState,
    });
  }

  handleClickClearCard(id: number) {
    console.log(id);

    let initialState = this.state.initialState;
    for (let task of initialState.tasks) {
      if (task.id === id) {
        task.status = "-1";
      }
    }

    this.setState({
      initialState: initialState,
    });
  }

  handleClickBackButton() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="boardPage">
        <BoardLabel onClick={this.handleClickBackButton} />

        <div className="wrapper">
          <CardList
            initialState={this.state.initialState}
            onClickAdd={this.handleClickAdd}
            onMoveTask={this.handleMoveTask}
            onClickDelete={this.handleClickClearKanBan}
            onClickDeleteCard={this.handleClickClearCard}
          />
          <AddList
            onChange={this.handleChangeCardName}
            onClickAddCard={this.handleClickAddCard}
            value={this.state.cardname}
            inputlabel="add a list"
          />
        </div>
      </div>
    );
  }
}

export default BoardPage;
