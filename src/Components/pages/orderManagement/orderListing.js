import React from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import PageTitle from "../../common/PageTitle";

import {
  getPairListFn,
  depositeFilterDataFn,
} from "../../../Redux/Actions/orders/orders.action";

import { DatePicker } from "rc-datepicker";
import { connect } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import {
  offset,
  limit,
  ORDER_STATUS,
  ORDER_TYPE,
} from "../../../Constants/constant";
import queryString from "query-string";
//import "./Users.css";
import "../../../App.css";

import ImportCsv from "../../../Components/common/common";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      stateCsvData: [],
      totalDataCount: 0,
      enableFilterInput: true,
      stateCsvData: [],
      page: 1,
      coin: "",
      currencyCoins: "",
      currencyType: "",
      filterData: {
        page: 1,
        pagination: 1,
        pair: "",
        search: "",
        status: "",
        type: "",
      },
    };
  }

  componentDidMount = () => {
    let values = queryString.parse(this.props.location.search);
    let { getPairListFn } = this.props;
    let searchedParams = { page: this.state.page };
    getPairListFn();
    // getAllDepositesFn();
  };

  search = () => {};

  clearSearch = () => {
    let data = {
      page: 1,
      pagination: 1,
      search: "",
      status: "",
      type: "",
      pair: "",
    };
    this.props.depositeFilterDataFn(data);
  };

  pageChange = (e, data) => {
    let page = data.activePage;
    let pageNo = page === 1 ? 0 : (page - 1) * limit;

    let searchedParams = { page: page };
    this.props.getUsersFn(searchedParams);
  };

  toggleCalender = () => {
    document.querySelector("#to_calender").style.display = "none";
    let calender = document.querySelector("#calender");
    if (calender.style.display === "none") {
      calender.style.display = "block";
    } else {
      calender.style.display = "none";
    }
  };

  toggleToCalender = () => {
    document.querySelector("#calender").style.display = "none";
    let calender = document.querySelector("#to_calender");
    if (calender.style.display === "none") {
      calender.style.display = "block";
    } else {
      calender.style.display = "none";
    }

    // filter function will be added here
  };

  handleFromByDate = (date) => {
    let from_date = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    this.setState({ fromDate: from_date });

    document.querySelector("#calender").style.display = "none";
    document.getElementById("from_date").value = from_date;
    document.getElementById("from_error").style.display = "none";

    // filter function will be added here
  };

  handleToByDate = (date) => {
    let to_date = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    this.setState({ toDate: to_date });

    document.querySelector("#to_calender").style.display = "none";
    document.getElementById("to_date").value = to_date;
    document.getElementById("to_error").style.display = "none";
    this.getValue(date);
  };

  searchValues = () => {
    let { depositeFilterDataFn } = this.props;
    depositeFilterDataFn(this.state.filterData);
  };

  getValue = (e) => {
    if (e == "") {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  /* 
  
page: 1
pagination: 1
pair: "all"
search: ""
status: ""
type: "buy"
  
  */

  getFilterInputData = (e, type) => {
    let { filterData } = this.state;
    this.setState({
      currencyCoins: e,
      currencyType: e,
    });
    this.getValue(e.target.value);
    //filterData.coin = e.target.value;
    if (type == "pairList") filterData.pair = e.target.value;
    else if (type == "email") filterData.email = e.target.value;
    else if (type == "status") filterData.status = e.target.value;
    else if (type == "type") filterData.type = e.target.value;
    // else if (type == "status") {
    //   if (e.target.value == "") this.getValue(".");
    //   filterData.status = e.target.value;
    // }
    this.setState({ filterData: filterData });
  };

  /* 
  
  Txn ID
Coin
Email ID
Amount
Address from
Date
Action
  
  
  */

  componentWillReceiveProps = (nextProps) => {
    let statementCsvData = [];
    if (
      nextProps.allDeposites !== undefined &&
      nextProps.allDeposites.length > 0
    ) {
      nextProps.allDeposites.map((stateData) => {
        let data = {
          "Txn ID": stateData.tx_id,
          Coin: this.state.coin,
          email: stateData.email,
          Amount: stateData.amount,
          "Address From": stateData.address_from,
          Date: stateData.created_at.split("T")[0],
          Status:
            stateData.status == 1
              ? "Confirmed"
              : stateData.status == 2
              ? "Unconfirmed"
              : stateData.status == 0 && "Pending",
        };

        statementCsvData.push(data);
      });
      this.setState({
        stateCsvData: statementCsvData,
        dataLength: nextProps.customerDataLength,
      });
    }
  };

  render() {
    let { pairListData, activeCoins, allDeposites, orderListData } = this.props;
    let { enableFilterInput } = this.state;
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <PageTitle title="Order-Listing" subtitle="" />
          <div className="box_deco">
            <Row className="withdrw_tran">
              <Col lg={4} md={6} sm={12}>
                <Form.Group>
                  {/* <Form.Label>Kyc status</Form.Label> */}
                  <Form.Control
                    as="select"
                    defaultValue={this.state.currencyCoins}
                    name="coin"
                    id="coin"
                    value={
                      this.state.filterData.pair
                        ? this.state.filterData.pair
                        : "Select Coin<"
                    }
                    onChange={(e) => this.getFilterInputData(e, "pairList")}
                  >
                    {this.state.currencyCoins == "" && (
                      <option className="d-none" value="">
                        Select Coin
                      </option>
                    )}
                    {pairListData != undefined &&
                      pairListData &&
                      pairListData.map((pairList, index) => {
                        return (
                          <option key={index} value={pairList.tarding_pair_key}>
                            {pairList.pair}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col lg={4} md={6} sm={12}>
                <Form.Group>
                  {/* <Form.Label>Kyc status</Form.Label> */}
                  <Form.Control
                    as="select"
                    defaultValue="Status"
                    name="status"
                    id="status"
                    onChange={(e) => this.getFilterInputData(e, "status")}
                  >
                    {this.state.filterData.status == "" && (
                      <option className="d-none" value="">
                        Status
                      </option>
                    )}
                    {ORDER_STATUS.map((status) => {
                      return (
                        <option value={status.value}>{status.name}</option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col lg={4} md={6} sm={12}>
                <Form.Group>
                  {/* <Form.Label>Kyc status</Form.Label> */}
                  <Form.Control
                    as="select"
                    defaultValue="Status"
                    name="status"
                    id="status"
                    onChange={(e) => this.getFilterInputData(e, "type")}
                  >
                    {this.state.filterData.type == "" && (
                      <option className="d-none" value="">
                        Type
                      </option>
                    )}
                    {ORDER_TYPE.map((type, i) => {
                      return (
                        <option key={i} value={type.name}>
                          {type.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col lg={4} md={6} sm={12}>
                <Form.Group className="mb-0">
                  <Form.Control
                    type="search"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => this.getFilterInputData(e, "email")}
                  />
                </Form.Group>
              </Col>

              <Col lg={4} md={6} sm={12} text-nowrap className="text-nowrap">
                <Button
                  variant="primary"
                  type="SUBMIT"
                  disabled={this.state.disabled}
                  onClick={this.searchValues}
                >
                  Search
                </Button>
                <Button
                  variant="danger"
                  className="ml-2"
                  onClick={this.clearSearch}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </div>

          <Row className="mt-4 mb-2">
            <Col></Col>
            <Col style={{ textAlign: "right" }} className="import-btn">
              <ImportCsv
                stateCsvData={this.state.stateCsvData}
                file_name={"Deposite_Transaction"}
              />
            </Col>
          </Row>
          <div className="box_deco">
            <Row className="justify-content-end no-gutters">
              {orderListData != undefined && orderListData.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="pl-3 text-nowrap">Order</th>
                      <th className="pl-3 text-nowrap">
                        Date{""} &{""} Time
                      </th>
                      <th className="pl-3 text-nowrap">Email ID</th>
                      <th className="pl-3 text-nowrap">Pair</th>
                      <th className="pl-3 text-nowrap">Filled</th>
                      <th className="pl-3 text-nowrap">Total Units</th>
                      <th className="pl-3 text-nowrap">Amount/Qty</th>
                      <th className="pl-3 text-nowrap">Price</th>
                      <th className="pl-3 text-nowrap">Excecution Price</th>
                      <th className="pl-3 text-nowrap">Status</th>
                      {/* <th className="pl-3 text-nowrap">Cancel</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {orderListData.map((depositeData) => {
                      return (
                        <tr>
                          <td className="pl-3 text-nowrap">
                            {depositeData.id}
                          </td>
                          <td className="pl-3 text-nowrap">
                            {depositeData?.created_at?.split("T")[0]}
                          </td>
                          <td className="pl-3 text-nowrap">
                            {depositeData.email}
                          </td>
                          <td className="pl-3 text-nowrap">
                            {depositeData.pairKey.toUpperCase()}
                          </td>
                          <td className="pl-3 text-nowrap">
                            {depositeData.filled_amount}
                          </td>
                          <td className="pl-3 text-nowrap">{}</td>
                          <td className="pl-3 text-nowrap">
                            {depositeData.amount}
                          </td>
                          <td className="pl-3 text-nowrap">
                            {depositeData.price}
                          </td>
                          <td className="pl-3 text-nowrap">
                            {depositeData.excuted_price
                              ? depositeData.excuted_price
                              : ""}
                          </td>
                          <td className="pl-3 text-nowrap">
                            {depositeData.status == 1 ? (
                              <p style={{ color: "green" }}>Confirmed</p>
                            ) : depositeData.status == 2 ? (
                              <p style={{ color: "red" }}>Unconfirmed</p>
                            ) : depositeData.status == 0 ? (
                              <p style={{ color: "yellow" }}>Pending</p>
                            ) : depositeData.status == 3 ? (
                              <p style={{ color: "green" }}>Compeleted</p>
                            ) : (
                              ""
                            )}
                          </td>
                          {/* <td className="pl-3 text-nowrap">
                          {depositeData.cancel_at?depositeData.cancel_at?.split("T")[0]:""}
                        </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="pl-3 text-nowrap">Order</th>
                      <th className="pl-3 text-nowrap">
                        {" "}
                        Date{""} &{""} Time
                      </th>
                      <th className="pl-3 text-nowrap">Email ID</th>
                      <th className="pl-3 text-nowrap">Pair</th>
                      <th className="pl-3 text-nowrap">Filled</th>
                      <th className="pl-3 text-nowrap">Total Units</th>
                      <th className="pl-3 text-nowrap">Amount/Qty</th>
                      <th className="pl-3 text-nowrap">Price</th>
                      <th className="pl-3 text-nowrap">Excecution Price</th>
                      <th className="pl-3 text-nowrap">Status</th>
                      {/* <th className="pl-3 text-nowrap">Cancel</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="11" className="text-center">
                        No Record Found
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}
              {/* { totalRecords != undefined && totalRecords > limit &&
            <Pagination
              defaultActivePage={5}
              onPageChange={this.pageChange}
              ellipsisItem={{
                content: <Icon name="ellipsis horizontal" />,
                icon: true,
              }}
              firstItem={{
                content: <Icon name="angle double left" />,
                icon: true,
              }}
              lastItem={{
                content: <Icon name="angle double right" />,
                icon: true,
              }}
              prevItem={{ content: <Icon name="angle left" />, icon: true }}
              nextItem={{ content: <Icon name="angle right" />, icon: true }}
              totalPages={Math.ceil(totalRecords  / limit)}
            />
          } */}
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pairListData: state.orders.pairListData,
    orderListData: state.orders.orderListData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPairListFn: (data) => dispatch(getPairListFn(data)),
    depositeFilterDataFn: (data) => dispatch(depositeFilterDataFn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
