import React, { Component } from 'react';

import styles from './List.scss';

export default class List extends Component {

  state = {
    // isOpen: false,
    name: "",
    openSections: { },
  }


  showSubitem = (name) => {
    let isOpen = false;
    // let name = name;
    console.log(isOpen)
    this.setState({
      // isOpen: !this.state.isOpen,
      name: name,
      openSections: {
        ...this.state.openSections,
        [name]: !isOpen,
      }
    })
    console.log(this.state.openSections)
  }
  render() {
    // let openSections = {};
    return (
      <div>
        {this.props.items.map( (item, id) => {
          // when mapping through an array inside an array must wrap in another div https://stackoverflow.com/questions/47402365/how-to-have-nested-loops-with-map-in-jsx
          return (
            // https://stackoverflow.com/questions/47497090/react-how-to-pass-props-from-onclick-to-function?rq=1
            <div>
              <h1 key={id} onClick={()=> this.showSubitem(item.name)}>{item.name}</h1>
                {item.sites.map( (site, siteId ) => {
                  {if(this.state.openSections[item.name] === true && this.state.name === item.name) {
                    return(<h3 key={siteId}> {site} </h3>)
                  }}
                })}
            </div>
          );
        })};
      </div>
    )
  }
}
