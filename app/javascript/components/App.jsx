import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Month from './budget/month_view/month';
import Login from './login';
import '../styles/styles';
import Modal from 'react-modal';


// TODO: Add regester route, settings, 
class App extends React.Component {
  render() {
    Modal.setAppElement('#main-app');
    return(
        <Switch>
          <Route exact path="/" component={Month} />
          <Route exact path="/login" component={Login} />
        </Switch>
    );
  }
}

export default App