import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import AccessUnauthoirized from "../../pages/errors/AccessUnauthoirized";

function PreloginRoutes({ component: Component, ...restOfProps }) {
  const role = AuthService.getUserRole();
  const RouteGateway = (props) => {
    if (Boolean(role)) {
      if (role === "customer") {
        return <Redirect to="/customer" />;
      } else if (role === "admin") {
        return <Redirect to="/admin" />;
      } else if (role === "accounting") {
        return <Redirect to="/accounting" />;
      } else if (role === "general-support") {
        return <Redirect to="/general-support" />;
      } else {
        return <AccessUnauthoirized />;
      }
    } else {
      return <Component {...props} />;
    }
  };

  return <Route {...restOfProps} render={(props) => RouteGateway(props)} />;
}

export default PreloginRoutes;
