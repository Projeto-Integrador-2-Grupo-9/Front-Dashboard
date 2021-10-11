import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";

const Dashboard = lazy(() => import("./Views/dashboard/Dashboard"));
const Error404 = lazy(() => import("./Views/error-pages/Error404"));
const Login = lazy(() => import("./Views/user-pages/Login"));
const Register1 = lazy(() => import("./Views/user-pages/Register"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/user-pages/login-1" component={Login} />
          <Route path="/user-pages/register-1" component={Register1} />
          <Route path="/error-pages/error-404" component={Error404} />
          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
