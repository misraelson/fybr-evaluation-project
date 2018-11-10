import React, { Component } from 'react';

import styles from './List.scss';



export default function List(props) {

  let projectNames = props.items.map( (name, id) => {
    // console.log(name.name)
    return <h1 key={id}  onClick={showSubitem}> {name.name} </h1>;
  })

  function showSubitem() {
    props.items.map( (sites, id) => {
      console.log(sites.sites)
      sites.sites.map( (site) => {
        console.log(site)
        return <h3 key={id}> {site} </h3>
      })
    })
  }

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
