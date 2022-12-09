import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const WithdrawGuard = ({ component: Component, ...rest }) => {
  const { withdrawAuth } = rest;

  const isAuthenticated = withdrawAuth;
  let path = rest.path.split("/")[1];
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <>
            <Component {...props} />
          </>
        ) : (
          <>
            <Redirect
              to={{
                pathname: "/auth/withdraw-transactions/withdrawal_request",
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
    withdrawAuth: state.withdraw.withdrawAuth,
  };
};

export default connect(mapStateToProps)(WithdrawGuard);
