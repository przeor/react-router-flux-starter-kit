/** @jsx React.DOM */
var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var FbOauth = require('../utils/fboauth');

var FbOauthActions = {
  startOauth: function() {
    FbOauth.startOauth();
  },
  fbLoginPageLoaded: function() {
    FbOauth.fbLoginPageLoaded();
  }
}

module.exports = FbOauthActions;