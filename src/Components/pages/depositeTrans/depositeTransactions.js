import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Dropdown,
  Card,
} from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import PageTitle from "../../common/PageTitle";
import dateFormat from "dateformat";
import { activeCoinsFn } from "../../../Redux/Actions/dashboard/dashboard.action";

import { depositeFilterDataFn } from "../../../Redux/Actions/DepositeTrans/deposite.action";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
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
//import "./Users.css";
import "../../../App.css";

import ImportCsv from "../../../Components/common/common";
import moveToBlockCyper from "../../common/MoveToCyper";
import { object } from "yup";

function DepositTransactions() {
  const dispatch = useDispatch();
  const [stateCsvData, setStateCsvData] = useState();
  const [page, setPage] = useState(1);
  const [allDeposites, setAllDeposites] = useState([]);
  const [activeCoins, setActiveCoins] = useState();
  const [filterData, setFilterData] = useState({ coin: "btc" });
  const [totalRecords, setTotalRecords] = useState();

  useEffect(() => {
    dispatch(activeCoinsFn()).then((val) => {
      setActiveCoins(val);
    });
  }, []);

  const getDepositTransactions = () => {
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

    dispatch(depositeFilterDataFn(filterData?.coin || "btc", page, data)).then(
      (val) => {
        setAllDeposites(val.data);
        setTotalRecords(val.totalRecords);
        let statementCsvData = [];
        if (val.data !== undefined && val.data.length > 0) {
          val.data.map((stateData) => {
            let data = {
              "Transaction Id": stateData?.tx_id ? stateData?.tx_id : "N/A",
              Email: stateData?.email ? stateData?.email : "N/A",
              Coin: filterData?.coin ? filterData?.coin.toUpperCase() : "BTC",
              Amount: stateData?.amount / SMALLEST_UNIT || 0,
              Fee: stateData?.fee / SMALLEST_UNIT || 0,
              "Address From": stateData?.address_from || "-",
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

  useEffect(() => {
    getDepositTransactions();

    if (Object.keys(filterData).length == 0) {
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
  }, [page, filterData?.coin, Object.keys(filterData).length == 0]);

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

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Deposit Transaction" subtitle="" />
        <Card className="mb-4">
          <Card.Body>
            <Row className="withdrw_tran mb-3">
              <Col lg={4} md={4} sm={12}>
                <Form.Group>
                  {/* <Form.Label>Kyc status</Form.Label> */}
                  <Form.Control
                    as="select"
                    name="coin"
                    id="coin"
                    value={filterData?.coin || ""}
                    onChange={(e) => getFilterInputData(e, "coin")}
                  >
                    {/* <option className="d-none" value="">
                      All
                    </option> */}

                    {activeCoins != undefined &&
                      activeCoins &&
                      activeCoins.map((coins, index) => {
                        return (
                          <option key={index} value={coins}>
                            {coins.toUpperCase()}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col lg={4} md={4} sm={12} style={{ position: "relative" }}>
                <DatePicker
                  className="form-control"
                  selected={filterData.fromDate ? filterData.fromDate : ""}
                  placeholderText="DD/MM/YYYY"
                  onChange={(e) => getFilterInputData(e, "fromDate")}
                />
              </Col>
              <Col lg={4} md={4} sm={12} style={{ position: "relative" }}>
                <DatePicker
                  className="form-control"
                  selected={filterData?.toDate ? filterData?.toDate : ""}
                  placeholderText="DD/MM/YYYY"
                  onChange={(e) => getFilterInputData(e, "toDate")}
                />
              </Col>
            </Row>
            <Row className="withdrw_tran mb-3">
              <Col lg={4} md={4} sm={12}>
                <Form.Group className="mb-0">
                  <Form.Control
                    type="search"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={filterData?.email?.trim() || ""}
                    onChange={(e) => getFilterInputData(e, "email")}
                  />
                </Form.Group>
              </Col>

              <Col lg={4} md={4} sm={12}>
                <Form.Group className="mb-0">
                  <Form.Control
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Address"
                    value={filterData?.address || ""}
                    onChange={(e) => getFilterInputData(e, "address")}
                  />
                </Form.Group>
              </Col>
              <Col lg={4} md={4} sm={12}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    defaultValue="Status"
                    name="status"
                    id="status"
                    value={filterData?.status || "2"}
                    onChange={(e) => getFilterInputData(e, "status")}
                  >
                    {/* {filterData.status == "" && (
                    <option className="d-none" value="">
                      Status
                    </option>
                  )} */}
                    {/* <option value={""} selected>
                      All
                    </option> */}
                    {DEPOSITE_STATUS.map((status) => {
                      return (
                        <option value={status.value}>{status.name}</option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
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
          </Card.Body>
        </Card>

        {/* <div className="box_deco">
          <Row className="withdrw_srch">
           
          </Row>
        </div> */}

        <ImportCsv
          stateCsvData={stateCsvData}
          file_name={"Deposite_Transaction_Crypto"}
        />
        <Card>
          <Card.Body>
            {allDeposites != undefined && allDeposites.length > 0 ? (
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
                  {allDeposites.map((depositeData) => {
                    const convertDate = (str) => {
                      return dateFormat(str, ' d "" mmm, yyyy "" h:MM');
                    };
                    return (
                      <tr>
                        <td
                          className="pl-3 text-nowrap"
                          title={depositeData.tx_id}
                          style={{ cursor: "pointer" }}
                          disabled={depositeData.is_internal == 1}
                          onClick={() =>
                            moveToBlockCyper(
                              filterData?.coin.toUpperCase(),
                              depositeData?.tx_id,
                              depositeData?.is_internal
                            )
                          }
                        >
                          {(depositeData?.tx_id?.length &&
                            depositeData?.tx_id?.slice(0, 15) + "...") ||
                            "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {filterData?.coin?.toUpperCase() || "BTC"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {depositeData.email}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {depositeData.amount / SMALLEST_UNIT}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {(depositeData?.address_from?.length &&
                            depositeData?.address_from?.slice(0, 15) + "...") ||
                            "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {convertDate(depositeData?.created_at)}
                        </td>
                        <td className="pl-3 text-nowrap ">
                          {depositeData.status == 1 ? (
                            <p style={{ color: "#0799BF" }}>Unconfirmed</p>
                          ) : depositeData.status == 2 ? (
                            <p style={{ color: "#129857" }}>Confirmed</p>
                          ) : depositeData.status == 0 ? (
                            <p style={{ color: "#f45126" }}>Pending</p>
                          ) : (
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
                  <tr>
                    <td colSpan="7" className="text-center">
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
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DepositTransactions;
