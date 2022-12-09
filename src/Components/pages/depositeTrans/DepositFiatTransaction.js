import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Button,
  Dropdown,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import PageTitle from "../../common/PageTitle";
import dateFormat from "dateformat";
import { activeCoinsFn } from "../../../Redux/Actions/dashboard/dashboard.action";

import {
  getAllDepositesFn,
  depositeFilterDataFn,
  depositeFiatDataFn,
  applypermissionRequestFn,
} from "../../../Redux/Actions/DepositeTrans/deposite.action";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch, useSelector } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import {
  offset,
  limit,
  USER_TYPE,
  COUNTRY,
  DEPOSITE_STATUS,
  SMALLEST_UNIT,
} from "../../../Constants/constant";
import queryString from "query-string";
//import "./Users.css";
import "../../../App.css";

import ImportCsv from "../../../Components/common/common";
import { activeCoinsFiatFn } from "../../../Redux/Actions/BuySell/BuySell.action";

function DepositFiatTransactions() {
  const getSubadminDetails = useSelector((state) => state.profile.twoFaDetails);

  const dispatch = useDispatch();
  const [stateCsvData, setStateCsvData] = useState();
  const [page, setPage] = useState(1);
  const [allDeposites, setAllDeposites] = useState([]);
  const [activeCoins, setActiveCoins] = useState();
  const [filterData, setFilterData] = useState();
  const [totalRecords, setTotalRecords] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const [actiontype, setActionType] = useState();
  const [approveRequestHandle, setApproveRequestHandle] = useState();

  useEffect(() => {
    let subAdminCountry = getSubadminDetails.country;
    let filtrCountry = COUNTRY.filter((val) => val.name === subAdminCountry);
    if (filtrCountry[0]?.currSymbol) {
      setFilterData({ coin: filtrCountry[0]?.currSymbol });
    } else {
      setFilterData({ coin: "usd" });
    }

    dispatch(activeCoinsFiatFn()).then((val) => {
      setActiveCoins(val.data);
    });
  }, []);

  useEffect(() => {
    if (filterData?.coin) getDepositTransactions();
  }, [page, filterData?.coin]);

  const getDepositTransactions = () => {
    let data = {
      status: filterData?.status || "0",
    };
    let coin = filterData?.coin || "usd";

    dispatch(depositeFiatDataFn(filterData?.coin || "usd", page, data)).then(
      (val) => {
        let newArr = val.data;
        newArr.forEach((element) => {
          element["value"] = 0;
        });
        setAllDeposites(newArr);
        setTotalRecords(val.totalRecords);

        let statementCsvData = [];
        if (val.data !== undefined && val.data.length > 0) {
          val.data.map((stateData) => {
            let data = {
              "Transaction Id": stateData?.tx_id ? stateData?.tx_id : "N/A",
              Email: stateData?.email ? stateData?.email : "N/A",
              Coin: filterData?.coin ? filterData?.coin : "BTC",
              Amount: stateData?.amount / SMALLEST_UNIT || 0,
              Fee:
                stateData?.fee && stateData.extra_fee
                  ? calcFee(
                      stateData?.fee / SMALLEST_UNIT,
                      stateData?.extra_fee / SMALLEST_UNIT
                    )
                  : 0,
              "Account Number": stateData?.account_number || "-",
              "Payment Type": stateData?.payment_mode_name || "-",
              Date: stateData?.created_at.split("T")[0] || "-",
              Status:
                stateData?.status === 1
                  ? "UNCONFIRMED"
                  : stateData?.status === 2
                  ? "CONFIRMED"
                  : stateData?.status === 3
                  ? "DECLINED"
                  : stateData?.status === 4
                  ? "FAILED"
                  : "Pending",
            };
            statementCsvData.push(data);
          });
          setStateCsvData(statementCsvData);
        }
      }
    );
  };

  const openModal = (type, itemData, index) => {
    filterData["reason"] = "";
    let actualArray = [...allDeposites];
    if (type === "approve") {
      actualArray[index].value = "1";
    } else {
      actualArray[index].value = "2";
    }
    setActionType(type);
    setApproveRequestHandle(itemData);
    setUpdateModal(true);
  };

  const approveOrDisapprove = () => {
    let applypermission = {
      id: approveRequestHandle.fiat_deposit_id,
      action: actiontype,
      amount: approveRequestHandle.amount,
      symbol: filterData?.coin || "usd",
      email: approveRequestHandle.email,
      reason: filterData?.reason,
    };

    dispatch(
      applypermissionRequestFn(
        filterData?.coin || "usd",
        applypermission.id,
        applypermission
      )
    ).then(
      (res) => {
        setUpdateModal(false);
        getDepositTransactions();
      },
      (error) => {
        setActionType("");
        getDepositTransactions();
      }
    );
  };

  const clearSearch = () => {
    setPage(1);
    setFilterData({});
  };

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  const searchValues = () => {
    setPage(1);
    getDepositTransactions();
  };

  const getFilterInputData = (e, type) => {
    let filterDatas = { ...filterData };

    if (type == "coin") {
      setPage(1);
      filterDatas.coin = e.target.value;
    } else if (type == "status") {
      filterDatas.status = e.target.value;
    } else if (type == "reason") {
      filterDatas.reason = e.target.value;
    }

    setFilterData(filterDatas);
  };

  const calculateTotal = (amt, fee) => {
    return (parseFloat(amt) - parseFloat(fee)).toFixed(2);
  };
  const calcFee = (a, b) => {
    return (parseFloat(a) + parseFloat(b)).toFixed(2);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Deposit Transaction" subtitle="" />
        <div className="box_deco">
          <Row className="withdrw_srch">
            <Col lg={4} md={6} sm={12}>
              <Form.Group>
                <Form.Control
                  as="select"
                  name="coin"
                  id="coin"
                  value={filterData?.coin}
                  onChange={(e) => getFilterInputData(e, "coin")}
                >
                  {/* <option className="d-none" value="">
                    All Coin
                  </option> */}

                  {activeCoins != undefined &&
                    activeCoins &&
                    activeCoins.map((coins, index) => {
                      return (
                        <option value={coins?.fixer_symbol?.toLowerCase()}>
                          {coins.fixer_symbol}
                        </option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col lg={4} md={6} sm={12}>
              <Form.Group>
                <Form.Control
                  as="select"
                  defaultValue="Status"
                  name="status"
                  id="status"
                  value={filterData?.status || "0"}
                  onChange={(e) => getFilterInputData(e, "status")}
                  // disabled={enableFilterInput}
                >
                  {/* <option value={""} selected>
                    All
                  </option> */}
                  {DEPOSITE_STATUS.map((status) => {
                    return <option value={status.value}>{status.name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col lg={4} md={6} sm={12} text-nowrap className="text-nowrap">
              <Button
                variant="primary"
                type="submit"
                // disabled={disabled}
                onClick={() => searchValues()}
              >
                Search
              </Button>{" "}
              <Button variant="danger" className="ml-2" onClick={clearSearch}>
                Reset
              </Button>
            </Col>
          </Row>
        </div>

        <Row className="mt-4 mb-2">
          <Col></Col>
          <Col style={{ textAlign: "right" }} className="import-btn">
            <ImportCsv
              stateCsvData={stateCsvData}
              file_name={"Deposite_Transaction_Fiat"}
            />
          </Col>
        </Row>
        <div className="box_deco">
          <Row className="justify-content-end no-gutters">
            {allDeposites != undefined && allDeposites.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr No</th>
                    <th className="pl-3 text-nowrap">Txn ID</th>
                    <th className="pl-3 text-nowrap">Coin</th>
                    <th className="pl-3 text-nowrap">Email ID</th>
                    <th className="pl-3 text-nowrap">Amount</th>
                    <th className="pl-3 text-nowrap">Fee</th>
                    <th className="pl-3 text-nowrap">Amount Received</th>
                    <th className="pl-3 text-nowrap">Type</th>
                    <th className="pl-3 text-nowrap">Acc. No. / Card No.</th>
                    <th className="pl-3 text-nowrap">Date</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allDeposites.map((depositeData, index) => {
                    const convertDate = (str) => {
                      return dateFormat(str, ' d "" mmm, yyyy "" h:MM');
                    };
                    return (
                      <tr>
                        <td>{page * 10 - (9 - index)}</td>
                        <td
                          className="pl-3 text-nowrap"
                          title={depositeData.transaction_id}
                        >
                          {(depositeData?.transaction_id?.length &&
                            depositeData?.transaction_id?.slice(0, 15) +
                              "...") ||
                            "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {filterData?.coin?.toUpperCase() || "USD"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {depositeData?.email}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {depositeData?.amount / SMALLEST_UNIT}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {calcFee(
                            depositeData?.fee / SMALLEST_UNIT,
                            depositeData?.extra_fee / SMALLEST_UNIT
                          )}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {calculateTotal(
                            depositeData?.amount / SMALLEST_UNIT,
                            depositeData?.fee / SMALLEST_UNIT +
                              depositeData?.extra_fee / SMALLEST_UNIT
                          )}
                        </td>
                        <td>{depositeData?.payment_mode_name?.ENG}</td>
                        <td>
                          <a>
                            {depositeData?.account_number !== null &&
                            depositeData?.account_number !== "NULL"
                              ? depositeData?.account_number
                              : depositeData?.ach_card_number !== null &&
                                depositeData?.ach_card_number !== "NULL"
                              ? depositeData?.ach_card_number
                              : "-"}
                          </a>
                        </td>

                        <td className="pl-3 text-nowrap">
                          {convertDate(depositeData?.created_at)}
                        </td>
                        <td className="pl-3 text-nowrap ">
                          {depositeData?.status == 1 ? (
                            <p style={{ color: "#0799BF" }}>Unconfirmed</p>
                          ) : depositeData?.status == 2 ? (
                            <p style={{ color: "#129857" }}>Confirmed</p>
                          ) : depositeData?.status == 3 ? (
                            <p style={{ color: "#ff0909" }}>Declined</p>
                          ) : depositeData?.status == 0 ? (
                            <Row>
                              <Col
                                lg={4}
                                md={6}
                                sm={12}
                                text-nowrap
                                className="text-nowrap"
                              >
                                <Button
                                  variant="primary"
                                  type="SUBMIT"
                                  value="approve"
                                  onClick={() =>
                                    openModal("approve", depositeData, index)
                                  }
                                >
                                  Approve
                                </Button>
                                {"  "}
                                <Button
                                  variant="danger"
                                  className="ml-2"
                                  value="decline"
                                  onClick={() =>
                                    openModal("decline", depositeData, index)
                                  }
                                >
                                  Reject
                                </Button>
                              </Col>
                            </Row>
                          ) : (
                            // <Form.Group>
                            //   <Form.Control
                            //     as="select"
                            //     defaultValue="Select"
                            //     name="isApproved"
                            //     id="isApproved"
                            //     value={
                            //       depositeData.value == 0
                            //         ? ""
                            //         : depositeData.value == 1
                            //         ? "approved"
                            //         : "declined"
                            //     }
                            //     onChange={(e) =>
                            //       openModal(e, depositeData, index)
                            //     }
                            //   >
                            //     <option value="" className="d-none">
                            //       Select
                            //     </option>
                            //     <option value={"approve"} selected>
                            //       Approved
                            //     </option>
                            //     <option value={"decline"} selected>
                            //       Reject
                            //     </option>
                            //   </Form.Control>
                            // </Form.Group>
                            ""
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
                    <th className="pl-3 text-nowrap">Txn ID</th>
                    <th className="pl-3 text-nowrap">Coin</th>
                    <th className="pl-3 text-nowrap">Email ID</th>
                    <th className="pl-3 text-nowrap">Amount</th>
                    <th className="pl-3 text-nowrap">Fee</th>
                    <th className="pl-3 text-nowrap">Amount Received</th>
                    <th className="pl-3 text-nowrap">Type</th>
                    <th className="pl-3 text-nowrap">Acc. No. / Card No.</th>
                    <th className="pl-3 text-nowrap">Date</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="12" className="text-center">
                      No Record Found
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
            {totalRecords != undefined && totalRecords > limit && (
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

            <>
              <Modal show={updateModal} onHide={() => setUpdateModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Do you want to {actiontype} transaction?
                  </Modal.Title>
                </Modal.Header>
                {actiontype == "decline" && (
                  <Modal.Body>
                    <Col lg={12} md={12} sm={12}>
                      <Form.Group className="mb-0">
                        <Form.Control
                          type="text"
                          name="reason"
                          id="reason"
                          placeholder="Enter Reason"
                          value={filterData?.reason}
                          onChange={(e) => getFilterInputData(e, "reason")}
                        />
                      </Form.Group>
                    </Col>
                  </Modal.Body>
                )}
                <Modal.Footer className="justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={() => setUpdateModal(false)}
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={() => approveOrDisapprove()}
                    disabled={!filterData?.reason && actiontype == "decline"}
                  >
                    Ok
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default DepositFiatTransactions;
