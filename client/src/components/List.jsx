import React, { Component } from 'react';

import styles from './List.scss';

export default class List extends Component {

  state = {
    openSections: { },
  }


  showSubitem = (name) => {
    let isOpen = this.state.openSections[name];
    this.setState({
      openSections: {
        ...this.state.openSections,
        [name]: !isOpen,
      }
    })
  }

  centerMap = (site) => {
    this.props.onClickSubitem(site);
  }

  render() {
    return (
      <div>
        {this.props.items.map( (item, id) => {
          // when mapping through an array inside an array must wrap in another div https://stackoverflow.com/questions/47402365/how-to-have-nested-loops-with-map-in-jsx
          return (
            <div key={id}>
              <h1 onClick={ ()=> this.showSubitem(item.name) }>{item.name}</h1>
                {item.sites.map( (site, siteId ) => {
                  {if(this.state.openSections[item.name] === true) {
                    return(<h3 key={siteId} onClick={ ()=> this.centerMap(site) }> {site} </h3>)
                  }}
                })}
            </div>
          );
        })};
      </div>
    )
  }
}
