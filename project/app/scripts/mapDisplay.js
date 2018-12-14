import React from 'react';
import {Link} from 'react-router';
import $ from 'jquery';

//import {API_URL} from './global';
var imgStyle = {
    width: '400px',
    height: '400px',
}

var row = {
    display: 'flex'
}

var col = {
    flex: '1',
    padding: '1em'
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
            url: "/display/" + this.props.params.mapID,
            dataType: 'json',
            cache: false,
        })
            .done(function (result) {
                this.setState(result[0]);
            }.bind(this))
            .fail(function (xhr, status, errorThrown) {
                console.error("/display/", status, errorThrown.toString());
            }.bind(this));
    },
    render: function () {
        return (
                <div className="mapDisplay" style={row}>
                    <div style={col}>
                        <h1>{this.state.title}</h1>
                        <div>
                            <p> Country: {this.state.country} </p>
                        </div>
                        <div>
                            <p> State: {this.state.state} </p>
                        </div>
                        <div>
                            <p> City: {this.state.city} </p>
                        </div>
                        <div>
                            <p> Year: {this.state.year} </p>
                        </div>
                        <div>
                            <p> Scale: {this.state.scale} </p>
                        </div>
                        <div>
                            <p> Type: {this.state.type} </p>
                        </div>
                        
                        <Link to='/'>RETURN</Link>
                    </div>
                    <div style={col}>
                        <h1>Image</h1>
                        <img style={imgStyle} src={this.state.imgUrl}/>
                    </div>
                </div>
        );
    }
});