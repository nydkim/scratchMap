import React, { Component } from 'react';
import Map from './Map.jsx';

class MapContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }



  render() {
    return (
      <div>
        <h3>this is inside map container</h3>
        <Map />
      </div>
    );
  }

}

export default MapContainer;