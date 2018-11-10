import React, { Component } from 'react';

import styles from './List.scss';

export default class List extends Component {

  state = {
    isOpen: false,
  }

  // projectNames = () => {
  //   this.props.items.map( (item, id) => {
  //     console.log(item.name)
  //     return <h1 key={id}  onClick={this.showSubitem(item.name)}> {item.name} </h1>;
  //   })
  // }

  showSubitem = (name) => {
    // console.log(name)
    this.props.items.map( (item) => {
      if(item.name === name) {
        item.sites.map( (site, id) => {
          console.log("this is site:", site)
          return<h3 key={id}> {site} </h3>
        })
      }
      // console.log(sites.sites)
    })
  }
  render() {

      // console.log(item.name)
    return (
      <div>
        {this.props.items.map( (item, id) => {
          // console.log(item.name);
          return (
            <h1 key={id} onClick={()=> this.showSubitem(item.name)}>{item.name}</h1>
          );
        })};
      </div>
    )
  }
}
