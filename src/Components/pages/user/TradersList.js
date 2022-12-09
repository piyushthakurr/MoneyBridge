import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import { Form, Table, Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { COUNTRY, limit, offset } from "../../../Constants/constant";
import { getUsersFn } from "../../../Redux/Actions/user/user.action";
import PageTitle from "../../common/PageTitle";
import { Link } from "react-router-dom";
import { Icon, PaginationItem } from "semantic-ui-react";
import ImportCsv from "../../common/common";
import dateFormat from "dateformat";
import FilterForm from "../../common/FilterForm";
import "./Users.css";
import "../../../App.css";
export default function TradersList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [fromDate, setfromDate] = useState();
  const [toDate, settoDate] = useState();
  const [usersList, setUserList] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [totalRecords, settotalRecords] = useState();

  const fetchTradersList = (val) => {
    let data = {
      page: page,
      fromDate: val?.fromDate,
      toDate: val?.toDate,
      email: val?.email,
      country: val?.country,
    };
    dispatch(getUsersFn(data)).then((res) => {
      setUserList(res.listing);
      settotalRecords(res.totalRecords);
    });
  };

  const searchValues = () => {
    let { filterUsersFn } = this.props;

    let searchedData = {
      country: this.state.country,
      email: this.state.email,
      fromDate: this.state.fromDate
        ? dateFormat(this.state.fromDate, "yyyy-mm-dd")
        : "",
      offset: offset,
      page: this.state.page,
      toDate: this.state.toDate
        ? dateFormat(this.state.toDate, "yyyy-mm-dd")
        : "",
    };

    filterUsersFn(searchedData);
  };

  useEffect(() => {
    fetchTradersList();
  }, []);

  const handleFilterSubmit = (val) => {
    fetchTradersList(val);
  };
  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}

        <PageTitle title="Traders" subtitle="" />
        <div className="users_row">
          <FilterForm FilterSubmit={handleFilterSubmit} />

          <Row>
            <Col lg={3} md={6}>
              <Form.Group>
                <Form.Control
                  type="search"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col lg={3} md={6}>
              <Form.Group>
                {/* <Form.Label>Kyc status</Form.Label> */}
                <Form.Control
                  as="select"
                  defaultValue="All KYC Status"
                  name="kyc_status"
                  id="kycStatus"
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option className="d-none">Select Countries</option>
                  {COUNTRY.map((coutries) => {
                    return (
                      <option value={coutries.name}>{coutries.name}</option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col lg={3} md={6} style={{ position: "relative" }}>
              <DatePicker
                className="form-control"
                selected={fromDate ? fromDate : ""}
                placeholderText="DD/MM/YYYY"
                onChange={(e) => setfromDate(e)}
              />
            </Col>
            <Col lg={3} md={6} style={{ position: "relative" }}>
              <DatePicker
                className="form-control mb-2"
                selected={toDate ? toDate : ""}
                placeholderText="DD/MM/YYYY"
                onChange={(e) => settoDate(e)}
              />
            </Col>
            <Col xl={2} sm={4} xs={12} text-nowrap className="text-nowrap">
              <Button
                variant="primary"
                type="SUBMIT"
                onClick={() => fetchTradersList()}
              >
                Search
              </Button>{" "}
              {""}
              <Button
                className="ml-2 yl-btn"
                // onClick={this.clearSearch}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </div>
        <Row className="mt-4 mb-2">
          <Col></Col>
          <Col lg={6} style={{ textAlign: "right" }} className="import-btn">
            <ImportCsv
              // stateCsvData={this.state.stateCsvData}
              file_name={"Traders"}
            />
          </Col>
        </Row>
        <div className="users_row">
          <Row className="justify-content-end bg-white row no-gutters">
            {usersList != undefined && usersList.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">User ID</th>
                    <th className="pl-3 text-nowrap">Name</th>
                    <th className="pl-3 text-nowrap">Email Address</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((userData) => {
                    let userId = userData.users_id.split("-")[0];
                    return (
                      <tr>
                        <td className="pl-3 text-nowrap">{userId}....</td>
                        <td className="pl-3 text-nowrap">
                          {userData.firstname ? (
                            <Link to={`/auth/trader-view/${userData.users_id}`}>
                              {userData.firstname}
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </td>

                        <td className="pl-3 text-nowrap">
                          <Link to={`/auth/trader-view/${userData.users_id}`}>
                            {userData.email ? userData.email : "N/A"}
                          </Link>
                        </td>
                        {/* <td className="pl-3 text-nowrap">
                    <Button
                      primary
                      disabled
                      variant="success"
                      style={{ margin: "5px" }}
                    >
                      Verified
                    </Button>
                  </td> */}

                        <td className="pl-3 text-nowrap d-flex align-items-center inner_btn">
                          <Link to={`/auth/trader-view/${userData.users_id}`}>
                            {/* <Icon style={{ color: '#429af9' }} name="eye" />{' '} */}
                            <button className="btn-warning btn">View</button>
                          </Link>
                          {userData.user_status == 2 ? (
                            <>
                              <Button
                                className="mx-3"
                                variant="success"
                                onClick={() =>
                                  this.userAction("unlock", userData.users_id)
                                }
                              >
                                UnLock
                              </Button>{" "}
                            </>
                          ) : (
                            <>
                              <Button
                                variant="danger"
                                className="mx-3"
                                onClick={() =>
                                  this.userAction("suspend", userData.users_id)
                                }
                              >
                                Lock
                              </Button>{" "}
                            </>
                          )}
                          <Button
                            variant="info"
                            onClick={() => this.sendAuthKey(userData.users_id)}
                            disabled={
                              userData.google_auth_active == 0 ? true : false
                            }
                          >
                            Send Auth Key
                          </Button>{" "}
                          {userData.is_trade_enabled == 1 ? (
                            <>
                              <Button
                                variant="danger"
                                className="mx-3"
                                onClick={() =>
                                  this.userAction(
                                    "disableTrade",
                                    userData.users_id
                                  )
                                }
                              >
                                disable trade
                              </Button>{" "}
                            </>
                          ) : (
                            <>
                              <Button
                                variant="success"
                                className="mx-3"
                                onClick={() =>
                                  this.userAction(
                                    "enableTrade",
                                    userData.users_id
                                  )
                                }
                              >
                                enable trade
                              </Button>{" "}
                            </>
                          )}
                          <br />
                          <br />
                          {userData.is_market_maker == 0 ? (
                            <>
                              <Button
                                variant="success"
                                onClick={() =>
                                  this.userAction(
                                    "enablemarketmaker",
                                    userData.users_id
                                  )
                                }
                              >
                                enable Market maker
                              </Button>{" "}
                            </>
                          ) : (
                            <>
                              <Button
                                variant="danger"
                                onClick={() =>
                                  this.userAction(
                                    "disablemarketmaker",
                                    userData.users_id
                                  )
                                }
                              >
                                disable Market maker
                              </Button>{" "}
                            </>
                          )}
                          {/* | */}
                          {/* <Button
                            variant="success"
                            onClick={() =>
                              this.userAction('enableSwap', userData.users_id)
                            }
                          >
                            ENABLE SWAP
                          </Button>{' '}
                          |
                          <Button
                            variant="success"
                            onClick={() =>
                              this.userAction('enableBundle', userData.users_id)
                            }
                          >
                            ENABLE BUNDLE
                          </Button>{' '} */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">User ID</th>
                    <th className="pl-3 text-nowrap">First Name</th>
                    <th className="pl-3 text-nowrap">Last Name</th>
                    <th className="pl-3 text-nowrap">Email Address</th>
                    <th className="pl-3 text-nowrap">User Type</th>
                    <th className="pl-3 text-nowrap">KYC Status</th>
                    <th className="pl-3 text-nowrap">Created At</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <p>No Record Found</p>
                </tbody>
              </Table>
            )}

            <PaginationItem
              defaultActivePage={3}
              // onPageChange={this.pageChange}
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
              totalPages={Math.ceil(totalRecords / limit)}
            />
          </Row>
        </div>
      </Container>
    </div>
  );
}
