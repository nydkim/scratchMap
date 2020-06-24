import React, { Component } from 'react';

class Data extends Component {
  componentDidMount() {
    fetch('/initial')
      .then((res) => res.json())
      .then((data) => {
        console.log('in data', data);
      });
  }

  render() {
    return <h1>in data</h1>;
  }
}

export default Data;
