var React = require('react');
var auth = require('../../stores/app-auth'); // TODO / USE DISPATCHER & ACTIONS
var Login = require('../auth/login');


var Dashboard = React.createClass({
  statics: {
    willTransitionTo: function (transition) {
      if (!auth.loggedIn()) {
        Login.attemptedTransition = transition;
        transition.redirect('/login');
      }
    }
  },
  render: function () {
    var token = auth.getToken();
    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    );
  }
});

module.exports = Dashboard;
