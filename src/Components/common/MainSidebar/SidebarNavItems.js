import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ArrowDown from "../../../images/user-profile/arrow-down-sign-to-navigate.png";
import ArrowRight from "../../../images/user-profile/right-arrow.png";
import "./MainSidebar.css";
import { NavLink as RouteNavLink } from "react-router-dom";
import { Nav, NavItem, NavLink } from "shards-react";
import { get2fastatusFn } from "../../../Redux/Actions/profile/profile.actions";
import { TRADE_VOLUME } from "../../../Constants/_Types/types.reduxStore";

function SidebarNavItems(props) {
  const [visibleUserManagement, setVisibleUserManagement] = useState(false);
  const [visibleBuySellManagement, setvisibleBuySellManagement] = useState(false);

  useEffect(() => {
    props.get2fastatusFn().then(
      (res) => {
        // console.log("22FFAA", res);
      },
      (error) => {}
    );
  }, []);

  const handleOnchange = (e, type, menuName) => {
    if (menuName !== "") {
      setVisibleUserManagement(false);

      if (menuName === "userManage") {
        setVisibleUserManagement(!visibleUserManagement);
      }
    }
  };
  const handleOnchangeBuySell = (e, type, menuName) => {
    if (menuName !== "") {
      setvisibleBuySellManagement(false);

      if (menuName === "buySellManage") {
        setvisibleBuySellManagement(!visibleBuySellManagement);
      }
    }
  };

  const checkAccessModules = (type) => {
    if (props.twoFaDetails.access_role == 0) {
      return true;
    } else {
      if (Object.keys(props.twoFaDetails).length > 0) {
        let assignModule = props.twoFaDetails.role.split(",");
        if (assignModule.includes(type)) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  return (
    <div className="nav-wrapper">
      <Nav className="nav--no-borders flex-column">
        <NavItem>
          <NavLink
            onClick={(e) => handleOnchange(e, "show", "")}
            tag={RouteNavLink}
            to="/auth/dashboard"
          >
            <span>Dashboard</span>
          </NavLink>
        </NavItem>
        {props.twoFaDetails.access_role == 0 && (
          <NavItem style={{ cursor: "pointer" }}>
            <NavLink
              tag={RouteNavLink}
              to="/auth/sub-admin-management/sub-admin-users"
            >
              <span>Manage SubAdmin</span>
            </NavLink>
          </NavItem>
        )}
        {checkAccessModules("users_management") && (
          <NavItem style={{ cursor: "pointer" }}>
            <NavLink
              className={visibleUserManagement ? "nav-link active" : ""}
              onClick={(e) => handleOnchange(e, "show", "userManage")}
            >
              <div className="exchange_toggle">
                <span>User Management</span>
                {!visibleUserManagement && (
                  <img src={ArrowRight} alt="right_arrow" />
                )}
                {visibleUserManagement && (
                  <img src={ArrowDown} alt="right_arrow" />
                )}
              </div>
            </NavLink>

            {visibleUserManagement && (
              <ul className="submenu_exchange ">
                <NavItem>
                  <NavLink
                    tag={RouteNavLink}
                    to="/auth/user-management/traders"
                  >
                    <span>Users</span>
                  </NavLink>
                </NavItem>
              </ul>
            )}
          </NavItem>
        )}
             <NavItem style={{ cursor: "pointer" }}>
            <NavLink
              className={visibleBuySellManagement ? "nav-link active" : ""}
              onClick={(e) => handleOnchangeBuySell(e, "show", "buySellManage")}
            >
              <div className="exchange_toggle">
                <span>Buy Sell Management</span>
                {!visibleBuySellManagement && (
                  <img src={ArrowRight} alt="right_arrow" />
                )}
                {visibleBuySellManagement && (
                  <img src={ArrowDown} alt="down_arrow" />
                )}
              </div>
              </NavLink>
              {visibleBuySellManagement && (
              <ul className="submenu_exchange ">
                <NavItem>
                  <NavLink
                    tag={RouteNavLink}
                    to="/auth/buysell-management/buysellorders"
                  >
                    <span>Buy Sell Orders</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RouteNavLink}
                    to="/auth/buysell-management/tokenListing"
                  >
                    <span>Token listing</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={RouteNavLink}
                    to="/auth/buysell-management/feeListing"
                  >
                    <span>Fee listing</span>
                  </NavLink>
                </NavItem>
              </ul>
            )}
              </NavItem>
      </Nav>
      <></>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    twoFaDetails: state.profile.twoFaDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get2fastatusFn: () => dispatch(get2fastatusFn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavItems);
