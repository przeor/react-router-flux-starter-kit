/** @jsx React.DOM */
var React = require('react');
var EntityActions = require('../actions/app-entity');
var EntityStore = require('../stores/app-entity');


var Entity = React.createClass({  
    getInitialState: function() {
        return { 'entityList': EntityStore.getState() };
    },
    componentDidMount: function() {
        EntityStore.addChangeListener(this._onChange);
        this.getEntityDataIfNeeded(this.props);
    },
    componentWillUnmount: function() {
        EntityStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(nextProps) {
        this.getEntityDataIfNeeded(nextProps);
    },
    getEntityDataIfNeeded: function(props) {
        var entityList = EntityStore.getState();
        if(entityList.length===0) {
            entity_id = "1" // this just example .. you can use this.props.entity_id
            EntityActions.getEntityData(entity_id);
        }
    },
    _onChange: function() {this.setState(EntityStore.getState());},
    render: function() {
        console.log("got web api data while renedering");
        console.log(this.state); 
        // This console log this.state data comes from an api call 
        // via Action Creator (EntityActions.getEntityData) -> utils/api.js -> dispatcher.
        // All the code in the EntityStore is synchronous thanks for that data flow
        // thus the code is more maintainable and much better structurized
        return (
            <div className="well"> This is Entity Component Uses Proper Flux Architecture for Getting Async Web Api Calls (check console log for more details) </div>
            )
    }
});


module.exports = Entity;