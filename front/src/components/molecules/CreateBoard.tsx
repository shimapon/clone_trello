import React from 'react'
import Input from '../atoms/Input'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



interface Props{
    text:string;
    onChange:Function;
    value:string;
    inputlabel:string;
    onClickCreate:VoidFunction;
    onClickCancel:VoidFunction;
    textCreate:string;
    textCancel:string;
}

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    center: {
        margin: '10px auto',
        width:'fit-content', 
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px auto',
        width:'fit-content', 
    }
});

// カード一枚のコンポーネント Atoms
function CreateBoard(props:Props){
    const classes = useStyles();


  return(
    <Card className={classes.root} variant="outlined">
        <CardContent>
            <Typography variant="h5" component="h2" className={classes.center}>
                Create Board
            </Typography>
            <Input
            onChange={props.onChange}
            value={props.value}
            inputlabel={props.inputlabel}
            />
            <Button size="large" variant="contained" color="primary" className={classes.button} onClick={props.onClickCreate}>{props.textCreate}</Button>
            <Button size="large" color="primary" className={classes.button} onClick={props.onClickCancel}>{props.textCancel}</Button>

        </CardContent>
    </Card>
  );
}



export default CreateBoard

