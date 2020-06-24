import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Data extends Component {
  componentDidMount() {
    fetch('/initial')
      .then((res) => res.json())
      .then((data) => {
        console.log('in data', data);
        return this.props.loggedIn(data);
      });
  }

  signout() {
    window.location.href = '/';
  }

  render() {
    let greeting = '';
    if (this.props.name) {
      const name = this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);
      greeting = `${name}'s `;
    }
    return (
      <div>
        <h1>{greeting}Scratch Map</h1>
        <button onClick={this.signout}>sign out</button>
      </div>
    );
  }
}

export default Data;
