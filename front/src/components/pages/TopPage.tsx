import React from 'react'
import BoardList from '../organisms/BoardList'
import Title from '../atoms/Title'
import CreateBoard from '../molecules/CreateBoard'
import '../../index.css';


interface State{
    boardnames:string[];
    boardname:string;
}

interface Props{}

class TopPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    
        this.state = {
          boardname: "",
          boardnames:["Board A","Board B"],
        };
    
        this.handleClickBoard = this.handleClickBoard.bind(this);
        this.handleClickCreate = this.handleClickCreate.bind(this);
        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleChangeBoardName = this.handleChangeBoardName.bind(this)

    }

    handleChangeBoardName(event:any) {
        event.preventDefault();
        this.setState({boardname: event.target.value});
    }
    
    handleClickBoard() {
        alert("押した")
    }

    handleClickCreate() {
        alert(this.state.boardname)
        let boardnames=this.state.boardnames
        boardnames.push(this.state.boardname)
        this.setState(
            {
                boardnames: boardnames,
                boardname:"",
            }
        );

    }

    handleClickCancel() {
        alert(this.state.boardname)
    }

    render(){
        return (
            <div className="topPage">
                <Title 
                text={"くろ〜んとれろ〜"}
                />
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
                    />
                    <BoardList
                    boardnames={this.state.boardnames}
                    onClick={this.handleChangeBoardName}
                    />
                </div>
            </div>
        )
    }

}

export default TopPage