import React from "react";
import "../../../App.css";
import '../../../index.css'

import { Dispatcher, Constants } from "../../../flux";


import { Icon } from "semantic-ui-react";

class NavbarToggle extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  render() {
    return (
      <nav className="nav">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" onClick={this.handleClick} className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center">
        <Icon className="toggler_icon" name="sidebar"/>
        </a>
      </nav>
    )
  }
}

export default NavbarToggle;
