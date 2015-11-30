import React from 'react';
import AppStore from '../stores/app-store.js';
import AppActions from '../actions/app-actions.js';
import Header from './header/app-header';


class Template extends React.Component {
  constructor() {
    super();
  }
  handleClick() {
    AppActions.addItem();
    console.log(getCart());
  }
  render() {
    return (
      <div className="container">
        <Header />
        {this.props.children}
        <br/>
        <br/>
        { /* this button component uses view action dispatcher api  and it is using flux architecture */ }
        <button className="btn btn-default" onClick={this.handleClick}>Add Item (an example output in the console .. it is using Actions-&lt;Dispatcher-&lt;Store one directional flow) </button>
      </div>
    )
  }
};

const getCart = () => AppStore.getCart();

export default Template;
