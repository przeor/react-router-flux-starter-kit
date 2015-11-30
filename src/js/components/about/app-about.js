import React from 'react';
import Login from '../auth/app-login';
import AuthStore from '../../stores/app-auth.js';
// import AuthenticationMixin from '../../mixins/AuthenticationMixin.js';


class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>
          This react router flux starter was created by <a href="https://github.com/przeor/">PrzeoR</a>. I created this because I did not find any suitable reactjs project starter at the time.
          <br/>
          <br/>
          This react router flux starter has been prepared with all known best practises about react flux architecture.
          <br/>
          <br/>
          It uses:
        </p>
        <ul>
          <li>FB flux architecture</li>
          <li>basic react-router with auth flow</li>
          <li>structure of the folders & files which helps organize project easily</li>
          <li>helps you add web api requests into the flux architecture (check Entity component)</li>
        </ul>
        <p>
          While I was learning about FB react flux architecture I used <a href="https://egghead.io/series/react-flux-architecture">Flux Architecture for Facebook''s React framework screencast (recommended by reactjs team)</a> so you can know that this project is using best known flux practises.
        </p>
      </div>
    );
  }
}

About.willTransitionTo = (transition) => {
    if (!AuthStore.getState().loggedIn) {
      Login.attemptedTransition = transition;
      transition.redirect('/login');
      alert('Please login first.');
    }
};

export default About;
