/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var AuthStore = require('../../stores/app-auth.js');
var FbOauthActions = require('../../actions/app-fboauth');
var FbOauthStore = require('../../stores/app-fboauth');



// TODO
// 1. copy working code from app-login.js component
// 2. try out if working
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
      FbOauthStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
      FbOauthStore.removeChangeListener(this._onChange);
  },
  handleFBLogin: function (event) {
    FbOauthActions.startOauth();
  },
  _onChange: function() { 
    // when user is logged in, the Router redirects
    // to dashboard
    if(FbOauthStore.authLoggedIn()){
      this.replaceWith('/dashboard'); // replaceWith comes from Router (included in mixins)
    }
  },
  render: function () {
    return (
          <button type="submit" onClick={this.handleFBLogin}>FB login</button>
    );
  }
});



// keeping below for reference while changing this component
//
// var FbLoginButton = React.createClass({
//   mixins: [ Router.Navigation ],

//   statics: {
//     attemptedTransition: null
//   },

//   getInitialState: function () {
//     return {
//       error: false
//     };
//   },
//   componentDidMount: function() {
//       FbOauthStore.addChangeListener(this._onChange);
//   },
//   // componentWillUnmount: function() {
//   //     FbOauthStore.removeChangeListener(this._onChange);
//   // },
//   handleFBLogin: function (event) {
//     FbOauthActions.startOauth();
//   },
//   _onChange: function() { console.log("Kamil test"); },
//   render: function () {
//     return (
//           <button type="submit" onClick={this.handleFBLogin}>FB login</button>
//     );
//   }
// });

module.exports = FbLoginButton;

