import AppConstants from '../constants/app-constants.js';
import AppDispatcher from '../dispatchers/app-dispatcher.js';
import FbOauth from '../utils/fboauth';

var FbOauthActions = {
  startOauth() {
    FbOauth.startOauth();
  },
  fbLoginPageLoaded() {
    FbOauth.fbLoginPageLoaded();
  }
}

export default FbOauthActions;
