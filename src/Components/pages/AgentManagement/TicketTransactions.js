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
  TRANS_TYPE,
  TICKET_STATUS,
} from "../../../Constants/constant";
import queryString from "query-string";
//import "./Users.css";
import "../../../App.css";

import ImportCsv from "../../../Components/common/common";
import { activeCoinsFiatFn } from "../../../Redux/Actions/BuySell/BuySell.action";
import { ticketTransactionsFn } from "../../../Redux/Actions/AgentManagement/agent.action";

function TicketTransactions() {
  const getSubadminDetails = useSelector((state) => state.profile.twoFaDetails);

  const dispatch = useDispatch();
  const [stateCsvData, setStateCsvData] = useState();
  const [page, setPage] = useState(1);
  const [allTicketTrans, setAllTicketTrans] = useState([]);
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
    if (filterData?.coin) getTicketTransactions();
  }, [page, filterData]);

  const getTicketTransactions = () => {
    let data = {
      tt_status: filterData?.status || "",
      tt_currency: filterData?.coin || "usd",
      tt_type: filterData?.tt_type,
    };
    // let coin = filterData?.coin || "usd";

    dispatch(ticketTransactionsFn(data, page)).then((val) => {
      console.log("ticketTrans", val);

      let newArr = val.data;
      newArr.forEach((element) => {
        element["value"] = 0;
      });
      setAllTicketTrans(newArr);
      setTotalRecords(val.count);

      let statementCsvData = [];
      if (val.data !== undefined && val.data.length > 0) {
        val.data.map((stateData) => {
          let data = {
            "Agent Email": stateData?.agtemail || "N/A",
            "User Email": stateData?.useremail || "N/A",
            Coin: stateData?.mw_tt_currency || "-",
            Amount: stateData?.mw_tt_user_amount / SMALLEST_UNIT || 0,
            Fee: stateData?.mw_tt_agent_fee || 0,
            Type: stateData?.mw_tt_type || "-",
            "Payment Type": stateData?.payment_mode_name || "-",
            Date: stateData?.created_at.split("T")[0] || "-",
            Status:
              stateData?.mw_tt_status == 0
                ? "Pending"
                : stateData.mw_tt_status == 1
                ? "Complete"
                : stateData.mw_tt_status == 2
                ? "Cancel"
                : stateData.mw_tt_status == 3
                ? "Complete by admin"
                : stateData.mw_tt_status == 4
                ? "Cancel by admin"
                : "-",
          };
          statementCsvData.push(data);
        });
        setStateCsvData(statementCsvData);
      }
    });
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
    getTicketTransactions();
  };

  const getFilterInputData = (e, type) => {
    let filterDatas = { ...filterData };

    if (type == "coin") {
      setPage(1);
      filterDatas.coin = e.target.value;
    } else if (type == "status") {
      filterDatas.status = e.target.value;
    } else if (type == "tt_type") {
      filterDatas.tt_type = e.target.value;
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
        <PageTitle title="Ticket Transaction" subtitle="" />
        <div className="box_deco">
          <Row className="withdrw_srch">
            <Col lg={3} md={4} sm={12}>
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

            <Col lg={3} md={4} sm={12}>
              <Form.Group>
                <Form.Control
                  as="select"
                  defaultValue="Status"
                  name="status"
                  id="status"
                  value={filterData?.status || ""}
                  onChange={(e) => getFilterInputData(e, "status")}
                  // disabled={enableFilterInput}
                >
                  {/* <option value={""} selected>
                    All
                  </option> */}
                  {TICKET_STATUS.map((status) => {
                    return <option value={status.value}>{status.name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col lg={3} md={4} sm={12}>
              <Form.Group>
                <Form.Control
                  as="select"
                  defaultValue="tt_type"
                  name="tt_type"
                  id="tt_type"
                  value={filterData?.tt_type || ""}
                  onChange={(e) => getFilterInputData(e, "tt_type")}
                  // disabled={enableFilterInput}
                >
                  {/* <option value={""} selected>
                    All
                  </option> */}
                  {TRANS_TYPE.map((status) => {
                    return <option value={status.value}>{status.name}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            </Col>

            <Col lg={3} md={4} sm={12} text-nowrap className="text-nowrap">
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
              file_name={"ticket-transactions"}
            />
          </Col>
        </Row>
        <div className="box_deco">
          <Row className="justify-content-end no-gutters">
            {allTicketTrans != undefined && allTicketTrans.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr No</th>
                    <th className="pl-3 text-nowrap">Coin</th>
                    <th className="pl-3 text-nowrap">Agent Email</th>
                    <th className="pl-3 text-nowrap">UserEmail</th>
                    <th className="pl-3 text-nowrap">Type</th>
                    <th className="pl-3 text-nowrap">Amount</th>
                    <th className="pl-3 text-nowrap">Fee</th>
                    <th className="pl-3 text-nowrap">Amount Received</th>
                    <th className="pl-3 text-nowrap">Payment Method</th>
                    <th className="pl-3 text-nowrap">Ticket Code</th>
                    <th className="pl-3 text-nowrap">Date</th>
                    <th className="pl-3 text-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allTicketTrans.map((ticketTrans, index) => {
                    const convertDate = (str) => {
                      return dateFormat(str, ' d "" mmm, yyyy "" h:MM');
                    };
                    return (
                      <tr>
                        <td>{page * 10 - (9 - index)}</td>

                        <td className="pl-3 text-nowrap">
                          {ticketTrans?.mw_tt_currency?.toUpperCase() || "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {ticketTrans?.agtemail}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {ticketTrans?.useremail}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {ticketTrans?.mw_tt_type}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {ticketTrans?.mw_tt_user_amount / SMALLEST_UNIT}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {ticketTrans?.mw_tt_agent_fee}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {calculateTotal(
                            ticketTrans?.mw_tt_user_amount / SMALLEST_UNIT,
                            ((ticketTrans?.mw_tt_user_amount / SMALLEST_UNIT) *
                              ticketTrans?.mw_tt_agent_fee) /
                              100
                          )}
                        </td>
                        <td>{ticketTrans?.payment_mode_name?.ENG || "-"}</td>
                        <td>{ticketTrans?.ticket_code}</td>

                        <td className="pl-3 text-nowrap">
                          {convertDate(ticketTrans?.created_at)}
                        </td>
                        <td className="pl-3 text-nowrap ">
                          {ticketTrans.mw_tt_status == 0
                            ? "Pending"
                            : ticketTrans.mw_tt_status == 1
                            ? "Complete"
                            : ticketTrans.mw_tt_status == 2
                            ? "Cancel"
                            : ticketTrans.mw_tt_status == 3
                            ? "Complete by admin"
                            : ticketTrans.mw_tt_status == 4
                            ? "Cancel by admin"
                            : "-"}
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
                    <th className="pl-3 text-nowrap">Sr No</th>
                    <th className="pl-3 text-nowrap">Coin</th>
                    <th className="pl-3 text-nowrap">Agent Email</th>
                    <th className="pl-3 text-nowrap">UserEmail</th>
                    <th className="pl-3 text-nowrap">Type</th>
                    <th className="pl-3 text-nowrap">Amount</th>

                    <th className="pl-3 text-nowrap">Fee</th>
                    <th className="pl-3 text-nowrap">Amount Received</th>
                    <th className="pl-3 text-nowrap">Payment Method</th>
                    <th className="pl-3 text-nowrap">Ticket Code</th>
                    <th className="pl-3 text-nowrap">Date</th>
                    <th className="pl-3 text-nowrap">Status</th>
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
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default TicketTransactions;
