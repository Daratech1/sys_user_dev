import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// core components
import RTL from "layouts/RTL.js";
import Login from "views/login/login";
import Register from "views/register/register";
import PrivateRoute from "./PrivateRoute.js";
import ResetPassword from "views/restPassword/resetPassword.js";
// Alert compoent
import Alert from "components/Alert/Alert";

export default function AppRoute() {
  return (
    <Router>
      <div className="alert-style">
        <Alert />
      </div>

      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/resetpassword" component={ResetPassword} />
        <PrivateRoute path="/" component={RTL} />
      </Switch>
    </Router>
  );
}
