import React, { Component } from "react";
import PageTitle from "../../../../Components/common/PageTitle";
import { connect } from "react-redux";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";

import {
  singleKycDataFn,
  updateUserDetailsFn,
} from "../../../../Redux/Actions/user/user.action";

import { offset, limit, COUNTRY } from "../../../../Constants/constant";
import EditUserForm from "./editUserForm";
import "../../../../index.css";
import queryString from "query-string";

class EditUser extends Component {
  constructor() {
    super();
    this.state = {
      showAccModal: false,
      user_id: "",
    };
  }

  componentDidMount = () => {
    let { singleKycDataFn } = this.props;
    let { userId } = this.props.match.params;
    this.setState({ user_id: userId });
    singleKycDataFn(userId);
  };

  updateUserInfo = (values) => {
    // alert(JSON.stringify(values));
  };

  pageChange = (e, data) => {
    let page = data.activePage;
    let pageNo = page === 1 ? 0 : (page - 1) * limit;
  };

  getBankAccInfo = () => {
    this.setState({ showAccModal: true });
  };

  confirmAction = (accountId, type, currency) => {
    if (window.confirm("Are you sure want to close this acount?")) {
      // alert("Done");
    }

    this.setState({ showAccModal: false });
  };

  editUserInfo = (values) => {
    this.props.updateUserDetailsFn(values, this.props.history);
  };

  render() {
    let { singleKycData } = this.props;
    return (
      <Container fluid className="px-4">
        <PageTitle title="User Information" subtitle="" />
        <Card>
          <Card.Body>
            <Card.Text>
              <EditUserForm
                handleEditUserForm={this.editUserInfo}
                userInfo={singleKycData != undefined ? singleKycData : {}}
              />
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singleKycData: state.user.singleKycData,
    //singleCustomerData: state.Banking.singleCustomerData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    singleKycDataFn: (data) => dispatch(singleKycDataFn(data)),
    updateUserDetailsFn: (data, history) =>
      dispatch(updateUserDetailsFn(data, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
