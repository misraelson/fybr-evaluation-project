import React, { Component } from 'react';

import styles from './List.scss';

export default function List(props) {
  return (
    <div>
      <h1>THIS THING</h1>
      <h1>{props.items[0].name}</h1>
    </div>
  );
}
