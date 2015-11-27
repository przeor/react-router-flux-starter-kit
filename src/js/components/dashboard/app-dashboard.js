import React from 'react';
import Login from '../auth/app-login';
import AuthStore from '../../stores/app-auth.js';
import ScheduleList from './app-schedulelist';
import AuthenticationMixin from '../../mixins/AuthenticationMixin.js';


class Dashboard extends React.Component {
  //mixins: [ AuthenticationMixin ]
  render() {
    var token = AuthStore.authGetToken();
    return (
      <div>
        <h1>Dashboard</h1>
        <ScheduleList />
      </div>
    );
  }
}

export default Dashboard;
