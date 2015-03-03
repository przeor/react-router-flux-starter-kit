var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AuthStore = require('../stores/app-auth.js');


// Regarding to some opinions
// the best is to use Parse from CDN (not NPM module)
// because there are some time consuming issues regarding
// Browserify ...
Parse.initialize("6Y1thpza6ZmfUKLG8HAV2gAMciWfORn3Eh0YRmIE", 
      "EwL2wkstnoAn8oaipAl2bDTDmGLWlum7u1Tfp0po");

function _dispatch(key, response, params) {
    var payload = {actionType: key, response: response};
    if (params) {
        payload.queryParams = params;
    }
    AppDispatcher.handleRequestFbOauth(payload);
}
// dispatch(AppConstants.FB_OAUTH_TOKEN,)

function _startFbOauth() {

        window.fbAsyncInit = function() {
            Parse.FacebookUtils.init({
                appId      : '321215961336165', 
                status     : true, 
                cookie     : true, 
                xfbml      : true
            });

        Parse.FacebookUtils.logIn("user_likes,email", {
            success: function(user) {
                oauth_obj = {
                    "parse_username": user._serverData.username,
                    "fb_token": user._serverData.authData.facebook.access_token,
                    "fb_id": user._serverData.authData.facebook.id
                }
                if (!user.existed()) {
                    alert("User signed up and logged in through Facebook!");
                } else {
                    alert("User logged in through Facebook!");
                }
                //
                // Success! Let's dispatch results to the fboAuthStore
                // 
                _dispatch(AppConstants.FB_OAUTH_TOKEN_SUCCESS,oauth_obj)
            },
            error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
                location.reload();
            }
        });
    };

    (function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document)); 
}

var FbOauth = {
    startOauth: function(testVariable) {
        _startFbOauth();
    }
};

module.exports = FbOauth;