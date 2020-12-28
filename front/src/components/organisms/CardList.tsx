import React , { useReducer } from 'react'
import TaskList from '../molecules/TaskList'

import '../../index.css';
import { StateContext } from '../../context'


interface Props{
  initialState:object;
  onClickAdd:any;
  onMoveTask:any;
}


// カード一枚のコンポーネント Atoms
function CardList(props:Props){
    const reducer = (state:any, action:any) => {
        switch (action.type) {
          case 'ADD_TASK':
            console.log('addtask')
            return state
          case 'MOVE_TASK':
            console.log('movetask')


            const { id, newStatus } = action.payload
            const task:object = state.tasks.find((task: { id: number; }) => task.id === id)
            const changedTask = { ...task, status: newStatus, order: state.tasks.length + 1 }
            
            // console.log({
            //   ...state,
            //   tasks: state.tasks.map((task: { id: number; }) =>
            //     task.id !== id ? task : changedTask)
            // });
            props.onMoveTask({
              ...state,
              tasks: state.tasks.map((task: { id: number; }) =>
                task.id !== id ? task : changedTask)
            })

            return props.initialState
            
          case 'DELETE_TASK':
            return state
          default:
            return state
        }
    }

    const [globalState, dispatch] = useReducer(reducer, props.initialState)


    const returnTasks = (idx:number) => {
      return globalState.tasks.filter((task: { status: string; }) => task.status === String(idx))
    }


  return(
      <div>
            <StateContext.Provider value={{ globalState, dispatch }}>
              <div className="wrapper">
                {globalState.boardnames && globalState.boardnames.map((boardname:any, idx:number) => (
                  <TaskList 
                  tasks={returnTasks(idx)} 
                  title={boardname} 
                  status={String(idx)} 
                  key={"board_"+idx}
                  onClickAdd={props.onClickAdd}
                  />
                ))}
              </div>
            </StateContext.Provider>

      </div>

  );
}

export default CardList

