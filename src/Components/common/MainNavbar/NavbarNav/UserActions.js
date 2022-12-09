import React from "react";
import { Link } from "react-router-dom";
import { hashHistory } from "react-router";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink,
} from "shards-react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getSubmittedFileAdmin,
  logoutUser,
} from "../../../../Redux/Actions/user/user.action";
import "../../../../App.css";
import "./NavbarNav.css";
import { Icon } from "semantic-ui-react";
import Avatar from "../../../../images/user-profile/default-profile-pic.png";
import { get2fastatusFn } from "../../../../Redux/Actions/profile/profile.actions";

class UserActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      show: false,
      profilePic: "",
    };
    this.toggle = this.toggle.bind(this);

    this.toggleUserActions = this.toggleUserActions.bind(this);
    this.logouthandleUser = this.logouthandleUser.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  logoutUserPopup = () => {
    this.setState({
      show: true,
    });
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  logouthandleUser = () => {
    let { logoutUser } = this.props;
    logoutUser();
  };
  toggle() {
    this.setState((prevState) => {
      return { visible: !prevState.visible };
    });
  }

  getTwoFaDetails = () => {
    this.props.get2fastatusFn().then((val) => {
      this.getAdminProfileImage(val?.detail?.profile_image_id);
    });
  };

  getAdminProfileImage = (id) => {
    this.props.getSubmittedFileAdmin({ fileId: id });
  };

  componentDidMount() {
    this.getTwoFaDetails();
  }

  render() {
    return (
      <>
        <NavItem
          tag={Dropdown}
          caret
          toggle={this.toggleUserActions}
          style={{ cursor: "pointer" }}
        >
          <Dropdown open={this.state.visible} toggle={this.toggle}>
            <DropdownToggle
              caret
              tag={NavLink}
              className="text-nowrap px-3 pt-3 mt-1"
            >
              {!this.props?.ProfilePicDataData && (
                <img
                  className="user-avatar rounded-circle mr-2"
                  src={Avatar}
                  alt="User Avatar"
                />
              )}
              {this.props?.ProfilePicDataData !== undefined &&
                this.props?.ProfilePicDataData !== 0 && (
                  <img
                    className="user-avatar profile-pic rounded-circle mr-2"
                    src={this.props.ProfilePicDataData}
                    alt="User Avatar"
                  />
                )}
              <span
                className="d-md-inline-block "
                style={{ cursor: "pointer" }}
              >
                Welcome Admin
              </span>
            </DropdownToggle>

            <Collapse tag={DropdownMenu} right small>
              <DropdownItem tag={Link}>
                <Link to={"/auth/admin-dashboard-section/admin-profile"}>
                  <Icon name="profile" /> Profile
                </Link>
              </DropdownItem>

              {/* <DropdownItem tag={Link} >
          <Icon name="setting"/>  Settings 
          </DropdownItem> */}

              <DropdownItem divider />
              <DropdownItem
                // tag={Link}
                /* to="/" */
                onClick={this.logoutUserPopup}
                className="text-danger"
              >
                <Icon name="log out" /> Logout
              </DropdownItem>
            </Collapse>
          </Dropdown>
        </NavItem>
        {this.state.show && (
          <Modal
            show={this.state.show}
            onHide={this.handleClose}
            keyboard={false}
            className="logoutModal"
          >
            <Modal.Header closeButton>
              {/* <Modal.Title>Modal title</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>Are You Sure Want to Logout</Modal.Body>
            <Modal.Footer className="mx-auto">
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => this.logouthandleUser()}>
                Logout
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ProfilePicDataData: state?.user?.profileData?.file?.s3_path,
    // singleSubadminData: state.subadmin.singleSubadminData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    get2fastatusFn: () => dispatch(get2fastatusFn()),
    getSubmittedFileAdmin: (data) => dispatch(getSubmittedFileAdmin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
