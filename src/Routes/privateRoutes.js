import React, { Component } from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import { BASEURL } from "../Constants/constant";
import { connect } from "react-redux";

import Dashboard from "../Components/pages/Dashboard";
import Traders from "../Components/pages/user/users";
// import EditUser from "../Components/pages/user/editUser";
import UserDetails from "../Components/pages/user/userDetails";
import SubmittedKyc from "../Components/pages/Kyc/submittedKyc";
import ApprovedKyc from "../Components/pages/Kyc/approvedKyc/approvedKyc";
import KycDetail from "../Components/pages/Kyc/kycDetail";
import EditApprovedKyc from "../Components/pages/Kyc/approvedKyc/editApprovedKyc";

import Subadmin from "../Components/pages/subAdmin/subadmin";
import AddSubadmin from "../Components/pages/subAdmin/addNewSubadmin";
import EditSubadmin from "../Components/pages/subAdmin/editSubadmin";

import Profile from "../Components/pages/profile/profile";
import ChangePassword from "../Components/pages/profile/changePassword";
import enableGoogleAuth from "../Components/pages/profile/googleAuth";

// import AdminAddCurrency from "../Components/pages/p2pExchange/AdminCurrency/AddCurrency";

import AproveKycPage from "../Components/pages/Kyc/approvedKyc/approvekycdetail";
import users from "../Components/pages/user/users";

import BuySellOrderList from "../Components/pages/LiquidityManagement/BuySellOrderList";
import BuyWithdrawList from "../Components/pages/LiquidityManagement/BuyWithdrawList";
import BuysellOrders from "../Components/pages/BuySell/BuysellOrders";
import ProofOfFunds from "../Components/pages/user/ProofOfFunds";
import profile from "../Components/pages/profile/profile";
import {TokenListing }from "../Components/pages/BuySell/TokenListing"
import { Feelisting } from "../Components/pages/BuySell/Feelisting";
class PrivateRoutes extends Component {
  constructor() {
    super();
    let dynmRoutes = [];
    dynmRoutes["traders"] = users;

    this.state = {
      dynmRoutes: dynmRoutes,
      alottedTabsData: [],
    };
  }

  render() {
    let { userInfo, allTabsData } = this.props;

    return (
      <div className="PrivateArea__content">
        <Route
          path={`${BASEURL}/auth/dashboard`}
          component={Dashboard}
          exact={true}
        />

        <Route
          path={`${BASEURL}/auth/trader-view/:traderId`}
          component={UserDetails}
          exact={true}
        />
        <Route
          path={`${BASEURL}/auth/user-management/traders`}
          component={this.state.dynmRoutes["traders"]}
          exact={true}
        />

        <Route
          path={`${BASEURL}/auth/user-management/proof-of-fund`}
          component={ProofOfFunds}
          exact={true}
        />

        <Route
          path={`${BASEURL}/auth/user-management/submittedKyc`}
          component={SubmittedKyc}
          exact={true}
        />
        <Route
          path={`${BASEURL}/auth/user-management/approvedKyc`}
          component={ApprovedKyc}
          exact={true}
        />
        <Route
          path={`${BASEURL}/auth/kycDetail/:userId`}
          component={KycDetail}
          exact={true}
        />
        <Route
          path={`${BASEURL}/auth/approvekycDetail/:userId`}
          component={AproveKycPage}
          exact={true}
        />

        <Route
          path={`${BASEURL}/auth/member-approved-edit/:userId`}
          component={EditApprovedKyc}
          exact={true}
        />
        <Route
          path={`${BASEURL}/auth/sub-admin-management/sub-admin-users`}
          component={Subadmin}
          exact={true}
        />
        <Route
          path={`${BASEURL}/auth/sub-admin-management/sub-admin-new`}
          component={AddSubadmin}
          exact={true}
        />
        <Route
          path={`${BASEURL}/auth/sub-admin-management/sub-admin-edit/:id`}
          component={EditSubadmin}
          exact={true}
        />
        <Route
          path={`${BASEURL}/auth/admin-dashboard-section/admin-profile`}
          component={profile}
          exact={true}
        />
        <Route
          path={`${BASEURL}/auth/admin-dashboard-section/change-password`}
          component={ChangePassword}
          exact={true}
        />
        <Route
          path={`/auth/admin-dashboard-section/google-authentication-setting`}
          component={enableGoogleAuth}
          exact={true}
        />

        <Route
          path={`${BASEURL}/auth/buysell-management/buysellorders`}
          component={BuysellOrders}
          exact={true}
        />

        <Route
          path={`${BASEURL}/auth/liquidity-management/buysell-orders`}
          component={BuySellOrderList}
          exact={true}
        />
        <Route
          path={`${BASEURL}/auth/liquidity-management/buywithdraw-orders`}
          component={BuyWithdrawList}
          exact={true}
        />
            <Route
          path={`${BASEURL}/auth/buysell-management/tokenListing`}
          component={TokenListing}
          exact={true}
        />
            <Route
          path={`${BASEURL}/auth/buysell-management/feeListing`}
          component={Feelisting}
          exact={true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PrivateRoutes));
