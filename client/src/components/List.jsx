import React, { Component } from 'react';

import styles from './List.scss';



export default function List(props) {

  let projectNames = props.items.map( (name, id) => {
    console.log(name.name)
    return <h1 key={id}>{name.name}</h1>
  })
  
  return (
    <div>

      {projectNames}

      {/* <h1>{props.items[0].name}</h1>
        <h2>{props.items[0].sites[0]}</h2>
        <h2>{props.items[0].sites[1]}</h2>
      <h1>{props.items[1].name}</h1>
      <h1>{props.items[2].name}</h1> */}
    </div>
);
}
