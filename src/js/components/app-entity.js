import React from 'react';
import EntityActions from '../actions/app-entity';
import EntityStore from '../stores/app-entity';


class Entity extends React.Component {  
  constructor() {
    super();
    this.state = { 'entityList': EntityStore.getState() };
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount() {
    EntityStore.addChangeListener(this._onChange);
    this.getEntityDataIfNeeded(this.props);
  }
  componentWillUnmount() {
    EntityStore.removeChangeListener(this._onChange);
  }
  componentWillReceiveProps(nextProps) {
    this.getEntityDataIfNeeded(nextProps);
  }
  getEntityDataIfNeeded(props) {
    var entityList = EntityStore.getState();
    if(entityList.length===0) {
      var entity_id = "1" // this just example .. you can use this.props.entity_id
      EntityActions.getEntityData(entity_id);
    }
  }
  _onChange() {
    var newState = EntityStore.getState();
    console.log("newState below");
    console.log(newState);
    this.setState(newState);
  }
  render() {
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
}

module.exports = Entity;
