import React from 'react';
import Remarkable from 'remarkable';
import {Link} from 'react-router';


var imgStyle = {
    width: '200px',
    height: '200px',
}

var mapStyle = {
    backgroundColor: '#4CAF50',
    border: '5px solid #4CAF50',
    borderRadius: '5px',
    marginTop: '5px',
    marginBottom: '5px',
    color: 'white'
}

module.exports = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable({html: true});
        var rawMarkup = md.render(this.props.children.toString());
        return {__html: rawMarkup};
    },
    render: function () {
        return (
            <div className="map" style={mapStyle} >
                
                <Link to={'/display/'+ this.props.id} syle={{textDecoration: 'none'}}>
                    <h2 className="map_title">
                    {this.props.title}
                    </h2>
                </Link>
                <span dangerouslySetInnerHTML={this.rawMarkup()}/>
                
                <div className="mapContent">
                    <section className="mapCountry">Country: {this.props.country} State: {this.props.state} City: {this.props.city} Year: {this.props.year} Scale: {this.props.scale} Type: {this.props.type}</section>
                    <Link to={'/' + this.props.id} style={{display: 'block', color: 'white'}}>Edit</Link>
                </div>
            </div>
        );
    }
});


