import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, Router, Switch } from 'react-router-dom'
import App from './components/App.jsx';
import history from "./history";
import UserProvider from "./contexts/UserProvider.jsx";
import Profile from './components/Profile.jsx';

const routing = (
  <Router history={history}>
    <div>
      <Switch>
        <UserProvider>
          <Route exact path="/" component={App} />
          <Route path="/pages/profile" component={Profile} />
        </UserProvider>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("app"));