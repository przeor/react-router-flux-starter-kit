var React = require('react');
var auth = require('../../stores/app-auth'); // TODO / USE DISPATCHER & ACTIONS

var Logout = React.createClass({
  componentDidMount: function () {
    auth.logout();
  },

  render: function () {
    return <p>You are now logged out.</p>;
  }
});


module.exports = Logout;