/** @jsx React.DOM */
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Entity = require('./app-entity');
var Template = require('./app-template');

var APP = React.createClass({
  render: function () {
    return (
      <Template>
        <RouteHandler/>
     { /* this Entity component uses view request dispatcher for web api call and it is using flux architecture */ }
        <Entity /> 
      </Template>
    );
  }
});




exports.APP = APP;



