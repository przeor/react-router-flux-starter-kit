import React from "react";


class ES6test extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <h1>ES6 TEST</h1>
        <p>This text is displayed by ES6 component</p>
      </div>
    );
  }
}

ES6test.willTransitionTo = (transition) => {
    if (!AuthStore.getState().loggedIn) {
      Login.attemptedTransition = transition;
      transition.redirect('/login');
      alert('Please login first.');
    }
};

export default ES6test;
