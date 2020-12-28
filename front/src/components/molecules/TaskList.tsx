import React ,{ useContext } from 'react'
import Task from './Task'

import { StateContext } from '../../context'
import '../../index.css';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


interface Props{
    tasks:any;
    title:string;
    status:string;
    onClickAdd:any;
}

const useStyles = makeStyles({
  center: {
      margin: '10px auto',
      width:'fit-content', 
  },
});

// カード一枚のコンポーネント Atoms
function TaskList(props:Props){
  const classes = useStyles();

  // コンテクストオブジェクト（React.createContext からの戻り値）を受け取り、そのコンテクストの現在値を返します。
  // useContext に渡す引数はコンテクストオブジェクト自体であることを忘れないでください。
  // useContext(MyContext) は現在のコンテクストの値を読み取り、その変化を購読することしかできません。
  // コンテクストの値を設定するために、今後もツリーの上の階層で <MyContext.Provider> が必要です。
    const {dispatch} = useContext(StateContext)
    
    const handleDragOver = (event:any) => {
      event.preventDefault()
      if (event.dataTransfer) {
        //ドロップ対象に入っている
      }
    }
  
    // ドロップ時
    const handleDrop = (event:any) => {
      event.preventDefault()
      
      const data = event.dataTransfer.getData('text/plain').split(',')
      console.log(data);// [id, あったstatus]
      console.log(props.status); // 移動後のstatus
      
      dispatch({ type: 'MOVE_TASK', payload: { id: Number(data[0]), prevStatus: data[1], newStatus: props.status } })
    }
  

    const handleDragLeave = (e:any) => {
      e.preventDefault()
      // 離れた時に発火
      console.log('dragleave')
    }

  return(
      <div>
          <Card className="box"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={e => handleDragLeave(e)}>

            <Typography variant="h5" component="h2" className={classes.center}>
            {props.title}
            </Typography>
            <TextField
              id="standard-basic"
              variant="outlined"
              margin="normal"
              fullWidth
              label="add a card"

              onKeyDown={e => {
                if (e.keyCode === 13) {
                  // エンターキー押下時の処理
                  console.log((e.target as HTMLInputElement).value);
                  props.onClickAdd((e.target as HTMLInputElement).value, props.status)
                }
              }}
            />
            {props.tasks && props.tasks.map((task:any, idx:number) => (
                <Task 
                  key={"task"+idx} 
                  {...task} 
                />
            ))}
            
          </Card>

      </div>
  );
}

export default TaskList

