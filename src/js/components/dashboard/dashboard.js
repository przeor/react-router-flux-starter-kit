var React = require('react');
var Login = require('../auth/login');
var AuthStore = require('../../stores/app-auth.js');


var Dashboard = React.createClass({
  statics: {
    willTransitionTo: function (transition) {
      if (!AuthStore.authLoggedIn()) {
        Login.attemptedTransition = transition;
        transition.redirect('/login');
      }
    }
  },
  render: function () {
    var token = AuthStore.authGetToken();
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
