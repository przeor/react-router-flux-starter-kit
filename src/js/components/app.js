var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var auth = require('../stores/app-auth'); // TODO / USE DISPATCHER & ACTIONS
var Login = require('./auth/login');
var AppActions = require('../actions/app-actions.js');
var AppStore = require('../stores/app-store.js');
var Link = Router.Link;


var APP = React.createClass({
  getInitialState: function () {
    return {
      loggedIn: auth.loggedIn()
    };
  },

  setStateOnAuth: function (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount: function () {
    auth.onChange = this.setStateOnAuth;
    auth.login();
  },
  handleClick:function(){
    AppActions.addItem();
  },
  render: function () {
    var loginOrOut = this.state.loggedIn ?
      <Link to="logout">Log out</Link> :
      <Link to="login">Sign in</Link>;
    return (
      <div>
        <ul>
          <li>{loginOrOut}</li>
          <li><Link to="about">About</Link></li>
          <li><Link to="dashboard">Dashboard</Link> (authenticated)</li>
        </ul>
        <button className="btn btn-default" onClick={this.handleClick}>Add To cart</button>
        <RouteHandler/>
      </div>
    );
  }
});




exports.APP = APP;



