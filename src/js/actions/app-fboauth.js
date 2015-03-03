/** @jsx React.DOM */
var FbOauth = require('../utils/fboauth');

var FbOauthActions = {
    startOauth: function() {
        FbOauth.startOauth();
    },
}

module.exports = FbOauthActions;