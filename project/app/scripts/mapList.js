/*
/CS 336 Final Project
/Austin Gibson, Matt Getz, Daniel Garcia
*/
import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';

import Map from './map';

module.exports = React.createClass({
  render: function() {
    var mapNodes = this.props.data.map(function(map) {
      return (
        <Map id={map.mapID} title={map.title} key={map.mapID} country={map.country} state={map.state}
              city={map.city} year={map.year} scale={map.scale} type={map.type} imgUrl={map.imgUrl}>
          {map.mapID}
        </Map>
      );
    });
    return (
      <div className="mapList">
        {mapNodes}
      </div>
    );
  }
})