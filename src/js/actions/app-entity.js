/** @jsx React.DOM */
var Api = require('../utils/api');

var EntityActions = {
    getEntityData: function(entityId) {
        Api.getEntityData(entityId);
    },
}

module.exports = EntityActions;