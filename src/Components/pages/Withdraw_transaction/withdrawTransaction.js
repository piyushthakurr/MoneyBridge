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
import PageTitle from "../../common/PageTitle";
import dateFormat from "dateformat";
import { activeCoinsFn } from "../../../Redux/Actions/dashboard/dashboard.action";
import {
  applypermissionRequest,
  withdrawListSearchFn,
} from "../../../Redux/Actions/withdrawTransactions/withdrawTrans.action";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import {
  limit,
  DEPOSITE_STATUS,
  SMALLEST_UNIT,
} from "../../../Constants/constant";
//import "./Users.css";
import "../../../App.css";

import ImportCsv from "../../../Components/common/common";
import moveToBlockCyper from "../../common/MoveToCyper";

function WithdrawTransaction() {
  const dispatch = useDispatch();
  const [stateCsvData, setStateCsvData] = useState();
  const [page, setPage] = useState(1);
  const [allWithdrawTrans, setAllWithdrawTrans] = useState([]);
  const [activeCoins, setActiveCoins] = useState();
  const [filterData, setFilterData] = useState({ coin: "BTC" });
  const [totalRecords, setTotalRecords] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const [withdrawPassword, setWithdrawPassword] = useState();
  const [actiontype, setActionType] = useState();
  const [approveRequestHandle, setApproveRequestHandle] = useState();

  useEffect(() => {
    activeCoinsListData();
  }, []);

  useEffect(() => {
    getWithdrawTransactions();
    if (Object.keys(filterData).length === 0) {
      setFilterData({
        coin: "",
        email: "",
        txid: "",
        address: "",
        status: "",
        fromDate: "",
        toDate: "",
      });
    }
  }, [page, filterData?.coin, Object.keys(filterData).length === 0]);

  const activeCoinsListData = () => {
    dispatch(activeCoinsFn()).then((val) => {
      setActiveCoins(val);
    });
  };

  const getWithdrawTransactions = () => {
    let data = {
      address: filterData?.address || "",
      email: filterData?.email || "",

      status: filterData?.status || "2",

      txId: filterData?.txId || "",
      fromDate: filterData.fromDate
        ? dateFormat(filterData.fromDate, "yyyy-mm-dd")
        : "",
      toDate: filterData.toDate
        ? dateFormat(filterData.toDate, "yyyy-mm-dd")
        : "",
    };

    dispatch(withdrawListSearchFn(filterData?.coin || "btc", data, page)).then(
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
              Fee: stateData?.fee / SMALLEST_UNIT || 0,
              "Address To": stateData?.to_address || "-",
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

  const approveOrDisapprove = () => {
    let applypermission = {
      withdraw_id: approveRequestHandle.id,
      isApproved: actiontype,
      password: withdrawPassword,
      amount: approveRequestHandle.amount,
      symbol: filterData.coin,
      email: approveRequestHandle.email,
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

  const clearSearch = () => {
    // alert();
    setPage(1);
    setFilterData({});
    // getWithdrawTransactions();
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
    } else if (type == "email") {
      filterDatas.email = e.target.value;
    } else if (type == "txid") {
      filterDatas.txId = e.target.value;
    } else if (type == "address") {
      filterDatas.address = e.target.value;
    } else if (type == "status") {
      filterDatas.status = e.target.value;
    } else if (type == "fromDate") {
      filterDatas.fromDate = e;
    } else if (type == "toDate") {
      filterDatas.toDate = e;
    }

    setFilterData(filterDatas);
  };

  const openModal = (type, withdarwData, index) => {
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

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Withdraw Transaction" subtitle="" />
        <div className="box_deco">
          <Row className="withdrw_tran mb-3">
            <Col lg={4} md={6} sm={12}>
              <Form.Group controlId="coin">
                <Form.Control
                  as="select"
                  defaultValue="Select Coin"
                  name="coin"
                  value={filterData?.coin || ""}
                  onChange={(e) => getFilterInputData(e, "coin")}
                >
                  {/* <option value={""} selected>
                    All
                  </option> */}

                  {activeCoins != undefined &&
                    activeCoins &&
                    activeCoins.map((coins) => {
                      return (
                        <option value={coins}>{coins.toUpperCase()}</option>
                      );
                    })}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col lg={4} md={6} sm={12} style={{ position: "relative" }}>
              <DatePicker
                selected={filterData?.fromDate ? filterData?.fromDate : ""}
                placeholderText="DD/MM/YYYY"
                className="form-control"
                onChange={(e) => getFilterInputData(e, "fromDate")}
              />
            </Col>
            <Col lg={4} md={6} sm={12} style={{ position: "relative" }}>
              <DatePicker
                selected={filterData.toDate ? filterData.toDate : ""}
                placeholderText="DD/MM/YYYY"
                className="form-control"
                onChange={(e) => getFilterInputData(e, "toDate")}
              />
            </Col>
          </Row>
          <Row className="withdrw_tran mb-3">
            <Col lg={4} md={6} sm={12}>
              <Form.Group className="mb-0" controlId="txid">
                <Form.Control
                  type="search"
                  name="txid"
                  value={filterData?.txId || ""}
                  placeholder="Transaction Id"
                  onChange={(e) => getFilterInputData(e, "txid")}
                />
              </Form.Group>
            </Col>

            <Col lg={4} md={6} sm={12}>
              <Form.Group className="mb-0" controlId="address">
                <Form.Control
                  type="search"
                  name="address"
                  value={filterData?.address || ""}
                  placeholder="Address"
                  onChange={(e) => getFilterInputData(e, "address")}
                />
              </Form.Group>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Form.Group controlId="email">
                <Form.Control
                  type="search"
                  name="email"
                  value={filterData?.email || ""}
                  placeholder="Email"
                  onChange={(e) => getFilterInputData(e, "email")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="withdrw_tran mb-3">
            <Col lg={4} md={6} sm={12}>
              <Form.Group controlId="status">
                {/* <Form.Label>Kyc status</Form.Label> */}
                <Form.Control
                  as="select"
                  name="status"
                  value={filterData?.status || "2"}
                  onChange={(e) => getFilterInputData(e, "status")}
                >
                  {/* {filterData.status == 0 && (
                    <option className="d-none" value="">
                      Status
                    </option>
                  )} */}
                  <option value={""} selected>
                    All
                  </option>
                  {DEPOSITE_STATUS.map((status) => {
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
              </Button>
              {"  "}
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
        {/* <div className="box_deco">
          <Row className="withdrw_srch"></Row>
        </div> */}

        <Row className="mt-4 mb-2">
          <Col></Col>
          <Col style={{ textAlign: "right" }} className="import-btn">
            <ImportCsv
              stateCsvData={stateCsvData}
              file_name={"Withdraw_Transaction_Crypto"}
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

                    <th className="pl-3 text-nowrap">Address To</th>
                    <th className="pl-3 text-nowrap">Date & Time</th>
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
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            moveToBlockCyper(
                              filterData?.coin.toUpperCase(),
                              withdarwData.tx_id
                            )
                          }
                        >
                          {(withdarwData?.tx_id?.length &&
                            withdarwData?.tx_id?.slice(0, 15) + "...") ||
                            "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {filterData?.coin?.toUpperCase() || "BTC"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData.email}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData.amount / SMALLEST_UNIT}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData.fee / SMALLEST_UNIT}
                        </td>
                        <td
                          className="pl-3 text-nowrap"
                          title={withdarwData.to_address}
                        >
                          {(withdarwData?.to_address.length &&
                            withdarwData?.to_address.slice(0, 15) + "...") ||
                            "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData?.created_at?.split("T")[0]}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {withdarwData.status == 1 ? (
                            <p style={{ color: "#0799BF" }}>UNCONFIRMED</p>
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
                            // <Form.Group controlId="formGridState">
                            //   <Form.Control
                            //     as="select"
                            //     defaultValue="Select"
                            //     name="isApproved"
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
                    <th className="pl-3 text-nowrap">Date & Time</th>
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
              <Modal
                show={updateModal}
                onHide={() => setUpdateModal(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>
                    Do you want to{" "}
                    {actiontype == "approved" ? "approve" : actiontype}{" "}
                    transaction?
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row className="mb-3">
                    <label style={{ marginBottom: "10px" }}>
                      Withdraw Password
                    </label>
                    <Col lg={12} md={12} sm={12}>
                      <Form.Group className="mb-0">
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Enter Password"
                          onChange={(e) => setWithdrawPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  {/* <input
                    type="password"
                    name="Password"
                    onChange={(e) => setWithdrawPassword(e.target.value)}
                  /> */}
                </Modal.Body>
                <Modal.Footer className="justify-content-end">
                  <Button
                    variant="secondary"
                    onClick={() => setUpdateModal(false)}
                  >
                    cancel
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={() => approveOrDisapprove()}
                    disabled={!withdrawPassword}
                  >
                    ok
                  </Button>{" "}
                </Modal.Footer>
              </Modal>
            </>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default WithdrawTransaction;
