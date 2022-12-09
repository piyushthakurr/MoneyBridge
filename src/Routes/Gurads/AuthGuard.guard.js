import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../Redux/Actions/user/user.action";
import { DefaultLayout } from "../../Components/layouts";

const AuthGuard = ({ component: Component, ...rest }) => {
  const { token, role, userDetails, logoutUser, history } = rest;

  const isAuthenticated = token != null ? true : false;
  let path = rest.path.split("/")[1];
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <DefaultLayout>
            <Component {...props} />
          </DefaultLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.tokens,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthGuard);
