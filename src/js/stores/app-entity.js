import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/app-dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = "change";

let _entityList = [
  // your state container where
];

const _persistEntityData = (actionDetails) => {
  console.log(actionDetails);
  var response = actionDetails.response;
	console.log("Entity gets async data from web api stores /app-entity.js");
  console.log(response);
  _entityList = response;
  // do whatever you need to do with the response to store
  // the state
}

const EntityStore = Object.assign(EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },
  getState() {
    return _entityList;
  },
  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action; // this is our action from handleViewAction or handleRequestAction
    switch(action.actionType) {
      case AppConstants.GET_ENTITY_DATA:
        _persistEntityData(action);
        break;
      default:
        return true;
    }
    EntityStore.emitChange();
    return true;
  })
});

export default EntityStore;
