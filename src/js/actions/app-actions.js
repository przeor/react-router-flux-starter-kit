import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';

export default {
  addItem() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM
    })
  }
};
