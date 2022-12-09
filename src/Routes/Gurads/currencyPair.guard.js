
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../Redux/Actions/user/user.action";
import { DefaultLayout } from "../../Components/layouts";

const WithdrawGuard = ({ component: Component, ...rest }) => {
  const { token, role, userDetails, logoutUser, history, currencyPairAuth } = rest;
  
  const isAuthenticated = currencyPairAuth
  let path = rest.path.split("/")[1];
  return (
    <Route
      {...rest}
      render={ props =>
        isAuthenticated === true ? (
            <>
            <Component {...props} />
          </>
        ) : (
          <>
             <Redirect
              to={{
             pathname: "/auth/currency-pairs",
                state: {
                  from: props.location
                }
              }}
            
          />

</>
          )
      }
    />
  );
}


const mapStateToProps = state => {
  return {
    currencyPairAuth: state.currency.currencyPairAuth
  };
};



export default connect(mapStateToProps)(WithdrawGuard);

