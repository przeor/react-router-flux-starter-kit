import React from 'react';
import Router from 'react-router';
import AuthStore from '../../stores/app-auth.js';
import AuthAction from '../../actions/app-auth.js';
import FbLoginButton from './app-fbloginbutton.js';

class Login extends React.Component {
  constructor() {
    super();
    this.state = AuthStore.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount() {
      AuthStore.addChangeListener(this._onChange);
  }
  componentDidUpdate() {
    if(this.state.auth_token !== null) {
      if(Login.attemptedTransition) {
        Login.attemptedTransition.retry();
      } else {
        this.context.router.replaceWith('/dashboard');
      }
    }
  }
  componentWillUnmount() {
      AuthStore.removeChangeListener(this._onChange);
  }
  handleSubmit (event) {
    event.preventDefault();
    var email = this.refs.email.value,
        pass = this.refs.pass.value;
    AuthAction.startAuth(email, pass);
  }
  _onChange() {
    this.setState(AuthStore.getState());
  }
  render() {
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
}

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
}

Login.statics = {
  attemptedTransition: null
}

export default Login;
