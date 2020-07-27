import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Month from './budget/month_view/month';
import Login from './login';

import '../styles/styles';

class App extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path="/" component={Month} />
        <Route exact path="/login" component={Login} />
      </Switch>
    );
  }
}

export default App