/*
/CS 336 Final Project
/Austin Gibson, Matt Getz, Daniel Garcia
*/

import React from 'react';
import $ from 'jquery';

import MapList from './mapList';
import MapForm from './mapForm';
import { API_URL, POLL_INTERVAL } from './global';

var row = {
    display: 'flex'
}

var col = {
    flex: '1',
    padding: '1em'
}

module.exports = React.createClass({
    getInitialState: function() {
        return {data: [], _isMounted: false};
    },
    loadMapsFromServer: function() {
        if (this.state._isMounted) {
            $.ajax({
                url: API_URL,
                dataType: 'json',
                cache: false,
            })
                .done(function (result) {
                    this.setState({data: result});
                }.bind(this))
                .fail(function (xhr, status, errorThrown) {
                    console.error(API_URL, status, errorThrown.toString());
                }.bind(this));
        }
    },
    handleMapSubmit: function(map) {
        var maps= this.state.data;
        var newMaps = maps.concat([map]);
        this.setState({data: newMaps});
        $.ajax({
            url: API_URL,
            dataType: 'json',
            type: 'POST',
            data: map,
        })
         .done(function(result){
             this.setState({data: result});
         }.bind(this))
         .fail(function(xhr, status, errorThrown) {
             this.setState({data: maps});
             console.error(API_URL, status, errorThrown.toString());
         }.bind(this));
    },
    componentDidMount: function() {
        this.state._isMounted = true;
        this.loadMapsFromServer();
        setInterval(this.loadMapsFromServer, POLL_INTERVAL);
    },
    componentWillUnmount: function() {
        // Reset the isMounted flag so that the loadCommentsFromServer callback
        // stops requesting state updates when the commentList has been unmounted.
        // This switch is optional, but it gets rid of the warning triggered by
        // setting state on an unmounted component.
        // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
        this.state._isMounted = false;
    },
    render: function() {
        return (
            <div className="mapBox" style={row}>
                <div style={col}>
                <h1>Geography Department Maps</h1>
                <MapList data={this.state.data} />
                </div>
                <div style={col}>
                <h1> Add New Map </h1>
                <MapForm onMapSubmit={this.handleMapSubmit} />
                </div>
            </div>
        );
    }
});