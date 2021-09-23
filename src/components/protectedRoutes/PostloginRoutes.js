import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import AccessForbidden from "../../pages/errors/AccessForbidden";

function PreloginRoutes({ component: Component, role, ...restOfProps }) {
  const loginRole = AuthService.getUserRole();
  const RouteGateway = (props) => {
    if (Boolean(loginRole)) {
      if (loginRole === role) {
        return <Component {...props} />;
      } else {
        return <AccessForbidden />;
      }
    } else {
      return <Redirect to="/" />;
    }
  };

  return <Route {...restOfProps} render={(props) => RouteGateway(props)} />;
}

export default PreloginRoutes;
