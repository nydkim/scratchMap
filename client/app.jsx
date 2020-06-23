import React, { Component } from 'react';
import { render } from 'react-dom';
import MapContainer from './MapContainer.jsx';
import './styles.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>hi</h1>
        <MapContainer />
      </div>
    );
  }
}

render(<App />, document.querySelector('#root'));
