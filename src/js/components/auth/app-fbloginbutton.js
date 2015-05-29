/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var AuthStore = require('../../stores/app-auth.js');
var FbOauthActions = require('../../actions/app-fboauth');
var AuthStore = require('../../stores/app-auth.js');


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

