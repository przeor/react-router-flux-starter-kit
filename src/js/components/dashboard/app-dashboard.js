/** @jsx React.DOM */
var React = require('react');
var Login = require('../auth/app-login');
var AuthStore = require('../../stores/app-auth.js');
var ScheduleList = require('./app-schedulelist');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin.js');


var Dashboard = React.createClass({
  mixins: [ AuthenticationMixin ],
  render: function () {
    var token = AuthStore.authGetToken();
    return (
      <div>
        <h1>Dashboard</h1>
        <ScheduleList />
      </div>
    );
  }
});

module.exports = Dashboard;
