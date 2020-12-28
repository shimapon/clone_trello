import React from 'react'
import '../../index.css';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


interface Props{
    name:string;
    id:number;
    status:string;
}

const useStyles = makeStyles({
  taskname: {
      margin: 'auto',
  },
});



function Task(props:Props){
  const classes = useStyles();

  const handleDragStart = (event:any) => {
    event.dataTransfer.setData('text/plain', `${event.target.id.replace('task-', '')},${props.status}`)
    event.dataTransfer.effectAllowed = 'move'
  }

  return(
    <Card className="task" draggable="true" id={`task-${props.id}`} onDragStart={e => handleDragStart(e)}>
      <Typography className={classes.taskname}>{props.name}</Typography>
    </Card>

  );
}

export default Task

