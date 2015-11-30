import React from 'react';
import Router from 'react-router';
import AuthStore from '../../stores/app-auth.js';
import FbOauthActions from '../../actions/app-fboauth';


var FbLoginButton = React.createClass({
  mixins: [ Router.Navigation ],

  statics: {
    attemptedTransition: null
  },

  getInitialState: function () {
    return {
      error: false
    };
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);
    FbOauthActions.fbLoginPageLoaded();
  },
  componentWillUnmount: function() {
    AuthStore.removeChangeListener(this._onChange);
  },
  handleFBLogin: function (event) {
    FbOauthActions.startOauth();
  },
  _onChange: function() {
    // when user is logged in, the Router redirects
    // to dashboard
    if(AuthStore.getState().loggedIn){
      this.replaceWith('/dashboard'); // replaceWith comes from Router (included in mixins)
    }
  },
  render: function () {
    return (
      <button type="submit" onClick={this.handleFBLogin}>FB login</button>
    );
  }
});

module.exports = FbLoginButton;
