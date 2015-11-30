import AppConstants from '../constants/app-constants.js';
import AppDispatcher from '../dispatchers/app-dispatcher.js';

var AuthActions = {
  startAuth(email, pass) {
    var payload = {
      'actionType': AppConstants.AUTH_LOG_IN, 
      'email': email, 
      'pass': pass
    };
    AppDispatcher.handleViewAction(payload)
  }
};

export default AuthActions;
