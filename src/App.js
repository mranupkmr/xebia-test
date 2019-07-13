import React from 'react';
import {
  BrowserRouter,
  Route, Redirect, Switch
} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from "./reducers";
import Login from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';

let store = createStore(rootReducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
                <Switch>
                  <Route exact path="/" render={() => {
                    if (this.isUserLoggedIn()) {
                      return <Dashboard />;
                    }
                    return <Login />;
                  }} 
                  />
                  <Route exact path="/dashboard" render={() => {
                    if (this.isUserLoggedIn()) {
                      return <Dashboard />;
                    }
                    return <Login />;
                  }}  
                  />
                </Switch>
        </BrowserRouter>
        </Provider>
    );
  }
  isUserLoggedIn() {
    const userDetail = localStorage['isUserLoggedIn'];
    if(userDetail) {
      return true;
    }
    return false;
  }
}

export default App;
