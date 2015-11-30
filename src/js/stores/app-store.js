import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = "change";

let _cartItems = [];

const _addItem = (item) => {
  console.log("ADD ITEM done - just an example");
  alert("ADD ITEM done - just an example - check the console log for an output");
  _cartItems.push(Math.random());
};

const AppStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getCart() {
    return _cartItems;
  },
  dispatcherIndex: AppDispatcher.register((payload) => {
    switch (payload.action.actionType) {
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;
    }
    AppStore.emitChange();
    return true;
  })
});

export default AppStore;
