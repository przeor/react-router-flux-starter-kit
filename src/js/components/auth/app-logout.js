import React from 'react';
import AuthStore from '../../stores/app-auth.js';


class Logout extends React.Component {
  componentDidMount() {
    AuthStore.authLogout();
  }
  render() {
    return <p>You are now logged out.</p>;
  }
}


export default Logout;