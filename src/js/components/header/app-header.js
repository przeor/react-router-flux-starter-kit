var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var auth = require('../../stores/app-auth'); // TODO / USE DISPATCHER & ACTIONS
var Login = require('../auth/login');
var AppActions = require('../../actions/app-actions.js');
var AuthStore = require('../../stores/app-auth.js');
var Link = Router.Link;


var Header = React.createClass({
  getInitialState: function () {
    return {
      loggedIn: AuthStore.authLoggedIn()
    };
  },
  setStateOnAuth: function (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },
  componentWillMount: function () {
    AuthStore.authOnChange(this.setStateOnAuth);
    AuthStore.authLogin();
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
      </div>
    );
  }
});




module.exports = Header;



