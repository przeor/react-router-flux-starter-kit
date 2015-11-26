import React from "react";

class ES6test extends React.Component {
  constructor() {
    super();
  }

  static getStores() {
    return [leftNavStore];
  }

  componentDidMount() {
    console.log(['getStores', this.getStores]);
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

export default ES6test;
