import React from 'react';
import {render} from 'react-dom';
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

import APP from './components/app';

import Logout from './components/auth/app-logout';
import Login from './components/auth/app-login';

import About from './components/about/app-about';
import Dashboard from './components/dashboard/app-dashboard';
import ES6Test from './components/es6/es6-test';

var routes = (
  <Route handler={APP}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="about" handler={About}/>
    <Route name="dashboard" handler={Dashboard}/>
    <Route name="es6-test" handler={ES6Test}/>
  </Route>
);

Router.run(routes, function (Handler) {
  render(<Handler/>, document.getElementById('example'));
});
