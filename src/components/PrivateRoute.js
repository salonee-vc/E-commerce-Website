import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "../Auth";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        console.log("is Authen", Auth.isAuthenticated);
        return Auth.isAuthenticated === true ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        );
      }}
    />
  );
}

export default PrivateRoute;
