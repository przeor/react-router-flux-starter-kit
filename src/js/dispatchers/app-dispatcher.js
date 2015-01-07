var Dispatcher = require('./dispatcher.js');
var merge  = require('react/lib/merge');

var AppDispatcher = merge(Dispatcher.prototype, {
  handleViewAction: function(action){
  	console.log('app-dispatcher.js');
    console.log('action', action);
    console.log('------------');
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    })
  }
})

module.exports = AppDispatcher;