var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;


// Fake authentication lib

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



function _FbOauthRequest(response) {
  fb_token = response.fb_token;
  console.log(fb_token);
  if (fb_token) {
    localStorage.token = fb_token;
  }
  console.log("SUCCESS!!!!!!");
} 



var AuthStore = merge(EventEmitter.prototype, {
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
        _FbOauthRequest(action.response);
        break;
    }
    AppStore.emitChange();

    return true;
  })
})

module.exports = AuthStore;

