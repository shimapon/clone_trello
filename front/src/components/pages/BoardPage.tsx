import React from "react";
import "../../index.css";
import BoardLabel from "../organisms/BoardLabel";
import AddList from "../organisms/AddList";
import CardList from "../organisms/CardList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { firebaseDb } from "../../firebase/index.js";

interface Props {}

interface State {
  cardname: string;
  initialState: {
    boardnames: string[];
    tasks: { id: number; name: string; status: string; index: number }[];
  };
}

let c_idx = -1;
let c_tostatus = "-1";
let c_index = -1;

class BoardPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      cardname: "",
      initialState: {
        boardnames: [],
        tasks: [
          // { id: 1, name: "Routerを繋ぐ", status: "0", index: 0 },
          // {
          //   id: 2,
          //   name: "リストないで並べ替えできるように",
          //   status: "0",
          //   index: 1,
          // },
          // { id: 3, name: "押した時のアニメーション", status: "1", index: 0 },
          // { id: 5, name: "フォント変えてみる", status: "0", index: 2 },
        ],
      },
    };

    this.handleChangeCardName = this.handleChangeCardName.bind(this);
    this.handleClickAddCard = this.handleClickAddCard.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickClearKanBan = this.handleClickClearKanBan.bind(this);
    this.handleClickClearCard = this.handleClickClearCard.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleMoveSome = this.handleMoveSome.bind(this);
  }

  componentDidMount() {
    let initialState: {
      boardnames: string[];
      tasks: { id: number; name: string; status: string; index: number }[];
    } = {
      boardnames: [],
      tasks: [],
    };

    //articlesコレクションから1件データを取得
    firebaseDb
      .collection("task")
      .limit(100)
      .get()
      .then((response) => {
        //forEach()でドキュメントの配列がとれる
        response.forEach((doc) => {
          //data()でドキュメントがとれる
          const document = doc.data();
          console.log(document);

          initialState.tasks.push({
            id: document.id,
            index: document.index,
            status: document.status,
            name: document.name,
          });
        });

        this.setState({
          initialState: initialState,
        });
      });

    //articlesコレクションから1件データを取得
    firebaseDb
      .collection("kanbanNames")
      .limit(100)
      .get()
      .then((response) => {
        //forEach()でドキュメントの配列がとれる
        response.forEach((doc) => {
          //data()でドキュメントがとれる
          const document = doc.data();
          console.log(document);

          initialState.boardnames.push(document.title);
        });

        this.setState({
          initialState: initialState,
        });
      });
  }

  handleMove(idx: number, tostatus: string, index: number) {
    if (idx === c_idx && tostatus === c_tostatus && index === c_index) return;

    c_idx = idx;
    c_tostatus = tostatus;
    c_index = index;

    console.log(idx, tostatus, index);

    const initialState = this.state.initialState;
    const tasks = initialState.tasks;

    let target = tasks.findIndex((element) => element.id === idx);

    for (let i = 0; i < tasks.length; i++) {
      if (initialState.tasks[i].status === tostatus) {
        if (initialState.tasks[i].index >= index) {
          initialState.tasks[i].index = initialState.tasks[i].index + 1;
        }
      }
    }

    initialState.tasks[target].status = tostatus;
    initialState.tasks[target].index = index;

    initialState.tasks.sort(compareValues("index"));

    this.setState({
      initialState: initialState,
    });
  }

  handleMoveSome(idx: number, tostatus: string, index: number) {
    if (idx === c_idx && tostatus === c_tostatus && index === c_index) return;

    c_idx = idx;
    c_tostatus = tostatus;
    c_index = index;

    console.log(idx, tostatus, index);

    const initialState = this.state.initialState;
    const tasks = initialState.tasks;

    let target = tasks.findIndex((element) => element.id === idx);

    for (let i = 0; i < tasks.length; i++) {
      if (initialState.tasks[i].status === tostatus) {
        if (initialState.tasks[target].index < index) {
          if (initialState.tasks[i].index === index) {
            initialState.tasks[i].index = initialState.tasks[i].index - 1;
          }
        } else {
          if (initialState.tasks[i].index === index) {
            initialState.tasks[i].index = initialState.tasks[i].index + 1;
          }
        }
      }
    }

    initialState.tasks[target].index = index;

    initialState.tasks.sort(compareValues("index"));

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
    // if (this.state.cardname === "") {
    //   alert("The card name in the text field is empty");
    //   return false;
    // }
    const initialState = this.state.initialState;
    const tasks = initialState.tasks;

    const targetUsers = tasks.filter((v) => v.status === status);

    tasks.push({
      id: tasks[tasks.length - 1].id + 1,
      name: text,
      status: status,
      index: targetUsers.length,
    });
    initialState.tasks = tasks;

    console.log(initialState);

    this.setState({
      initialState: initialState,
    });

    var docData = {
      id: tasks[tasks.length - 1].id + 1,
      name: text,
      status: status,
      index: targetUsers.length,
    };
    firebaseDb
      .collection("task")
      .add(docData)
      .then(function () {
        console.log("Document successfully written!");
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

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div className="boardPage">
          <BoardLabel />
          <div className="wrapper">
            <CardList
              initialState={this.state.initialState}
              onClickAdd={this.handleClickAdd}
              onClickDelete={this.handleClickClearKanBan}
              onClickDeleteCard={this.handleClickClearCard}
              onMove={this.handleMove}
              onMoveSome={this.handleMoveSome}
            />
            <AddList
              onChange={this.handleChangeCardName}
              onClickAddCard={this.handleClickAddCard}
              value={this.state.cardname}
              inputlabel="add a list"
            />
          </div>
        </div>
      </DndProvider>
    );
  }
}

// function for dynamic sorting
function compareValues(key: any, order = "asc") {
  return function (a: any, b: any) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

export default BoardPage;
