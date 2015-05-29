var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var EventEmitter = require('events').EventEmitter;
var React = require('react/addons');

var CHANGE_EVENT = "change";


var _entityList = [
    // your state container where
];



function _persistEntityData(response) {
	console.log("Entity gets async data from web api stores /app-entity.js");
  _entityList = response;
    // do whatever you need to do with the response to store
    // the state
}


var EntityStore = React.addons.update(EventEmitter.prototype, {$merge: {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  getState: function() {
    return _entityList;
  },
  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction or handleRequestAction
    switch(action.actionType) {
        case AppConstants.GET_ENTITY_DATA:
            _persistEntityData(action.response);
            break;
        default:
            return true;
    }
    EntityStore.emitChange();

    return true;
  })
}});








module.exports = EntityStore;