var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  addItem:function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM
    })
  }
}

module.exports = AppActions;