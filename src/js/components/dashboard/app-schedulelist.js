import React from 'react';
import Login from '../auth/app-login';
import AuthStore from '../../stores/app-auth.js';
import DashboardStore from '../../stores/app-dashboard.js';


const getScheduleList = () => {
  return { scheduleList: DashboardStore.getScheduleList() };
};

class ScheduleList extends React.Component {
  constructor() {
    super();
    this.state = getScheduleList();
  }
  render() {
    let scheduleListItems = this.state.scheduleList.map((item, i) => {
      return <tr key={i}><td>{item.status}</td><td>{item.fullname}</td><td>{item.email}</td></tr>
    });
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr><th>Status</th><th>Fullname</th><th>Email</th></tr>
        </thead>
        <tbody>
          {scheduleListItems}
        </tbody>
      </table>
    );
  }
}

export default ScheduleList;
