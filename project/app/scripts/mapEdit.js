import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

import {API_URL} from './global';

var mapEditStyle = {
  border: '5px solid gray',
  borderRadius: '5px',
  margin: '0px auto',
  width: '400px'
};

var inputStyle = {
    display: 'block',
    margin: '0px auto',
    border: '2px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f8f8f8',
    textAlign: 'center'
}

module.exports = React.createClass({
    getInitialState: function () {
        return {title: '', country:'', state:'', city:'', year:'', scale:'', type:'', imgUrl:''};
    },
    componentDidMount: function () {
        this.loadData();
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.params.mapID != prevProps.params.mapID) {
            this.loadData();
        }
    },
    loadData: function () {
        $.ajax({
            url: API_URL + "/" + this.props.params.mapID,
            dataType: 'json',
            cache: false,
        })
            .done(function (result) {
                this.setState(result[0]);
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
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
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function () {
        var updatedMap = {
            title: this.state.title.trim(),
            country: this.state.country.trim(),
            state: this.state.state.trim(),
            city: this.state.city.trim(),
            year: this.state.year.trim(),
            scale: this.state.scale.trim(),
            type: this.state.type.trim(),
            imgUrl: this.state.imgUrl.trim()
        };
        $.ajax({
            url: API_URL + "/" + this.props.params.mapID,
            dataType: 'json',
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedMap)
        })
            .done(function (maps) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    handleDelete: function () {
        $.ajax({
            url: API_URL + "/" + this.props.params.mapID,
            type: 'DELETE',
        })
            .done(function (maps) {
                this.context.router.push('/');
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error(API_URL, status, errorThrown.toString());
            }.bind(this));
    },
    render: function () {
        return (
            <div>
                <form className="mapForm" >
                    <h1>Map Edit - {this.props.params.mapID}</h1>
                    <div style={mapEditStyle}>
                    Title:
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                    Country:
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.state.country}
                        onChange={this.handleCountryChange}
                    />
                    State:
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.state.state}
                        onChange={this.handleStateChange}
                    />
                    City:
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.state.city}
                        onChange={this.handleCityChange}
                    />
                    Year:
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.state.year}
                        onChange={this.handleYearChange}
                    />
                    Scale:
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.state.scale}
                        onChange={this.handleScaleChange}
                    />
                    Type:
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.state.type}
                        onChange={this.handleTypeChange}
                    />
                    Image URL:
                    <input
                        style={inputStyle}
                        type="text"
                        value={this.state.imgUrl}
                        onChange={this.handleURLChange}
                    />
                    <button type="button" onClick={this.handleUpdate}>Update
                    </button>
                    <button type="button" onClick={this.handleDelete}>Delete
                    </button>
                    </div>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});
