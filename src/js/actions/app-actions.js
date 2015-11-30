import AppConstants from '../constants/app-constants.js';
import AppDispatcher from '../dispatchers/app-dispatcher.js';

var AppActions = {
  addItem() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM
    })
  }
}

export default AppActions;
