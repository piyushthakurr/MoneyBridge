import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Table,
  Form,
  Button,
  Row,
  Col,
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
import {
  offset,
  limit,
  USER_TYPE,
  COUNTRY,
  DEPOSITE_STATUS,
  ORDER_TYPE,
  SMALLEST_UNIT,
} from "../../../Constants/constant";
import "../../../App.css";

import ImportCsv from "../../../Components/common/common";
import { liquidityBuyWithdrawOrderFn } from "../../../Redux/Actions/BuySell/BuySell.action";

function BuyWithdrawList() {
  const dispatch = useDispatch();
  const [stateCsvData, setStateCsvData] = useState();
  const [page, setPage] = useState(1);
  const [allBuyWithdraw, setAllBuyWithdraw] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [totalRecords, setTotalRecords] = useState();

  const getBuyWithdrawOrderList = () => {
    let data = {
      page: page,
      market_order_id: filterData.orderId ? filterData.orderId : "",
      status: filterData.status ? filterData.status : "",
      side: filterData.type ? filterData.type : "",
      fromDate: filterData.fromDate
        ? dateFormat(filterData.fromDate, "yyyy-mm-dd")
        : "",
      toDate: filterData.toDate
        ? dateFormat(filterData.toDate, "yyyy-mm-dd")
        : "",
    };
    dispatch(liquidityBuyWithdrawOrderFn(data)).then((val) => {
      setAllBuyWithdraw(val.listing);
      setTotalRecords(val.totalRecords);
      let statementCsvData = [];
      if (val.listing !== undefined && val.listing.length > 0) {
        val.listing.map((stateData) => {
          let data = {
            Pair: stateData?.pair_name ? stateData?.pair_name : "N/A",
            Type: stateData?.side ? stateData?.side : "N/A",
            Amount: stateData?.amount / SMALLEST_UNIT || 0,
            Price: stateData?.price / SMALLEST_UNIT || 0,
            "Order Id": stateData?.market_order_id || "-",
            "Order Type": stateData?.type || "-",

            Date: stateData?.created_at.split("T")[0] || "-",
            Status: stateData?.status || "-",
          };

          statementCsvData.push(data);
        });
        setStateCsvData(statementCsvData);
      }
    });
  };

  useEffect(() => {
    getBuyWithdrawOrderList();
  }, []);

  const clearSearch = () => {
    setFilterData({});
  };

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  const searchValues = () => {
    getBuyWithdrawOrderList();
  };

  const getFilterInputData = (e, type) => {
    let filterDatas = { ...filterData };
    if (type === "coin") {
    } else if (type === "orderId") {
      filterDatas.orderId = e.target.value;
    } else if (type === "type") {
      filterDatas.type = e.target.value;
    } else if (type === "status") {
      filterDatas.status = e.target.value;
    } else if (type === "fromDate") {
      filterDatas["fromDate"] = e;
    } else if (type === "toDate") {
      filterDatas.toDate = e;
    }
    setFilterData(filterDatas);
  };

  const convertDate = (str) => {
    return dateFormat(str, ' d "" mmm, yyyy "" h:MM');
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Buy Withdraw List" subtitle="" />
        <Card className="mb-4">
          <Card.Body>
            <Row className="mb-3">
              <Col lg={4} md={6} sm={12} style={{ position: "relative" }}>
                <DatePicker
                  className="form-control"
                  selected={filterData.fromDate ? filterData.fromDate : ""}
                  placeholderText="DD/MM/YYYY"
                  onChange={(e) => getFilterInputData(e, "fromDate")}
                />
              </Col>
              <Col lg={4} md={6} sm={12} style={{ position: "relative" }}>
                <DatePicker
                  className="form-control"
                  selected={filterData?.toDate ? filterData?.toDate : ""}
                  placeholderText="DD/MM/YYYY"
                  onChange={(e) => getFilterInputData(e, "toDate")}
                />
              </Col>

              <Col lg={4} md={6} sm={12}>
                <Form.Group className="mb-0">
                  <Form.Control
                    as="select"
                    defaultValue="Type"
                    name="type"
                    id="type"
                    onChange={(e) => getFilterInputData(e, "type")}
                    value={filterData?.type ? filterData?.type : ""}
                  >
                    {ORDER_TYPE.map((type) => {
                      return <option value={type.value}>{type.name}</option>;
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={6} sm={12}>
                <Form.Group className="mb-0">
                  <Form.Control
                    type="search"
                    name="orderId"
                    id="orderId"
                    placeholder="Order Id"
                    value={filterData?.orderId ? filterData?.orderId : ""}
                    onChange={(e) => getFilterInputData(e, "orderId")}
                  />
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
                    value={filterData?.status ? filterData?.status : ""}
                  >
                    <option value={""} selected>
                      All
                    </option>
                    {DEPOSITE_STATUS.map((status) => {
                      return (
                        <option value={status.value}>{status.name}</option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={4} md={6} sm={12} text-nowrap className="text-nowrap">
                <Button
                  variant="primary"
                  type="submit"
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
          </Card.Body>
        </Card>

        {/* <div className="box_deco">
          <Row className="withdrw_srch"></Row>
        </div> */}

        <ImportCsv
          stateCsvData={stateCsvData}
          file_name={"Buy Sell Withdraw Order List"}
        />
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Pair</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>Order Id</th>
                  <th>Order Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {allBuyWithdraw.map((BuyWithdrawData, i) => (
                  <tr>
                    <td>{(page - 1) * limit + i + 1}</td>
                    <td>{BuyWithdrawData.pair_name}</td>
                    <td className="pl-3 text-nowrap">{BuyWithdrawData.side}</td>
                    <td className="pl-3 text-nowrap">
                      {BuyWithdrawData.amount / SMALLEST_UNIT}
                    </td>
                    <td className="pl-3 text-nowrap">
                      {BuyWithdrawData.executed_price / SMALLEST_UNIT}
                    </td>
                    <td>{BuyWithdrawData.orderId}</td>
                    <td>{BuyWithdrawData.type}</td>
                    <td>{BuyWithdrawData.status}</td>
                    <td>{convertDate(BuyWithdrawData?.created_at)}</td>
                  </tr>
                ))}
                <tr>
                  {allBuyWithdraw.length === 0 && (
                    <td colSpan="9" className="text-center">
                      No Record Found
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>

            {totalRecords !== undefined && totalRecords > limit && (
              <Pagination
                defaultActivePage={1}
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

export default BuyWithdrawList;
