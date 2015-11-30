import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';
import { EventEmitter } from 'events';

var CHANGE_EVENT = "change";

var _scheduleList = [
    {id:1, status: 'ok', fullname: 'FullName #1', email: "1@aaa.com"},
    {id:2, status: 'ok', fullname: 'FullName #2', email: "2@aaa.com"},
    {id:3, status: 'ok', fullname: 'FullName #3', email: "3@aaa.com"}
  ];

function _addItem(item){
  console.log("Dashboard");
}

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
  getScheduleList() {
    return _scheduleList;
  },
  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      /* SHORT USAGE BOILERPLATE (EXAMPLE - uncomment if required)
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;
      */
    }
    AppStore.emitChange();
    return true;
  })
});

export default AppStore;
