import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand } from "shards-react";
import { Icon } from "semantic-ui-react";
import { Dispatcher, Constants } from "../../../flux";
import MoneyBridgeLogo from "../../../images/logo.svg";
import "../../../../src/index.css";
const BASE_URL = "http://exchange-stage.blackboxam.com/admin/";

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  }

  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR,
    });
  }

  render() {
    const { hideLogoText } = this.props;
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
          style={{ border: "none !important" }}
        >
          <NavbarBrand
            className="w-100 mr-0"
            style={{ lineHeight: "25px", border: "none !important" }}
          >
            <img
              id="main-logo"
              className="d-inline-block align-top pl-4"
              style={{}}
              src={MoneyBridgeLogo}
              alt="RapiX Dashboard"
            />
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            <Icon className="toggler_icon" name="sidebar" />
          </a>
        </Navbar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool,
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false,
};

export default SidebarMainNavbar;
