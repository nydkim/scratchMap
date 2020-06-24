import React, { Component } from 'react';
import pairs from './countries.js';

class List extends Component {
  render() {
    const list = this.props.countries.map((code, index) => {
      return <li key={`${code}`}> {pairs[code]} </li>;
    });

    return (
      <ul id="list">
        <h3>countries visited: {this.props.countries.length}</h3>
        {list}
      </ul>
    );
  }
}

export default List;
