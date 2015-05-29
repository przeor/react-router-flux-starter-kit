/** @jsx React.DOM */
var React = require('react');
var Login = require('../auth/app-login');
var AuthStore = require('../../stores/app-auth.js');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin.js');


var About = React.createClass({
  mixins: [ AuthenticationMixin ],
  render: function () {
    return (
    	<div>
    		<h1>About</h1>
    		<p>This react router flux starter was created by <a href="https://github.com/przeor/">PrzeoR</a>.
    		I created this because I did not find any suitable reactjs project starter at the time.
    		<br/>
    		This react router flux starter has been prepared with all known best practises
    		about react flux architecture.
    		<br/>
    		It uses:
    		<ul>
    			<li>FB flux architecture</li>
    			<li>basic react-router with auth flow</li>
                <li>structure of the folders & files which helps organize project easily</li>
                <li>helps you add web api requests into the flux architecture (check Entity component)</li>
    		</ul>
    		While I was learning about FB react flux architecture I used <a href="https://egghead.io/series/react-flux-architecture">Flux Architecture for Facebook''s React framework screencast (recommended by reactjs team)</a> so you can know that this project is using best known flux practises.
    		</p>
    	</div>
    	);
  }
});

module.exports = About;
