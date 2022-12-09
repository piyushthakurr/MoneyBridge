import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Button,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import PageTitle from "../../common/PageTitle";

import {
  withdrawListFn,
  withdrawFilterDataFn,
  applypermissionRequest,
  withdrawListFiatFn,
  withdrawFiatRequestFn,
  merchantWithdrawFiatRequestFn,
} from "../../../Redux/Actions/withdrawTransactions/withdrawTrans.action";

import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import {
  limit,
  DEPOSITE_STATUS,
  SMALLEST_UNIT,
  WITHDRAWFIAT_STATUS,
} from "../../../Constants/constant";
//import "./Users.css";
import "../../../App.css";

import ImportCsv from "../../common/common";
import { activeCoinsFiatFn } from "../../../Redux/Actions/BuySell/BuySell.action";
import { toast } from "../../Toast/toast.component";
import { agentWithdrawTxnsFn } from "../../../Redux/Actions/AgentManagement/agent.action";

function AgentWithdrawTransaction() {
  const dispatch = useDispatch();
  const [stateCsvData, setStateCsvData] = useState();
  const [page, setPage] = useState(1);
  const [allWithdrawTrans, setAllWithdrawTrans] = useState([]);
  const [activeCoins, setActiveCoins] = useState();
  const [filterData, setFilterData] = useState({ coin: "USD" });
  const [totalRecords, setTotalRecords] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const [withdrawPassword, setWithdrawPassword] = useState();
  const [transactionId, setTransactionId] = useState();
  const [actiontype, setActionType] = useState();
  const [approveRequestHandle, setApproveRequestHandle] = useState();
  const [reason, setReason] = useState();

  useEffect(() => {
    dispatch(activeCoinsFiatFn()).then((val) => {
      setActiveCoins(val.data);
      // let coin = [{ coin: "usd" }, { status: "0" }];
      // setFilterData(coin);
    });
  }, []);

  const getWithdrawTransactions = () => {
    let data = {
      status: filterData.status || "0",
    };
    let coin = filterData?.coin || "usd";
    dispatch(agentWithdrawTxnsFn(coin?.toLowerCase(), page, data)).then(
      (val) => {
        let newArr = val.data;
        newArr.forEach((element) => {
          element["value"] = 0;
        });
        setAllWithdrawTrans(newArr);

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
                stateData?.payment_fee && stateData?.extra_fee
                  ? calcFee(
                      stateData?.payment_fee / SMALLEST_UNIT,
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

  const openModal = (type, withdarwData, index) => {
    setWithdrawPassword("");
    setTransactionId("");
    let actualArray = [...allWithdrawTrans];
    if (type === "approved") {
      actualArray[index].value = "1";
    } else {
      actualArray[index].value = "2";
    }
    setActionType(type);
    setApproveRequestHandle(withdarwData);
    setUpdateModal(true);
  };

  const approveOrDisapprove = () => {
    if ((!withdrawPassword && actiontype == "approved") || !transactionId) {
      if (actiontype == "approved" && !transactionId) {
        return toast.error("Please fill all details");
      }
    }
    if (!withdrawPassword && actiontype == "declined") {
      return toast.error("Please fill all details");
    }
    let applypermission = {
      withdraw_id: approveRequestHandle?.id,
      isApproved: actiontype,
      password: withdrawPassword,
      amount: approveRequestHandle?.amount,
      symbol: filterData?.coin,
      email: approveRequestHandle?.email,
      admin_tx_id: transactionId || null,
      reason,
    };
    // withdrawListFn();
    // setApprovedrequest(applypermission);

    dispatch(applypermissionRequest(filterData.coin, applypermission)).then(
      (res) => {
        setUpdateModal(false);
        getWithdrawTransactions();
      },
      (error) => {
        setActionType("");
        getWithdrawTransactions();
      }
    );
  };

  useEffect(() => {
    getWithdrawTransactions();
  }, [page, filterData?.coin]);

  const clearSearch = () => {
    setPage(1);
    setFilterData({});
  };

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  const searchValues = () => {
    setPage(1);
    getWithdrawTransactions();
  };

  const getFilterInputData = (e, type) => {
    let filterDatas = { ...filterData };

    if (type == "coin") {
      setPage(1);
      filterDatas.coin = e.target.value;
    } else if (type == "status") {
      filterDatas.status = e.target.value;
    }

    setFilterData(filterDatas);
  };

  const calculateTotal = (amt, fee) => {
    return parseFloat(amt) - parseFloat(fee);
  };
  const calcFee = (fee, Exfee) => {
    return (parseFloat(fee) + parseFloat(Exfee)).toFixed(2);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Withdraw Transaction" subtitle="" />

        <div className="box_deco">
          <Row className="withdrw_srch">
            <Col lg={4} md={6} sm={12}>
              <Form.Group>
                <Form.Control
                  as="select"
                  // defaultValue="Select Coin"
                  name="coin"
                  id="coin"
                  value={filterData?.coin}
                  onChange={(e) => getFilterInputData(e, "coin")}
                >
                  {/* <option value={""} selected>
                    All
                  </option> */}
                  {activeCoins != undefined &&
                    activeCoins &&
                    activeCoins.map((coins) => {
                      return (
                        <option value={coins.fixer_symbol}>
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
                  onChange={(e) => getFilterInputData(e, "status")}
                >
                  {/* <option value={""} selected>
                    All
                  </option> */}
                  {WITHDRAWFIAT_STATUS.map((status) => {
                    return <option value={status.value}>{status.name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col lg={4} md={6} sm={12} text-nowrap className="text-nowrap">
              <Button
                variant="primary"
                type="SUBMIT"
                onClick={() => searchValues()}
              >
                Search
              </Button>{" "}
              <Button
                variant="danger"
                className="ml-2"
                onClick={() => clearSearch()}
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
              stateCsvData={stateCsvData}
              file_name={"Withdraw_Transaction_Fiat"}
            />
          </Col>
        </Row>

        <div className="box_deco">
          <Row className="justify-content-end no-gutters">
            {allWithdrawTrans != undefined && allWithdrawTrans.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Txn ID</th>
                    <th className="pl-3 text-nowrap">Coin</th>
                    <th className="pl-3 text-nowrap">Email ID</th>
                    <th className="pl-3 text-nowrap">Amount</th>
                    <th className="pl-3 text-nowrap">Fee</th>

                    <th className="pl-3 text-nowrap">Amount Received</th>

                    <th className="pl-3 text-nowrap">Account Number</th>

                    <th className="pl-3 text-nowrap">Type</th>

                    <th className="pl-3 text-nowrap">Date</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allWithdrawTrans.map((withdarwData, index) => {
                    return (
                      <tr>
                        <td
                          className="pl-3 text-nowrap"
                          title={withdarwData.tx_id}
                        >
                          {(withdarwData?.tx_id?.length &&
                            withdarwData?.tx_id?.slice(0, 15) + "...") ||
                            "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {filterData?.coin || "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData.email}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData.amount / SMALLEST_UNIT}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData?.agent_fee / SMALLEST_UNIT}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {calculateTotal(
                            withdarwData?.amount / SMALLEST_UNIT,
                            withdarwData?.agent_fee / SMALLEST_UNIT
                          )}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData?.account_number != null &&
                          withdarwData?.account_number !== ""
                            ? withdarwData?.account_number
                            : "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData?.payment_mode_name?.ENG}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData?.created_at?.split("T")[0]}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData.status == 1 ? (
                            <p style={{ color: "yellow" }}>UNCONFIRMED</p>
                          ) : withdarwData.status == 2 ? (
                            <p style={{ color: "green" }}>CONFIRMED</p>
                          ) : withdarwData.status == 3 ? (
                            <p style={{ color: "red" }}>DECLINED </p>
                          ) : withdarwData.status == 4 ? (
                            <p style={{ color: "red" }}>FAILED </p>
                          ) : withdarwData.status == 0 ? (
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
                                  value="approved"
                                  onClick={() =>
                                    openModal("approved", withdarwData, index)
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
                                    openModal("declined", withdarwData, index)
                                  }
                                >
                                  Reject
                                </Button>
                              </Col>
                            </Row>
                          ) : (
                            // <Form.Group >
                            //   <Form.Control
                            //     as="select"
                            //     defaultValue="Select"
                            //     name="isApproved"
                            //     id="isApproved"
                            //     value={
                            //       withdarwData.value == 0
                            //         ? ""
                            //         : withdarwData.value == 1
                            //         ? "approved"
                            //         : "declined"
                            //     }
                            //     onChange={(e) =>
                            //       openModal(e, withdarwData, index)
                            //     }
                            //   >
                            //     <option value="" className="d-none">
                            //       Select
                            //     </option>
                            //     <option value={"approved"} selected>
                            //       Approved
                            //     </option>
                            //     <option value={"declined"} selected>
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
                    <th className="pl-3 text-nowrap">Address from</th>
                    <th className="pl-3 text-nowrap">Date</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <td colSpan="7" className="text-center">
                    No Record Found
                  </td>
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
                <Modal.Body>
                  {actiontype == "approved" && (
                    <Form.Group className="mb-3">
                      <Form.Label>Transaction Id</Form.Label>
                      <Form.Control
                        type="text"
                        name="transactionid"
                        onChange={(e) => setTransactionId(e.target.value)}
                      />
                    </Form.Group>
                  )}

                  {actiontype == "declined" && (
                    <Form.Group className="mb-3">
                      <Form.Label>Reason</Form.Label>
                      <Form.Control
                        type="text"
                        name="reason"
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3">
                    <Form.Label>Withdraw Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      onChange={(e) => setWithdrawPassword(e.target.value)}
                    />
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={() => setUpdateModal(false)}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => approveOrDisapprove()}
                    disabled={!withdrawPassword}
                  >
                    ok
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

export default AgentWithdrawTransaction;
