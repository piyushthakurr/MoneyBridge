import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Container, Navbar } from "shards-react";
import MoneyBridegLogo from "../../../images/logo.svg";
import NavbarSearch from "./NavbarSearch";
import NavbarNav from "./NavbarNav/NavbarNav";
import NavbarToggle from "./NavbarToggle";
import "../../../App.css";

const MainNavbar = ({ layout, stickyTop }) => {
  const classes = classNames(
    "main-navbar",
    "bg-white",
    stickyTop && "sticky-top"
  );

  return (
    <div className={classes}>
      <Container fluid className="p-0 mr-0 main_navbar_container mobile_in">
        <div className="mobile_logo d-lg-none">
          <img
            id="main-logo"
            className=""
            style={{}}
            src={MoneyBridegLogo}
            alt="BWB Dashboard"
          />
        </div>
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          <NavbarSearch />
          <NavbarNav />
          <NavbarToggle />
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool,
};

MainNavbar.defaultProps = {
  stickyTop: true,
};

export default MainNavbar;
