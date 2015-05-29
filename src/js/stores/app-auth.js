var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var React = require('react/addons');


var CHANGE_EVENT = "change";


var _authData = {
      login_error: false,
      auth_token: null,
      loggedIn: !!localStorage.token
    };
    // your state container where




var _auth = {
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



function _pretendRequest(email, pass, cb) {
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
}



var AuthStore = React.addons.update(EventEmitter.prototype, {$merge: {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  authGetToken:function(){
    return _auth.getToken();
  },
  authLoggedIn:function(){
    return _authData.loggedIn;
  },
  authOnChange:function(cb){
    _auth.onChangeRedirect = cb;
  },
  authOnChangeHeader:function(cb){
    _auth.onChangeHeader = cb;
  },
  authLogout:function(){
    return _auth.logout();
  },
  getState: function() {
    return _authData;
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action;
    console.log(action);
    switch(action.actionType){
      case AppConstants.AUTH_LOG_IN:
      _auth.login(action.email, action.pass);
      break;
      case AppConstants.FB_OAUTH_TOKEN_SUCCESS:
        _auth.FbOauthRequest(action.response);
        break;
      // below is just a boiler plate (uncomment if required)
      // case AppConstants.FB_OAUTH_TOKEN_SUCCESS:
      //   _FbOauthRequest(action.response);
      //   break;
    }
    AuthStore.emitChange();

    return true;
  })
}});

module.exports = AuthStore;

