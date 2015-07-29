/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var AppActions = require('../actions/app-actions.js');
var Header = require('./header/app-header');

function getCart() {
  return AppStore.getCart();
}

var Template = 
    React.createClass({
        handleClick:function(){
            AppActions.addItem();
            console.log(getCart());
        },    
        render:function(){
            return (
            	<div className="container">
                    <Header />
                    {this.props.children}
                   <br/><br/>
                   { /* this button component uses view action dispatcher api  and it is using flux architecture */ }
                   <button className="btn btn-default" onClick={this.handleClick}>Add Item (an example output in the console .. it is using Actions-&lt;Dispatcher-&lt;Store one directional flow) </button>
                </div>
            	)
        }
	});



module.exports = Template;
