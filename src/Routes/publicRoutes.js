import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { rootName,BASEURL } from "../Constants/constant";

import Homepage from '../Components/pages/Login/HomePage'
import GoogleLogin from "../Components/pages/Login/GoogleLogin";
import AuthenticateDevice from "../Components/pages/Login/AuthenticateDevice";

export default class PublicRoutes extends Component {
  state = {};
  render() {
    return (
      <div className="PublicArea__content">

         <Route
          path={`/`}
          component={Homepage}
          exact={true}
        />

        <Route
          path={`/google-authentication`}
          component={GoogleLogin}
          exact={true}
        />

        <Route
          path={`/authentication/authneticateDevice/:id`}
          component={AuthenticateDevice}
          exact={true}
        />
  
      </div>
    );
  }
}
