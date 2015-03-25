var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');

function _dispatch(key, email, pass) {
    var payload = {actionType: key, email: email, pass:pass};
    AppDispatcher.handleRequestAction(payload);
}


var AuthActions = {
    startAuth: function(email, pass) {
    	_dispatch(AppConstants.AUTH_LOG_IN, email, pass)
    },
}

module.exports = AuthActions;