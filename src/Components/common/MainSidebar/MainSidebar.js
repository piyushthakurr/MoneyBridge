import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Col } from "shards-react";

import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarSearch from "./SidebarSearch";
import SidebarNavItems from "./SidebarNavItems";

import { Store } from "../../../flux";

class MainSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
      sidebarNavItems: [
        {
          title: "Dashboard",
          to: "/auth/dashboard",
          htmlBefore: '<i class="material-icons"></i>',
        },
        {
          title: "Users",
          to: "/auth/traders",
          htmlBefore: '<i class="material-icons"> </i>',
        },
        {
          title: "Banking",
          to: "/auth/banking",
          htmlBefore: '<i class="material-icons"> </i>',
        },
        {
          title: "Sub Admin",
          to: "/auth/subAdmin",
          htmlBefore: '<i class="material-icons"> </i>',
        },
        
        
        /* ,
        {
          title: "Payment History",
          htmlBefore: '<i class="material-icons">vertical_split</i>',
          to: "/payment-history",
        } */
      ],
      menuVisible: false
    };

  
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange = () => {
    this.setState({
      ...this.state,
      menuVisible: Store.getMenuState(),
      sidebarNavItems: [
        {
          title: "Dashboard",
          to: "/auth/dashboard",
          htmlBefore: '<i class="material-icons"></i>',
        },
        {
          title: "Users",
          to: "/auth/traders",
          htmlBefore: '<i class="material-icons"> </i>',
        },
        {
          title: "Banking",
          to: "/auth/banking",
          htmlBefore: '<i class="material-icons"> </i>',
        },
        {
          title: "Sub Admin",
          to: "/auth/subAdmin",
          htmlBefore: '<i class="material-icons"> </i>',
        }
        
        /* ,
        {
          title: "Payment History",
          htmlBefore: '<i class="material-icons">vertical_split</i>',
          to: "/payment-history",
        } */
      ]
    });
  }

  render() {
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-12",
      this.state.menuVisible && "open"
    );

    return (
      <Col
        tag="aside"
        className={classes}
        lg={{ size: 2 }}
        md={{ size: 3 }}
      >
        <SidebarMainNavbar hideLogoText={this.props.hideLogoText} />
        <SidebarSearch />
        <SidebarNavItems sideBarNavItms = {this.state.sidebarNavItems}/>
      </Col>
    );
  }
}

MainSidebar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  hideLogoText: PropTypes.bool
};

MainSidebar.defaultProps = {
  hideLogoText: false
};

export default MainSidebar;
