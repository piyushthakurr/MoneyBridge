import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const WithdrawGuard = ({ component: Component, ...rest }) => {
  const { currencyAuth } = rest;

  const isAuthenticated = currencyAuth;
  let path = rest.path.split("/")[1];
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <>
            <Redirect
              to={{
                pathname: "/auth/currency-management/currency",
                state: {
                  from: props.location,
                },
              }}
            />
          </>
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    currencyAuth: state.currency.currencyAuth,
  };
};

export default connect(mapStateToProps)(WithdrawGuard);
