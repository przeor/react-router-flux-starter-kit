import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';
import { EventEmitter } from 'events';

var CHANGE_EVENT = "change";

var _cartItems = [];

function _addItem(item){
  console.log("ADD ITEM done - just an example");
  alert("ADD ITEM done - just an example - check the console log for an output");
  _cartItems.push(Math.random());
}

const AppStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },
  getCart() {
    return _cartItems
  },
  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;
    }
    AppStore.emitChange();

    return true;
  })
});

export default AppStore;
