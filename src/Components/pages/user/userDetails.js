import React, { Component, useEffect, useState } from "react";
import PageTitle from "../../../Components/common/PageTitle";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Table,
  Form,
  Button,
  ListGroup,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import {
  statisticsFn,
  downlineFn,
  singleTraderInfoFn,
  usersWithdrawTransFn,
  userBalanceFn,
  addNotesFn,
  usersDepositTransFn,
} from "../../../Redux/Actions/user/user.action";

import {
  activeAllCoinsFn,
  activeFiatCoinsFn,
} from "../../../Redux/Actions/dashboard/dashboard.action";

import { Pagination, Icon, Menu, Input, Segment } from "semantic-ui-react";

import { offset, limit, SMALLEST_UNIT } from "../../../Constants/constant";
import EditUserForm from "./editUserForm";
import "../../../index.css";
import queryString from "query-string";
import AddNotesModal from "./addNotesModal";
import { useHistory, useParams } from "react-router";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { activeCoinsFiatFn } from "../../../Redux/Actions/BuySell/BuySell.action";

function UserDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const userAllBalance = useSelector((state) => state.user.saveUserHistory);

  const [activeItem, setActiveItem] = useState("Personal Details");
  const [singleTraderData, setSingleTraderData] = useState([]);
  const [pageWithdraw, setWithdrawPage] = useState(1);
  const [pageDeposit, setDepositPage] = useState(1);
  const [accountTypeUser, setAccountTypeUser] = useState("");

  const [activeCoins, setActiveCoins] = useState([]);
  const [usersWithdrawData, setUsersWithdrawData] = useState([]);
  const [usersDepositData, setUsersDepositData] = useState([]);

  const [currencyCoins, setCurrencyCoins] = useState("btc");

  const [showNotesModal, setShowNotesModal] = useState(false);
  const [totalRecordsDeposit, setTotalRecordsDeposit] = useState();
  const [totalRecordsWithdraw, setTotalRecordsWithdraw] = useState();

  // constructor() {
  //   super();
  //   this.state = {
  //     showAccModal: false,
  //     traderId: "",
  //     currencyCoins: "",
  //     page: 1,
  //     activeItem: "Personal Details",
  //     showNotesModal: false,
  //     selectedCoins: "Select Coins",
  //   };
  // }

  // componentDidMount = () => {
  //   let {
  //     usersWithdrawTransFn,
  //     statisticsFn,
  //     downlineFn,
  //     singleTraderInfoFn,
  //     activeCoinsFn,
  //     userBalanceFn,
  //   } = this.props;

  //   let traderId = this.props.match.params.traderId;

  //   this.setState({ traderId: traderId });

  //   singleTraderInfoFn(traderId);
  //   activeCoinsFn();

  //   let transParams = {
  //     currency: "btc",
  //     traderID: traderId,
  //     page: this.state.page,
  //   };

  //   usersWithdrawTransFn(transParams);

  //   let userId = {
  //     user_id: traderId,
  //   };

  //   userBalanceFn(userId);
  // };

  useEffect(() => {
    dispatch({ type: types.EMPTY_USER_BAL });

    if (params?.traderId) {
      singleTraderInfo(params?.traderId);
    }
  }, []);

  const singleTraderInfo = (id) => {
    dispatch(singleTraderInfoFn(id)).then((val) => {
      setSingleTraderData(val?.data);
      setAccountTypeUser(val?.data?.account_type);
      if (val?.data?.account_type?.toLocaleLowerCase() == "user") {
        dispatch(activeAllCoinsFn()).then((val) => {
          setActiveCoins(val);
        });
      }
      if (val?.data?.account_type?.toLocaleLowerCase() == "merchant") {
        dispatch(activeFiatCoinsFn()).then((val) => {
          setActiveCoins(val);
        });
      }
    });
  };

  const getUserHistory = () => {
    dispatch({ type: types.EMPTY_USER_BAL });

    activeCoins.forEach((val) => {
      dispatch(userBalanceFn(val, params?.traderId));
    });
  };

  const getUserTransactionsDeposit = () => {
    let transParams = {
      currency: currencyCoins,
      traderID: params?.traderId,
      page: pageDeposit,
    };

    dispatch(usersDepositTransFn(transParams)).then((val) => {
      setUsersDepositData(val.data);
      setTotalRecordsDeposit(val.totalRecords);
    });
  };

  const getUserTransactionsWithdraw = () => {
    let transParams = {
      currency: currencyCoins,
      traderID: params?.traderId,
      page: pageWithdraw,
    };

    dispatch(usersWithdrawTransFn(transParams)).then((val) => {
      setUsersWithdrawData(val.data);
      setTotalRecordsWithdraw(val.totalRecords);
    });
  };

  const updateUserInfo = (values) => {
    // alert(JSON.stringify(values));
  };

  const pageDepositChange = (e, data) => {
    setDepositPage(data.activePage);
  };
  const pageWithdrawChange = (e, data) => {
    setWithdrawPage(data.activePage);
  };

  useEffect(() => {
    getUserTransactionsWithdraw();
  }, [pageWithdraw, currencyCoins]);
  useEffect(() => {
    getUserTransactionsDeposit();
  }, [pageDeposit, currencyCoins]);

  const getBankAccInfo = () => {
    // this.setState({ showAccModal: true });
  };

  const confirmAction = (accountId, type, currency) => {
    if (window.confirm("Are you sure want to close this acount?")) {
      // alert("Done");
    }

    // this.setState({ showAccModal: false });
  };

  const editUserInfo = (values) => {
    // alert(JSON.stringify(values));
  };

  const getValue = (e) => {
    // e.preventDefault();
    setDepositPage(1);
    setWithdrawPage(1);
    setCurrencyCoins(e.target.value);

    // this.props.usersWithdrawTransFn(transParams);
  };

  // useEffect(() => {
  //   getUserTransactionsDeposit();
  //   getUserTransactionsWithdraw();
  // }, [currencyCoins]);

  const handleItemClick = (name) => {
    setActiveItem(name);

    switch (name) {
      case "Personal Details":
        break;
      case "Verification":
        break;
      case "User History":
        getUserHistory();

        break;
      case "User Transactions":
        setCurrencyCoins("btc");
        break;
      case "User Referral":
        getReferalDetails();
        break;

      default:
        return "--";
    }
  };

  const getReferalDetails = () => {
    dispatch(statisticsFn(params?.traderId)).then((val) => {
      // console.log(val);
    });
  };

  const addNotes = (noteData) => {
    let notesParams = {
      member_id: this.state.traderId,
      note: noteData.notes,
    };

    // this.props.addNotesFn(notesParams);
    // this.setState({ showNotesModal: false });
  };
  const onchangeSelectedCoins = () => {
    // this.setState({
    //   selectedCoins: this.state.selectedCoins,
    // });
  };
  const documentsType = (type) => {
    switch (type) {
      case 0:
        return "Passport";
      case 1:
        return "National Identity";
      case 2:
        return "Driving License";
      default:
        return "N/A";
    }
  };

  // render() {
  // let {
  //   statisticsData,
  //   downlineData,
  //   singleTraderData,
  //   usersWithdrawData,
  //   activeCoins,
  //   userAllBalance,
  //   fxtBalance,
  //   ethBalance,
  //   btcBalance,
  //   usdtBalance,
  //   bchBalance,
  // } = this.props;

  // let { activeItem } = this.state;

  // console.log("currency", this.state.currencyCoins);

  return (
    <Container fluid className="px-4">
      <PageTitle title="image/update" subtitle="" />
      <Card>
        <Card.Body>
          <Card.Text>
            <div className="user_detail_flow">
              <Menu pointing className="custom_pointing">
                <Menu.Item
                  name="Personal Details"
                  active={activeItem === "Personal Details"}
                  onClick={() => handleItemClick("Personal Details")}
                />

                <Menu.Item
                  name="Verification"
                  active={activeItem === "Verification"}
                  onClick={() => handleItemClick("Verification")}
                />
                <Menu.Item
                  name="User History"
                  active={activeItem === "User History"}
                  onClick={() => handleItemClick("User History")}
                />
                <Menu.Item
                  name="User Transactions"
                  active={activeItem === "User Transactions"}
                  onClick={() => handleItemClick("User Transactions")}
                />
                {/* <Menu.Item
                  name="User Referral"
                  active={activeItem === "User Referral"}
                  onClick={() => handleItemClick("User Referral")}
                /> */}

                {/* <Menu.Item
                    name="Notes"
                    active={activeItem === "Notes"}
                    onClick={this.handleItemClick}
                  /> */}
              </Menu>

              <Card>
                <Card.Body>
                  {activeItem == "Personal Details" ? (
                    <>
                      {singleTraderData != undefined &&
                      Object.keys(singleTraderData).length > 0 ? (
                        <>
                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">Name</label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>
                                {singleTraderData?.firstname +
                                  " " +
                                  singleTraderData?.lastname}
                              </span>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">Nickname</label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>{singleTraderData?.nickname || "-"}</span>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">
                                Email Address
                              </label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>{singleTraderData?.email}</span>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">
                                Account Type
                              </label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>{singleTraderData?.account_type}</span>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">
                                Date Of Birth
                              </label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>
                                {singleTraderData?.dob?.split("T")[0] || "-"}
                              </span>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">
                                Mobile Number
                              </label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>
                                {singleTraderData?.country_code}{" "}
                                {singleTraderData?.mobile_no || "-"}
                              </span>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">Tax Number</label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>{singleTraderData?.tax_no || "-"}</span>
                            </Col>
                          </Row>

                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">Street</label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>{singleTraderData?.street || "-"}</span>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">State</label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>{singleTraderData?.state || "-"}</span>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">City</label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>{singleTraderData?.city || "-"}</span>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">Country</label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>{singleTraderData?.country_id}</span>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg={6} md={6}>
                              <label class="font-weight-bold">Postal/Zip</label>
                            </Col>
                            <Col lg={6} md={6}>
                              <span>{singleTraderData?.zip || "-"}</span>
                            </Col>
                          </Row>
                        </>
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan="12" className="text-center">
                              No Record Found
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </>
                  ) : activeItem === "Verification" ? (
                    <>
                      <Row className="mb-3">
                        <Col lg={3} md={3}>
                          <label class="font-weight-bold">
                            Mobile Verification
                          </label>
                        </Col>
                        <Col lg={3} md={3}>
                          <label class="font-weight-bold">ID Type</label>
                        </Col>
                        <Col lg={3} md={3}>
                          <label class="font-weight-bold">KYC level 2</label>
                        </Col>
                        <Col lg={3} md={3}>
                          <label class="font-weight-bold">KYC level 3</label>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col lg={3} md={3}>
                          {singleTraderData?.mobile_no_verified === 1
                            ? "Verified"
                            : "Not Verified"}
                        </Col>
                        <Col lg={3} md={3}>
                          {documentsType(singleTraderData?.documents[0]?.type)}
                        </Col>
                        <Col lg={3} md={3}>
                          {singleTraderData?.kyc_level == 4 ||
                          singleTraderData?.status == 1
                            ? "Verified"
                            : "Not Verified"}
                        </Col>
                        <Col lg={3} md={3}>
                          {singleTraderData?.kyc_level == 4 &&
                          singleTraderData?.status == 1
                            ? "Verified"
                            : "Not Verified"}
                        </Col>
                      </Row>

                      {/* {singleTraderData?.status === null
                        ? "N/A"
                        : singleTraderData?.documents.length > 0
                        ? singleTraderData?.documents?.map((item) => (
                            <Row className="mb-3">
                              <Col lg={6} md={6}>
                                {documentsType(item?.type)}
                              </Col>
                              <Col lg={6} md={6}>
                                {verifcationStatus(item?.type)}
                              </Col>
                            </Row>
                          ))
                        : "No record found"} */}
                    </>
                  ) : activeItem == "User History" ? (
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>Currency</th>
                          {accountTypeUser.toLowerCase() == "user" && (
                            <th>Total Deposit</th>
                          )}
                          <th>Total Withdraw</th>
                          <th>Balance</th>
                          <th>Locked Balance</th>
                        </tr>
                      </thead>
                      {userAllBalance.length ? (
                        userAllBalance &&
                        userAllBalance.map((bal, index) => {
                          return (
                            <tbody>
                              <tr>
                                <td>{bal?.coin?.toUpperCase()}</td>
                                {accountTypeUser.toLowerCase() == "user" && (
                                  <td>
                                    {bal?.data?.data[0]?.totalDeposits /
                                      SMALLEST_UNIT || 0}
                                  </td>
                                )}

                                <td>
                                  {bal?.data?.data[0]?.totalWithdraws /
                                    SMALLEST_UNIT || 0}{" "}
                                </td>
                                <td>
                                  {bal?.data?.data[0]?.balance /
                                    SMALLEST_UNIT || 0}
                                </td>
                                <td>
                                  {bal?.data?.data[0]?.locked_balance /
                                    SMALLEST_UNIT || 0}
                                </td>
                              </tr>
                            </tbody>
                          );
                        })
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan="12" className="text-center">
                              No Record Found
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </Table>
                  ) : activeItem == "User Transactions" ? (
                    <>
                      <Row>
                        <Col xl={4} md={6}>
                          <Form.Group>
                            {/* <Form.Label>Kyc status</Form.Label> */}
                            <Form.Control
                              as="select"
                              value={currencyCoins}
                              id="kycStatus"
                              onChange={(e) => getValue(e)}
                            >
                              {activeCoins.map((coins, index) => (
                                <option key={index} value={coins}>
                                  {coins.toUpperCase()}
                                </option>
                              ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col>
                          <h4>Withdraw</h4>
                        </Col>
                      </Row>
                      {usersWithdrawData != undefined &&
                      usersWithdrawData.length > 0 ? (
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th>Txid</th>
                              {accountTypeUser.toLowerCase() === "user" && (
                                <th>Address To</th>
                              )}
                              {accountTypeUser.toLowerCase() === "merchant" && (
                                <th>Account No</th>
                              )}

                              <th>Amount</th>
                              <th>Fee</th>
                              <th>Created Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>

                          <tbody>
                            {usersWithdrawData.map((withdarwData, i) => (
                              <tr>
                                <td className="pl-3 text-nowrap">
                                  {(withdarwData?.tx_id?.length &&
                                    withdarwData?.tx_id?.slice(0, 15) +
                                      "...") ||
                                    "-"}
                                </td>

                                {accountTypeUser.toLowerCase() === "user" && (
                                  <td className="pl-3 text-nowrap">
                                    {(withdarwData?.to_address?.length &&
                                      withdarwData?.to_address?.slice(0, 15) +
                                        "...") ||
                                      "-"}
                                  </td>
                                )}

                                {withdarwData?.account_number != null &&
                                  withdarwData?.account_number != "" &&
                                  accountTypeUser.toLowerCase() ===
                                    "merchant" && (
                                    <td className="pl-3 text-nowrap">
                                      {(withdarwData?.account_number?.length &&
                                        withdarwData?.account_number?.slice(
                                          0,
                                          15
                                        ) + "...") ||
                                        "-"}
                                    </td>
                                  )}

                                <td className="pl-3 text-nowrap">
                                  {withdarwData.amount / SMALLEST_UNIT}
                                </td>
                                <td className="pl-3 text-nowrap">
                                  {withdarwData.fee / SMALLEST_UNIT}
                                </td>

                                <td className="pl-3 text-nowrap">
                                  {withdarwData?.created_at?.split("T")[0]}
                                </td>
                                <td className="pl-3 text-nowrap">
                                  {withdarwData.status == 1 ? (
                                    <p style={{ color: "yellow" }}>
                                      UNCONFIRMED
                                    </p>
                                  ) : withdarwData.status == 2 ? (
                                    <p style={{ color: "green" }}>CONFIRMED</p>
                                  ) : withdarwData.status == 3 ? (
                                    <p style={{ color: "red" }}>DECLINED </p>
                                  ) : withdarwData.status == 4 ? (
                                    <p style={{ color: "red" }}>FAILED </p>
                                  ) : withdarwData.status == 0 ? (
                                    <p>Pending</p>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      ) : (
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th>Txid</th>
                              {accountTypeUser.toLowerCase() === "user" && (
                                <th>Address To</th>
                              )}
                              {accountTypeUser.toLowerCase() === "merchant" && (
                                <th>Account No</th>
                              )}
                              <th>Amount</th>
                              <th>Fee</th>
                              <th>Created date</th>
                              <th>Status</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td colSpan="7" className="text-center">
                                No Record Found
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      )}
                      {totalRecordsWithdraw != undefined &&
                        totalRecordsWithdraw > limit && (
                          <Pagination
                            activePage={pageWithdraw}
                            onPageChange={(e, data) =>
                              pageWithdrawChange(e, data)
                            }
                            firstItem={{
                              content: <Icon name="angle double left" />,
                              icon: true,
                            }}
                            lastItem={{
                              content: <Icon name="angle double right" />,
                              icon: true,
                            }}
                            prevItem={{
                              content: <Icon name="angle left" />,
                              icon: true,
                            }}
                            nextItem={{
                              content: <Icon name="angle right" />,
                              icon: true,
                            }}
                            totalPages={Math.ceil(totalRecordsWithdraw / limit)}
                          />
                        )}

                      {accountTypeUser.toLowerCase() == "user" && (
                        <Row>
                          <Col>
                            <h4>Deposit</h4>
                          </Col>
                        </Row>
                      )}

                      {
                        usersDepositData !== undefined &&
                          accountTypeUser.toLowerCase() === "user" && (
                            <Table striped bordered hover responsive>
                              <thead>
                                <tr>
                                  <th>Txid</th>
                                  <th>Address from</th>
                                  <th>Amount</th>
                                  <th>Type</th>
                                  <th>Created date</th>
                                  <th>Status</th>
                                </tr>
                              </thead>

                              {usersDepositData.length > 1 && (
                                <tbody>
                                  {usersDepositData.map((depositData, i) => (
                                    <tr>
                                      <td className="pl-3 text-nowrap">
                                        {(depositData?.tx_id?.length &&
                                          depositData?.tx_id?.slice(0, 15) +
                                            "...") ||
                                          "-"}
                                      </td>

                                      <td className="pl-3 text-nowrap">
                                        {(depositData?.address_from?.length &&
                                          depositData?.address_from?.slice(
                                            0,
                                            15
                                          ) + "...") ||
                                          "-"}
                                      </td>

                                      <td className="pl-3 text-nowrap">
                                        {depositData.amount / SMALLEST_UNIT}
                                      </td>
                                      <td className="pl-3 text-nowrap">
                                        {"Deposit"}
                                      </td>

                                      <td className="pl-3 text-nowrap">
                                        {depositData?.created_at?.split("T")[0]}
                                      </td>
                                      <td className="pl-3 text-nowrap">
                                        {depositData.status == 1 ? (
                                          <p style={{ color: "yellow" }}>
                                            UNCONFIRMED
                                          </p>
                                        ) : depositData.status == 2 ? (
                                          <p style={{ color: "green" }}>
                                            CONFIRMED
                                          </p>
                                        ) : depositData.status == 3 ? (
                                          <p style={{ color: "red" }}>
                                            DECLINED{" "}
                                          </p>
                                        ) : depositData.status == 4 ? (
                                          <p style={{ color: "red" }}>
                                            FAILED{" "}
                                          </p>
                                        ) : depositData.status == 0 ? (
                                          <p>Pending</p>
                                        ) : (
                                          ""
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              )}

                              {usersDepositData.length === 0 && (
                                <tbody>
                                  <tr>
                                    <td colSpan="7" className="text-center">
                                      No Record Found
                                    </td>
                                  </tr>
                                </tbody>
                              )}
                            </Table>
                          )
                        //  :
                        // (
                        //   <Table striped bordered hover responsive>
                        //     <thead>
                        //       <tr>
                        //         <th>Txid</th>
                        //         <th>Address from</th>
                        //         <th>Amount</th>
                        //         <th>Type</th>
                        //         <th>Created date</th>
                        //         <th>Status</th>
                        //       </tr>
                        //     </thead>

                        //     <tbody>
                        //       <tr>
                        //         <td colSpan="7" className="text-center">
                        //           No Record Found
                        //         </td>
                        //       </tr>
                        //     </tbody>
                        //   </Table>
                        // )
                      }

                      {totalRecordsDeposit != undefined &&
                        accountTypeUser.toLowerCase() == "user" &&
                        totalRecordsDeposit > limit && (
                          <Pagination
                            activePage={pageDeposit}
                            onPageChange={(e, data) =>
                              pageDepositChange(e, data)
                            }
                            firstItem={{
                              content: <Icon name="angle double left" />,
                              icon: true,
                            }}
                            lastItem={{
                              content: <Icon name="angle double right" />,
                              icon: true,
                            }}
                            prevItem={{
                              content: <Icon name="angle left" />,
                              icon: true,
                            }}
                            nextItem={{
                              content: <Icon name="angle right" />,
                              icon: true,
                            }}
                            totalPages={Math.ceil(totalRecordsDeposit / limit)}
                          />
                        )}

                      <br />
                    </>
                  ) : activeItem == "User Referral" ? (
                    <>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>Level</th>
                            <th>Email Address</th>
                            <th>KYC Status</th>
                            <th>amount</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Record Found
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  ) : (
                    activeItem == "Notes" && (
                      <>
                        <Row>
                          <Col>
                            <Button
                              varient="primary"
                              onClick={() => setShowNotesModal(true)}
                            >
                              Add Notes
                            </Button>
                          </Col>
                        </Row>
                        <br />
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th>Notes</th>
                              <th>Created At</th>
                              <th>Updated At</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td colSpan="4" className="text-center">
                                No Record Found
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </>
                    )
                  )}
                </Card.Body>
              </Card>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <AddNotesModal
        show={showNotesModal}
        closeModal={() => setShowNotesModal(false)}
        handleNotesForm={addNotes}
      />
      <br />
    </Container>
  );
  // }
}

// const mapStateToProps = (state) => {
//   return {
//     statisticsData: state.user.statisticsData,
//     downlineData: state.user.downlineData,
//     singleTraderData: state.user.singleTraderData,
//     usersWithdrawData: state.user.usersWithdrawData,
//     activeCoins: state.dashboard.activeCoins,

//     fxtBalance: state.user.fxtBalance,
//     ethBalance: state.user.ethBalance ? state.user.ethBalance : 0,
//     btcBalance: state.user.btcBalance ? state.user.btcBalance : 0,
//     usdtBalance: state.user.usdtBalance ? state.user.usdtBalance : 0,
//     bchBalance: state.user.bchBalance,
//     userAllBalance: state.user.userAllBalance,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     usersWithdrawTransFn: (data) => dispatch(usersWithdrawTransFn(data)),
//     statisticsFn: (data) => dispatch(statisticsFn(data)),
//     downlineFn: (data) => dispatch(downlineFn(data)),
//     singleTraderInfoFn: (data) => dispatch(singleTraderInfoFn(data)),
//     activeCoinsFn: (data) => dispatch(activeCoinsFn(data)),
//     userBalanceFn: (data) => dispatch(userBalanceFn(data)),
//     addNotesFn: (data) => dispatch(addNotesFn(data)),
//   };
// };

export default UserDetails;
