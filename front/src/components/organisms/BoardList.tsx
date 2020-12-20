import React from 'react'
import Board from '../molecules/Board'
import '../../index.css';


interface Props{
    boardnames:string[];
    onClick: Function;
}

class BoardList extends React.Component<Props> {
    renderBoard(data: string) {
        return (
            <Board
            text={data}
            onClick={this.props.onClick}
            key={data+"boardlist11"}
            />
        );
    }


    render(){
        return (
            <div className="boardlist">
                {this.props.boardnames.map((data:string)=>{
                    return this.renderBoard(data)
                })}
            </div>
        )
    }
}

export default BoardList

