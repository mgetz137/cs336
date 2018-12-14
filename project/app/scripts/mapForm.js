/*
/CS 336 Final Project
/Austin Gibson, Matt Getz, Daniel Garcia
*/
import React from 'react';
import $ from 'jquery';

import '../css/base.css';

var mapFormStyle = {
  border: '5px solid gray',
  borderRadius: '5px',
  margin: '0px auto',
  width: '400px'
};

module.exports = React.createClass({
  getInitialState: function() {
    return {title: '', country:'', state:'', city:'', year:'', scale:'', type:'', imgUrl:''};
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleCountryChange: function(e) {
    this.setState({country: e.target.value});
  },
  handleStateChange: function(e) {
    this.setState({state: e.target.value});
  },
  handleCityChange: function(e) {
    this.setState({city: e.target.value});
  },
  handleYearChange: function(e) {
    this.setState({year: e.target.value});
  },
  handleScaleChange: function(e) {
    this.setState({scale: e.target.value});
  },
  handleTypeChange: function(e) {
    this.setState({type: e.target.value});
  },
  handleURLChange: function(e) {
    this.setState({imgUrl: e.target.value});
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title.trim();
    var state = this.state.state.trim();
    var year = this.state.year.trim();
    var country = this.state.country.trim();
    var type = this.state.type.trim();
    var city = this.state.city.trim();
    var scale= this.state.scale.trim();
    var imgUrl= this.state.imgUrl.trim();
    if (!title || !state || !year || !country || !type || !city || !scale || !imgUrl) {
      return;
    }
    this.props.onMapSubmit({title:title, country: country, state: state, city: city, year: year, scale: scale, type: type, imgUrl: imgUrl});
    this.setState({title: '', country: '', state: '', city: '', year: '', scale: '', type: '', imgUrl: ''});
  },
  render: function() {
    return (
      <form className="mapForm" style={mapFormStyle} onSubmit={this.handleSubmit}>
        <p> Title </p>
        <input
          type="text"
          placeholder="Title..."
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <p> Country </p>
        <input
          type="text"
          placeholder="country......"
          value={this.state.country}
          onChange={this.handleCountryChange}
        />
        <p> State </p>
        <input
          type="text"
          placeholder="state...."
          value={this.state.state}
          onChange={this.handleStateChange}
        />
        <p> City </p>
        <input
          type="text"
          placeholder="city...."
          value={this.state.city}
          onChange={this.handleCityChange}
        />
        <p> Year </p>
        <input
          type="text"
          placeholder="year...."
          value={this.state.year}
          onChange={this.handleYearChange}
        />
        <p> Scale </p>
        <input
          type="text"
          placeholder="scale...."
          value={this.state.scale}
          onChange={this.handleScaleChange}
        />
        <p> Type </p>
        <input
          type="text"
          placeholder="type......"
          value={this.state.type}
          onChange={this.handleTypeChange}
        />
        <p> Image URL </p>
        <input
          type="text"
          placeholder="url......"
          value={this.state.imgUrl}
          onChange={this.handleURLChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});