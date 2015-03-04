var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var AuthStore = require('../stores/app-auth.js');



//
// TODO - when user clicks log-out, it needs a call to backend (nice to have)
// 


function _dispatch(key, response, params) {
    var payload = {actionType: key, response: response};
    if (params) {
        payload.queryParams = params;
    }
    AppDispatcher.handleRequestFbOauth(payload);
}

function _startFbOauth() {    
    window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({
            appId      : '321215961336165', 
            status     : true, 
            cookie     : true, 
            xfbml      : true
        });
        // This Parse FB login fires up when the button is
        // clicked for the first time by user
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



    // !IMPORTANT This Parse FB login fires up when the button is
    // clicked for second and later times .. probably later on
    // (while refactoring) we need to find better approach (more DRY)
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
}

var FbOauth = {
    startOauth: function() {
        _startFbOauth();
    }
};

module.exports = FbOauth;