import React from "react";
import { Route, useHistory } from "react-router-dom";

function PublicRoute({ component: Component, ...rest }) {
  const history = useHistory();
  const isLogin = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? history.goBack() : <Component {...props} />
      }
    />
  );
}

export default PublicRoute;