var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

var AuthActions = {
    startAuth: function(email, pass) {
    var payload = {
    	'actionType': AppConstants.AUTH_LOG_IN, 
    	'email': email, 
    	'pass': pass
    };
    AppDispatcher.handleViewAction(payload)
    },
}

module.exports = AuthActions;