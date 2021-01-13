import React from "react";
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//Routing
import PrivateRoute from './components/routing/PrivateRoute';

//Screens
import PrivateScreen from './components/screens/PrivateScreen';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import ForgotPassword from './components/screens/ForgotPassword';
import ResetPassword from './components/screens/ResetPassword';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/" component={PrivateScreen} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPassword} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
