/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var AuthStore = require('../../stores/app-auth.js');
var AuthAction = require('../../actions/app-auth.js');
var FbLoginButton = require('./app-fbloginbutton.js');


var Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  statics: {
    attemptedTransition: null
  },

  getInitialState: function () {
    return AuthStore.getState();
  },
  componentDidMount: function() {
      AuthStore.addChangeListener(this._onChange);
  },
  componentDidUpdate: function() {
    if(this.state.auth_token!==null) {
      if(Login.attemptedTransition) {
        Login.attemptedTransition.retry();
      } else {
        this.context.router.replaceWith('/dashboard');
      }
    }
  },
  componentWillUnmount: function() {
      AuthStore.removeChangeListener(this._onChange);
  },
  handleSubmit: function (event) {
    event.preventDefault();
    var email = this.refs.email.getDOMNode().value;
    var pass = this.refs.pass.getDOMNode().value;
    AuthAction.startAuth(email, pass);
  },
  _onChange: function() {this.setState(AuthStore.getState());},
  render: function () {
    var errors = this.state.login_error === true ? <p>Bad login information</p> : '';
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
          <label><input ref="pass" placeholder="password"/></label> (hint: password1)<br/>
          <button type="submit">login</button>
          {errors}
        </form>
        <FbLoginButton/>
      </div>
    );
  }
});

module.exports = Login;