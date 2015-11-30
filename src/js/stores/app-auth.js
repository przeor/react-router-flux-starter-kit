import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = "change";

let _authData = {
  login_error: false,
  auth_token: null,
  loggedIn: !!localStorage.token
};
// your state container where

let _auth = {
  login: function (email, pass, cb) {
    console.log('loggin',email, pass);
    cb = cb || function(backdata){};

    if (localStorage.token) {
      _authData.loggedIn = true;
      cb(true);
      this.onChange(true);
      return;
    }

    _pretendRequest(email, pass, function (res) {
      if (res.authenticated) {
        localStorage.token = res.token;
        _authData.auth_token=res.token;
        _authData.loggedIn = true;
        cb(true);
        this.onChange(true);
      } else if(res.login_error) {
        _authData.login_error=true;
        cb(false);
        this.onChange(false);
        swal({title: "Bad login information",   text: "", confirmButtonColor: "#ff0000",   timer: 800 });
      } else {
        _authData.error=true;
        this.logout();
        cb(false);
        this.onChange(false);
      }
    }.bind(this));
  },
  getToken: function () {
    return localStorage.token;
  },
  logout: function (cb) {
    _authData.auth_token=null;
    _authData.loggedIn = false;
    localStorage.removeItem('token');
    this.onChange(false);
  },
  loggedIn: function () {
    return !!localStorage.token;
  },
  FbOauthRequest: function (response) {
    fb_token = response.fb_token;
    console.log(fb_token);
    if (fb_token) {
      localStorage.token = fb_token;
      this.onChange(true); // triggering header to update state
    }
  },
  onChange: function (loggedIn) {
    this.onChangeRedirect(loggedIn);
    this.onChangeHeader(loggedIn);
  },
  // this on change is fired up in order
  // to change route to /dashboard after successful login
  onChangeRedirect: function() {},
  // this on change is fired up in order
  // to change header state login/logout
  onChangeHeader: function() {}
};

const _pretendRequest = (email, pass, cb) => {
  setTimeout(function () {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        login_error: false,
        authenticated: true,
        token: Math.random().toString(36).substring(7),
      });
    } else {
      cb({
        login_error: true,
        authenticated: false,
        token:null
      });
    }
    AuthStore.emitChange();
  }, 0);
};

const AuthStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },
  authGetToken() {
    return _auth.getToken();
  },
  authLoggedIn() {
    return _authData.loggedIn;
  },
  authOnChange(cb) {
    _auth.onChangeRedirect = cb;
  },
  authOnChangeHeader(cb) {
    _auth.onChangeHeader = cb;
  },
  authLogout() {
    return _auth.logout();
  },
  getState() {
    return _authData;
  },
  dispatcherIndex: AppDispatcher.register((payload) => {
    let action = payload.action;
    console.log(action);
    switch(action.actionType){
      case AppConstants.AUTH_LOG_IN:
        _auth.login(action.email, action.pass);
        break;
      case AppConstants.FB_OAUTH_TOKEN_SUCCESS:
        _auth.FbOauthRequest(action.response);
    }
    AuthStore.emitChange();
    return true;
  })
});

export default AuthStore;
