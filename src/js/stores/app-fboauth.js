var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";


// authentication for facebook
var _auth = {
  login: function (email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    _pretendRequest(email, pass, function (res) {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    }.bind(this));
  },

  fb_login: function (fb_token, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }

    if (fb_token) {
      localStorage.token = res.token;
      if (cb) cb(true);
      this.onChange(true);
    } else {
      if (cb) cb(false);
      this.onChange(false);
    }
    
  },

  getToken: function () {
    return localStorage.token;
  },

  logout: function (cb) {
    delete localStorage.token;
    if (cb) cb();
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

  onChange: function () {}
};



function _pretendRequest(email, pass, cb) {
  setTimeout(function () {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7),
      });
    } else {
      cb({authenticated: false});
    }
  }, 0);
}








var FbOauthStore = merge(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  authLogin:function(email, pass, cb){
    return _auth.login(email, pass, cb);
  },
  authFbLogin:function(fb_token, cb){
    return _auth.fb_login(fb_token, cb);
  },
  authGetToken:function(){
    return _auth.getToken();
  },
  authLoggedIn:function(){
    return _auth.loggedIn();
  },
  authOnChange:function(cb){
    _auth.onChange = cb;
  },
  authLogout:function(){
    return _auth.logout();
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action; 
    console.log(action);
    switch(action.actionType){
      case AppConstants.FB_OAUTH_TOKEN_SUCCESS:
        _auth.FbOauthRequest(action.response);
        break;
    }
    FbOauthStore.emitChange();

    return true;
  })
})

module.exports = FbOauthStore;

