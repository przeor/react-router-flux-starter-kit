import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';

export default {
  startAuth(email, pass) {
    let payload = {
      'actionType': AppConstants.AUTH_LOG_IN, 
      'email': email, 
      'pass': pass
    };
    AppDispatcher.handleViewAction(payload);
  }
}
