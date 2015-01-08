var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Login = require('./auth/login');
var AppActions = require('../actions/app-actions.js');
var AppStore = require('../stores/app-store.js');
var Link = Router.Link;

var Template = require('./app-template');
var Header = require('./header/app-header');


var APP = React.createClass({
  render: function () {
    return (
      <Template>
        <Header/>
        <RouteHandler/>
      </Template>
    );
  }
});




exports.APP = APP;



