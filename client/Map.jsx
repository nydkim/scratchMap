import React, { Component } from 'react';
import { select, json, geoPath, geoNaturalEarth1, zoom, event, geoOrthographic } from 'd3';
import { feature } from 'topojson';

class Map extends Component {
  constructor() {
    super();
    this.state;
  }

  componentDidMount() {
    const projection = geoNaturalEarth1();
    const pathGenerator = geoPath().projection(projection);

    // const rect = React.createElement('rect', { id: 'li1', width:"300", height:"100" });
    const svg = select(this.refs.vector);
    // const svg2 = select('svg')
    const g = svg.append('g');

    svg.call(
      zoom().on('zoom', () => {
        g.attr('transform', event.transform);
      })
    );

    json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json').then((data) => {
      console.log('inside json');
      const countries = feature(data, data.objects.countries);
      // console.log(data);
      g.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', (d) => pathGenerator(d))
        .on('click', (d) => {
          console.log('clicked', d.properties.name, d.id);
          return this.props.clickHandle(d.id);
        })
        .attr('id', (d) => d.id)
        .append('title')
        .text((d) => d.properties.name);
    });
  }

  render() {
    return <svg ref="vector" height="500" width="9600"></svg>;
  }
}

export default Map;
