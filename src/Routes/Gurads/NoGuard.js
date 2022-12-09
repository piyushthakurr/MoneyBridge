import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const NoGuard = ({ component: Component, ...rest }) => {
  const { token } = rest;
  const isAuthenticated = token != null ? true : false;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/dashboard",
              state: {
                from: props.location
              }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.tokens
  };
};

export default connect(
  mapStateToProps,
  null
)(NoGuard);
