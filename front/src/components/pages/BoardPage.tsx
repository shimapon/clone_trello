import React from 'react'

import '../../index.css';

import BoardLabel from '../organisms/BoardLabel'
import AddList from '../organisms/AddList'
import CardList from '../organisms/CardList'




interface Props{
    

}

interface State{
    cardname:string;
    initialState:{boardnames: string[], tasks:any};
}


class BoardPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            cardname: "",
            initialState:{
                boardnames:["作業前","進行中","完了"],
                tasks: [
                    { id: 1, name: '簡単なモックUIを作成', status: '0'},
                    { id: 2, name: 'ドラッグ＆ドロップAPIを調べる', status: '1'},
                    { id: 3, name: 'フロントエンドを実装', status: '2'},
                    { id: 4, name: 'バックエンドを実装', status: '2'},
                    { id: 5, name: 'タグ付け', status: '1'}
                ]
            },
        }
            
        this.handleChangeCardName = this.handleChangeCardName.bind(this);
        this.handleClickAddCard = this.handleClickAddCard.bind(this);
        this.handleClickAdd = this.handleClickAdd.bind(this);
        this.handleMoveTask = this.handleMoveTask.bind(this);
    }

    handleMoveTask(kita:any){
        this.setState({
            initialState:kita,
        })

    }

    handleChangeCardName(event:any) {
        event.preventDefault();
        this.setState({cardname: event.target.value});
    }

    handleClickAddCard(){

        alert(this.state.cardname)
        const initialState = this.state.initialState 
        const boardnames = initialState.boardnames
        boardnames.push(this.state.cardname)
        initialState.boardnames = boardnames


        this.setState({
            cardname:"",
            initialState:initialState,
        })

    }
    handleClickAdd(text:string, status:string){
        const initialState = this.state.initialState 
        const tasks = initialState.tasks


        tasks.push({ id: tasks[tasks.length-1].id+1, name: text, status: status})
        initialState.tasks = tasks

        console.log(initialState);
        
        
        this.setState({
            initialState:initialState,
        })
        

    }


    render(){
        return (
            <div className="boardPage">
                <BoardLabel/>
                <CardList
                initialState={this.state.initialState}
                onClickAdd={this.handleClickAdd}
                onMoveTask={this.handleMoveTask}
                
                />
                <AddList
                    onChange={this.handleChangeCardName}
                    onClickAddCard={this.handleClickAddCard}
                    value={this.state.cardname}
                    inputlabel="add a list"
                />

            </div>
        )
    }
}

export default BoardPage