import React, { Component } from 'react';

import styles from './List.scss';

export default class List extends Component {

  state = {
    isOpen: false,
    name: "",
  }

  // projectNames = () => {
  //   this.props.items.map( (item, id) => {
  //     console.log(item.name)
  //     return <h1 key={id}  onClick={this.showSubitem(item.name)}> {item.name} </h1>;
  //   })
  // }

  showSubitem = (name) => {
    this.setState({
      isOpen: true,
      name: name
    })
  }
  render() {

      // console.log(item.name)
    return (
      <div>
        {this.props.items.map( (item, id) => {
          // when mapping through an array inside an array must wrap in another div https://stackoverflow.com/questions/47402365/how-to-have-nested-loops-with-map-in-jsx
          return (
            // https://stackoverflow.com/questions/47497090/react-how-to-pass-props-from-onclick-to-function?rq=1
            <div>
              <h1 key={id} onClick={()=> this.showSubitem(item.name)}>{item.name}</h1>
                {item.sites.map( (site, siteId ) => {
                  {if(this.state.isOpen === true) {
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
