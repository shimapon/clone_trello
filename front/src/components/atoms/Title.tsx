import React from 'react'

interface Props{
    text:string;
}

// カード一枚のコンポーネント Atoms
function Title(props:Props){
  return(
      <h1 className="title">{props.text}</h1>
  );
}


export default Title

