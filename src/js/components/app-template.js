/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../stores/app-store.js');
var AppActions = require('../actions/app-actions.js');

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
                    <h1 class="breadcrumbs"><a href="index.html">React-Router Example</a> / Auth Flow with Flux Architecture (GitHub.com/PrzeoR)</h1>
            		{this.props.children}
                    <br/><br/>
                    <button className="btn btn-default" onClick={this.handleClick}>Add Item (example output in console) </button>
            	</div>
            	)
        }
	});



module.exports = Template;
