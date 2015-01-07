var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

APP = require('./components/app').APP;
// Dashboard = require('./components/app').Dashboard;

var Logout = require('./components/auth/logout');
var Login = require('./components/auth/login');

var About = require('./components/about/about');
var Dashboard = require('./components/dashboard/dashboard');


var routes = (
  <Route handler={APP}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="about" handler={About}/>
    <Route name="dashboard" handler={Dashboard}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});
