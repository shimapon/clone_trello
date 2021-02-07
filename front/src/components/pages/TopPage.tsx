import React from "react";
import BoardList from "../organisms/BoardList";
import Title from "../atoms/Title";
import CreateBoard from "../molecules/CreateBoard";
import "../../index.css";

interface State {
  boardnames: string[];
  boardname: string;
  openflag: boolean;
}

interface Props {
  history: any;
}

class TopPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      boardname: "",
      boardnames: [],
      openflag: false,
    };

    this.handleClickBoard = this.handleClickBoard.bind(this);
    this.handleClickCreate = this.handleClickCreate.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleChangeBoardName = this.handleChangeBoardName.bind(this);
    this.handleClickFabButton = this.handleClickFabButton.bind(this);
  }

  componentDidMount() {
    const appState = localStorage.getItem("boardnames");

    this.setState({ boardnames: appState ? JSON.parse(appState) : [] });
  }

  handleChangeBoardName(event: any) {
    event.preventDefault();
    this.setState({ boardname: event.target.value });
  }

  handleClickBoard(id: number) {
    this.props.history.push({
      pathname: "/board/" + id,
      state: { cardname: this.state.boardnames[id] },
    });

  }

  handleClickFabButton() {
    this.setState({
      openflag: true,
    });
  }

  handleClickCreate() {
    let boardnames = this.state.boardnames;
    boardnames.push(this.state.boardname);
    this.setState({
      boardnames: boardnames,
      boardname: "",
    });

    localStorage.setItem("boardnames", JSON.stringify(boardnames));
  }

  handleClickCancel() {
    this.setState({
      boardname: "",
      openflag: false,
    });
  }

  render() {
    return (
      <div className="topPage">
        <Title text={"くろ〜んとれろ〜"} />
        <div className="wrapper">
          <CreateBoard
            text={"Create Board"}
            onChange={this.handleChangeBoardName}
            value={this.state.boardname}
            onClickCancel={this.handleClickCancel}
            onClickCreate={this.handleClickCreate}
            textCancel={"Cancel"}
            textCreate={"Create"}
            inputlabel={"Board Name"}
            openflag={this.state.openflag}
            onClickFab={this.handleClickFabButton}
          />
          <BoardList
            boardnames={this.state.boardnames}
            onClick={this.handleClickBoard}
          />
        </div>
      </div>
    );
  }
}

export default TopPage;
