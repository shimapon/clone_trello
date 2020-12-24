import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



interface Props{
    text:string;
    onClick: any;
}

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      minHeight: 100,
      margin:'1em',
    },
    center: {
        margin: '10px auto',
        width:'fit-content', 
        lineHeight: 10,
    }
});



// カード一枚のコンポーネント Atoms
function Board(props:Props){
    const classes = useStyles();

  return(
    <Card className={classes.root} onClick={props.onClick}>
        <CardActionArea>
            <Typography variant="h5" component="h2" className={classes.center}>
            {props.text}
            </Typography>
        </CardActionArea>
    </Card>
  );
}

export default Board

