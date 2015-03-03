/** @jsx React.DOM */
var React = require('react');
var Login = require('../auth/app-login');
var AuthStore = require('../../stores/app-auth.js');
var DashboardStore = require('../../stores/app-dashboard.js');


function getScheduleList() {
  return {scheduleList: DashboardStore.getScheduleList()}
}

var ScheduleList = React.createClass({
  getInitialState: function() {
    return getScheduleList();
  },
  render: function () {
    var scheduleListItems = this.state.scheduleList.map(function(item,i){
      return <tr key={i}><td>{item.status}</td><td>{item.fullname}</td><td>{item.email}</td></tr>
    });
    return (
      <div>
      
        <table className="table table-striped table-hover">
        <thead>
          <tr><th>Status</th><th>Fullname</th><th>Email</th></tr>
        </thead>
        <tbody>
        {scheduleListItems}
        </tbody>
        </table>
      </div>
    );
  }
});

module.exports = ScheduleList;