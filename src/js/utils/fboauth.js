var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');



//
// TODO - when user clicks log-out, it needs a call to backend (nice to have)
// 



_fb_login_object = {
    success: function(user) {
        oauth_obj = {
            "parse_username": user._serverData.username,
            "fb_token": user._serverData.authData.facebook.access_token,
            "fb_id": user._serverData.authData.facebook.id
        }
        
        FB.api('/me', function(me) {
          user.set("displayName", me.name);
          user.set("fbUserId", me.id);
          user.set("fbUserToken", oauth_obj.fb_token);
          user.set("email", me.email);
          user.save();
          console.log("/me response", me);
        });

        /*if (!user.existed()) {
          swal({
            title: "You are registered",
            text: "Do you want to read our tutorial how to make awesome workout's gifs?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#5E35B1",
            confirmButtonText: "Yes",
            closeOnConfirm: true
          },
          function(){
            alert("redirect to awesome page here :-) (kamil) ");
          });
        } else {
            swal({title: "Login success! :-)",   text: "", confirmButtonColor: "#5E35B1",   timer: 800 });
        }*/
        //
        // Success! Let's dispatch results to the fboAuthStore
        // 
        _dispatch(AppConstants.FB_OAUTH_TOKEN_SUCCESS,oauth_obj)
    },
    error: function(user, error) {
        console.log("User canceled the Facebook login or did not fully authorize.");
        //location.reload();
    }
}



function _dispatch(key, response, params) {
    var payload = {actionType: key, response: response};
    if (params) {
        payload.queryParams = params;
    }
    AppDispatcher.handleRequestFbOauth(payload);
}



// 
// Below hacking not blocking fb's popups
// 
function _fbLoginPageLoaded() { 
    window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({
            appId      : '321215961336165', 
            status     : true, 
            cookie     : true, 
            xfbml      : true
        });
        // This Parse FB login fires up when the button is
        // clicked for the first time by user
        Parse.FacebookUtils.logIn("email, public_profile, user_friends", _fb_login_object);
    };


    (function(d){
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document)); 
}





function _startFbOauth() { 
    // !IMPORTANT This Parse FB login fires up when the button is
    // clicked for second and later times .. probably later on
    // (while refactoring) we need to find better approach (more DRY)
    Parse.FacebookUtils.logIn("user_likes,email", _fb_login_object);
}



var FbOauth = {
    startOauth: function() {
        _startFbOauth();
    },
    fbLoginPageLoaded: function() {
        _fbLoginPageLoaded();
    }
};

module.exports = FbOauth;