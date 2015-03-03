/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Login = require('./auth/app-login');
var AppActions = require('../actions/app-actions.js');
var AppStore = require('../stores/app-store.js');
var Entity = require('./app-entity');
var Link = Router.Link;

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



