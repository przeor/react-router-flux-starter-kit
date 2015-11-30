import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';
import FbOauth from '../utils/fboauth';

export default {
  startOauth() {
    FbOauth.startOauth();
  },
  fbLoginPageLoaded() {
    FbOauth.fbLoginPageLoaded();
  }
}
