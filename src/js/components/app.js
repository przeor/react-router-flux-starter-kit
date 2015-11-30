import React from 'react';
var RouteHandler = require('react-router').RouteHandler;
import Entity from './app-entity';
import Template from './app-template';

class APP extends React.Component {
  render() {
    return (
      <Template>
        <RouteHandler />
        { /* this Entity component uses view request dispatcher for web api call and it is using flux architecture */ }
        <Entity />
      </Template>
    );
  }
}

export default APP;
