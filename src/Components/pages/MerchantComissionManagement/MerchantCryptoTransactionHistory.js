import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import PageTitle from "../../common/PageTitle";
import dateFormat from "dateformat";
import { activeCoinsFn } from "../../../Redux/Actions/dashboard/dashboard.action";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import { limit, MERCHANT_STATUS } from "../../../Constants/constant";
import "../../../App.css";

import ImportCsv from "../../../Components/common/common";
import { cryptoFiatTransHistoryFn } from "../../../Redux/Actions/MerchantCommission/merchant.action";
import dateChange, {
  maxDateFrom,
  maxDateTo,
  minDateFrom,
  minDateTo,
} from "../../common/datePickerMinMax";

function MerchantCryptoTransactionHistory() {
  const dispatch = useDispatch();
  const [stateCsvData, setStateCsvData] = useState();
  const [page, setPage] = useState(1);
  const [allCryptoTrans, setAllCryptoTrans] = useState([]);
  const [activeCoins, setActiveCoins] = useState();
  const [filterData, setFilterData] = useState({ coin: "btc" });
  const [totalRecords, setTotalRecords] = useState();

  useEffect(() => {
    dispatch(activeCoinsFn()).then((val) => {
      setActiveCoins(val);
    });
  }, []);

  const getCryptoTransactions = () => {
    let data = {
      email: filterData?.email || "",

      status: filterData?.status || "1",
      coin: filterData?.coin || "btc",

      start_date: filterData.fromDate
        ? dateFormat(filterData.fromDate, "yyyy-mm-dd")
        : "",
      end_date: filterData.toDate
        ? dateFormat(filterData.toDate, "yyyy-mm-dd")
        : "",
    };

    dispatch(cryptoFiatTransHistoryFn(page, 0, data)).then((val) => {
      setAllCryptoTrans(val?.data);
      setTotalRecords(val.count);
      let statementCsvData = [];
      if (val.data !== undefined && val.data.length > 0) {
        val.data.map((stateData) => {
          let data = {
            Email: stateData?.email ? stateData?.email : "N/A",
            Coin: filterData?.coin ? filterData?.coin.toUpperCase() : "BTC",
            Amount: stateData?.amount || 0,
            Date: stateData?.created_at?.split("T")[0] || "-",
            Status:
              stateData?.status === 2
                ? "UNCONFIRMED"
                : stateData?.status === 1
                ? "CONFIRMED"
                : "Pending",
          };
          statementCsvData.push(data);
        });
        setStateCsvData(statementCsvData);
      }
    });
  };

  useEffect(() => {
    getCryptoTransactions();
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
    getCryptoTransactions();
  };

  const getFilterInputData = (e, type) => {
    let filterDatas = { ...filterData };

    if (type == "coin") {
      filterDatas.coin = e.target.value;
    } else if (type == "email") {
      filterDatas.email = e.target.value;
    } else if (type == "status") {
      filterDatas.status = e.target.value;
    } else if (type == "fromDate") {
      filterDatas.fromDate = e;
      dateChange(e, "from_date");
    } else if (type == "toDate") {
      filterDatas.toDate = e;
      dateChange(e, "to_date");
    }

    setFilterData(filterDatas);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Merchant Crypto Transaction" subtitle="" />
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
                  minDate={minDateFrom}
                  maxDate={maxDateFrom}
                  onChange={(e) => getFilterInputData(e, "fromDate")}
                />
              </Col>
              <Col lg={4} md={4} sm={12} style={{ position: "relative" }}>
                <DatePicker
                  className="form-control"
                  selected={filterData?.toDate ? filterData?.toDate : ""}
                  placeholderText="DD/MM/YYYY"
                  minDate={minDateTo}
                  maxDate={maxDateTo}
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
                <Form.Group>
                  <Form.Control
                    as="select"
                    defaultValue="Status"
                    name="status"
                    id="status"
                    value={filterData?.status || "1"}
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
                    {MERCHANT_STATUS.map((status) => {
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
            {allCryptoTrans != undefined && allCryptoTrans.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr.No.</th>
                    <th className="pl-3 text-nowrap">Coin</th>
                    <th className="pl-3 text-nowrap">Email ID</th>
                    <th className="pl-3 text-nowrap">Amount</th>
                    <th className="pl-3 text-nowrap">Date & Time</th>
                    <th className="pl-3 text-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allCryptoTrans.map((depositeData, index) => {
                    const convertDate = (str) => {
                      return dateFormat(str, ' d "" mmm, yyyy "" h:MM');
                    };
                    return (
                      <tr>
                        <td>{page * 10 - (9 - index)}</td>

                        <td className="pl-3 text-nowrap">
                          {depositeData.coin || "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {depositeData.email}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {depositeData.amount}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {convertDate(depositeData?.created_at)}
                        </td>
                        <td className="pl-3 text-nowrap ">
                          {depositeData.status == 2 ? (
                            <p style={{ color: "#0799BF" }}>Unconfirmed</p>
                          ) : depositeData.status == 1 ? (
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
                    <th className="pl-3 text-nowrap">Sr.No.</th>
                    <th className="pl-3 text-nowrap">Coin</th>
                    <th className="pl-3 text-nowrap">Email ID</th>
                    <th className="pl-3 text-nowrap">Amount</th>
                    <th className="pl-3 text-nowrap">Date & Time</th>
                    <th className="pl-3 text-nowrap">Status</th>
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

export default MerchantCryptoTransactionHistory;
