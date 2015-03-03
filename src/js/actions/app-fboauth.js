/** @jsx React.DOM */
var FbOauth = require('../utils/fboauth');

var FbOauthActions = {
    startOauth: function(testVariable) {
        FbOauth.startOauth(testVariable);
    },
}

module.exports = FbOauthActions;