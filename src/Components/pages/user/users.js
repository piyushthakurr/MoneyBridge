import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Pagination, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PageTitle from "../../common/PageTitle";
import dateFormat from "dateformat";
import {
  userActionFn,
  sendAuthKeyFn,
  searchUsersFn,
} from "../../../Redux/Actions/user/user.action";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import { limit, COUNTRY, userAccountType } from "../../../Constants/constant";
import "./Users.css";
import "../../../App.css";

import ImportCsv from "../../common/common";
import { toast } from "../../Toast/toast.component";

function Users() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [usersList, setUserList] = useState();
  const [totalRecords, settotalRecords] = useState();
  const [filterData, setFilterData] = useState({});
  const [StateCsvData, setStateCsvData] = useState();

  const fetchTradersList = () => {
    let data = {
      page: page,
      fromDate: filterData.fromDate
        ? dateFormat(filterData.fromDate, "yyyy-mm-dd")
        : "",
      toDate: filterData.toDate
        ? dateFormat(filterData.toDate, "yyyy-mm-dd")
        : "",
      email: filterData.email ? filterData.email : "",
      user_type: filterData.userType ? filterData.userType : "",
      country: filterData.country ? filterData.country : "",
    };

    dispatch(searchUsersFn(data)).then((res) => {
      setUserList(res.listing);
      settotalRecords(res.totalRecords);

      if (res.listing !== undefined && res.listing.length > 0) {
        let statementCsvData = [];
        res.listing.map((stateData) => {
          let data = {
            "User Id": stateData.users_id != null ? stateData?.users_id : "N/A",
            Name:
              stateData.firstname != null
                ? stateData?.firstname + " " + stateData?.lastname
                : "N/A",
            email: stateData.email != null ? stateData.email : "N/A",
            "user Type":
              stateData.account_type != null ? stateData.account_type : "N/A",
          };
          statementCsvData.push(data);
        });
        setStateCsvData(statementCsvData);
      }
    });
  };

  const checkEmailValidaton = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(String(email).toLowerCase());
  };

  const userAction = (action, id) => {
    let data = {
      action: action,
      id: id,
    };

    dispatch(userActionFn(data)).then(() => {
      fetchTradersList();
    });
  };

  const sendAuthKey = (id) => {
    dispatch(sendAuthKeyFn(id)).then(() => {
      fetchTradersList();
    });
  };

  const getFilterInputData = (e, type) => {
    let filterDatas = { ...filterData };
    if (type === "country") {
      filterDatas.country = e.target.value;
    } else if (type == "userType") {
      filterDatas.userType = e.target.value;
    } else if (type === "email") {
      filterDatas.email = e.target.value;
    } else if (type === "fromDate") {
      filterDatas["fromDate"] = e;
    } else if (type === "toDate") {
      filterDatas["toDate"] = e;
    }
    setFilterData(filterDatas);
  };

  const clearSearch = () => {
    setPage(1);
    setFilterData({});
  };

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  // const sendAuthKey = (id) => {
  //   let { sendAuthKeyFn } = props;
  //   let getUsersParams = {
  //     page: state.page,
  //   };

  //   sendAuthKeyFn(id).then(() => {
  //     getUsersFn(getUsersParams);
  //   });
  // };

  const searchValues = () => {
    if (filterData.email != "" && filterData.email != undefined) {
      if (!checkEmailValidaton(filterData.email)) {
        return toast.error("You have entered an invalid email address!");
      }
    }

    fetchTradersList();
  };

  useEffect(() => {
    fetchTradersList();
  }, [page]);

  useEffect(() => {
    if (Object.keys(filterData).length == 0) {
      fetchTradersList();
    }
  }, [filterData]);

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Traders" subtitle="" />

        <Card className="mb-4">
          <Card.Body>
            <Row className="mb-3">
              <Col lg={3} md={6}>
                <Label>Email</Label>
                <Form.Group>
                  <Form.Control
                    type="search"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={filterData?.email ? filterData?.email : ""}
                    onChange={(e) => getFilterInputData(e, "email")}
                  />
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Label>Account Type</Label>

                <Form.Group>
                  {/* <Form.Label>Kyc status</Form.Label> */}
                  <Form.Control
                    as="select"
                    defaultValue="All Countries"
                    name="userType"
                    id="userType"
                    value={filterData?.userType ? filterData?.userType : ""}
                    onChange={(e) => getFilterInputData(e, "userType")}
                  >
                    <option className="d-none">Select Account Type</option>
                    {userAccountType.map((userType) => {
                      return (
                        <option value={userType.value}>{userType.name}</option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col lg={3} md={6}>
                <Label>Country</Label>

                <Form.Group>
                  {/* <Form.Label>Kyc status</Form.Label> */}
                  <Form.Control
                    as="select"
                    defaultValue="All Countries"
                    name="country"
                    id="country"
                    value={filterData?.country ? filterData?.country : ""}
                    onChange={(e) => getFilterInputData(e, "country")}
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
                <Label>From Date</Label>

                <DatePicker
                  className="form-control"
                  placeholderText="DD/MM/YYYY"
                  selected={filterData?.fromDate ? filterData?.fromDate : ""}
                  onChange={(e) => getFilterInputData(e, "fromDate")}
                />
              </Col>
              <Col
                lg={3}
                md={6}
                style={{ position: "relative", marginTop: "20px" }}
              >
                <Label>To Date</Label>

                <DatePicker
                  className="form-control mb-2"
                  placeholderText="DD/MM/YYYY"
                  selected={filterData?.toDate ? filterData?.toDate : ""}
                  onChange={(e) => getFilterInputData(e, "toDate")}
                />
              </Col>
            </Row>
            <Row>
              <Col xl={2} sm={4} xs={12} text-nowrap className="text-nowrap">
                <Button
                  variant="primary"
                  type="SUBMIT"
                  onClick={() => searchValues()}
                >
                  Search
                </Button>{" "}
                <Button className="ml-2 yl-btn" onClick={() => clearSearch()}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <ImportCsv stateCsvData={StateCsvData} file_name={"Traders"} />
        <Card>
          <Card.Body>
            {usersList != undefined && usersList.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">User ID</th>
                    <th className="pl-3 text-nowrap">Name</th>
                    <th className="pl-3 text-nowrap">Email Address</th>
                    <th className="pl-3 text-nowrap">Account Type</th>

                    <th className="pl-3 text-nowrap">Country</th>

                    <th>Date</th>
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

                        <td className="pl-3 text-nowrap">
                          <Link to={`/auth/trader-view/${userData.users_id}`}>
                            {userData.account_type
                              ? userData.account_type
                              : "N/A"}
                          </Link>
                        </td>

                        <td className="pl-3 text-nowrap">
                          <Link to={`/auth/trader-view/${userData.users_id}`}>
                            {userData.country_id ? userData.country_id : "N/A"}
                          </Link>
                        </td>

                        <td className="pl-3 text-nowrap">
                          <Link to={`/auth/trader-view/${userData.users_id}`}>
                            {userData?.created_at
                              ? userData?.created_at.split("T")[0]
                              : "N/A"}
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

                        <td className="pl-3 text-nowrap d-flex align-items-center inner_btn edit_icon">
                          <Link
                            className="view"
                            to={`/auth/trader-view/${userData.users_id}`}
                          >
                            {/* <Icon style={{ color: '#429af9' }} name="eye" />{' '} */}
                            <Icon name="eye" />
                          </Link>
                          {userData.user_status == 2 ? (
                            <>
                              <a
                                className="view"
                                onClick={() =>
                                  userAction("unlock", userData.users_id)
                                }
                              >
                                <Icon name="unlock" />
                              </a>{" "}
                            </>
                          ) : (
                            <>
                              <a
                                className="view"
                                onClick={() =>
                                  userAction("suspend", userData.users_id)
                                }
                              >
                                <Icon name="lock" />
                              </a>{" "}
                            </>
                          )}
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
                    <th className="pl-3 text-nowrap">Name</th>
                    <th className="pl-3 text-nowrap">Email Address</th>
                    <th className="pl-3 text-nowrap">Account Type</th>

                    <th className="pl-3 text-nowrap">Country</th>

                    <th>Date</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <p>No Record Found</p>
                </tbody>
              </Table>
            )}

            {totalRecords !== undefined && totalRecords > limit && (
              <Pagination
                activePage={page}
                onPageChange={(e, data) => pageChange(e, data)}
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
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
  // }
}

export default Users;
