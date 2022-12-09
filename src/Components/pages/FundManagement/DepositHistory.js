import {
  DEPOSITE_STATUS,
  limit,
  SMALLEST_UNIT,
} from "../../../Constants/constant";
import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Button,
  Dropdown,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";

import { activeCoinsFn } from "../../../Redux/Actions/dashboard/dashboard.action";
import {
  depositeFilterDataFn,
  getDepositFundHistoryFn,
} from "../../../Redux/Actions/DepositeTrans/deposite.action";
import dateFormat from "dateformat";
import PageTitle from "../../common/PageTitle";
import ImportCsv from "../../common/common";

export default function DepositHistory() {
  const dispatch = useDispatch();
  const [stateCsvData, setStateCsvData] = useState();
  const [page, setPage] = useState(1);
  const [allDeposites, setAllDeposites] = useState([]);
  const [activeCoins, setActiveCoins] = useState();
  const [filterData, setFilterData] = useState({ coin: "btc" });
  const [totalRecords, setTotalRecords] = useState();

  const [approvedrequest, setApprovedrequest] = useState();
  const [enableFilterInput, setEnableFilterInput] = useState(true);
  const [filterOtion, setFilterOtion] = useState(false);
  const [resetdata, setResetdata] = useState(false);
  const [pageload, setPageload] = useState(false);
  const [currencyCoins, setCurrencyCoins] = useState();

  useEffect(() => {
    dispatch(activeCoinsFn()).then((val) => {
      setActiveCoins(val);
    });
  }, []);

  const getDepositTransactions = () => {
    let data = {
      address: "",
      email: "",
      status: "2",
      txId: "",
    };

    dispatch(getDepositFundHistoryFn(filterData?.coin, page)).then((val) => {
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
    });
  };

  useEffect(() => {
    getDepositTransactions();
  }, [page, filterData?.coin]);

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  const getFilterInputData = (e, type) => {
    setPage(1);
    let filtrD = { ...filterData };
    if (type == "coin") {
      filtrD.coin = e.target.value;
    }

    setFilterData(filtrD);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Deposit Transaction" subtitle="" />
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Form.Group>
                  {/* <Form.Label>Kyc status</Form.Label> */}
                  <Form.Control
                    as="select"
                    value={filterData?.coin || ""}
                    name="coin"
                    id="coin"
                    onChange={(e) => getFilterInputData(e, "coin")}
                  >
                    {filterData?.coin == "" && (
                      <option className="d-none" value="">
                        Select Coin
                      </option>
                    )}
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
              <Col lg={6} md={6} sm={12}>
                <ImportCsv
                  stateCsvData={stateCsvData}
                  file_name={"Deposite_History"}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            {allDeposites != undefined && allDeposites.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Txn ID</th>
                    <th className="pl-3 text-nowrap">Coin</th>
                    {/* <th className="pl-3 text-nowrap">Email ID</th> */}
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
                          title={depositeData?.tx_id}
                        >
                          {(depositeData?.tx_id?.length &&
                            depositeData?.tx_id?.slice(0, 15) + "...") ||
                            "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {filterData?.coin.toUpperCase()}
                        </td>
                        {/* <td className="pl-3 text-nowrap">
                          {depositeData.email}
                        </td> */}
                        <td className="pl-3 text-nowrap">
                          {depositeData?.amount / SMALLEST_UNIT}
                        </td>
                        <td
                          className="pl-3 text-nowrap"
                          title={depositeData?.address_from}
                        >
                          {(depositeData?.address_from?.length &&
                            depositeData?.address_from?.slice(0, 15) + "...") ||
                            "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {convertDate(depositeData?.created_at)}
                        </td>
                        <td className="pl-3 text-nowrap ">
                          {depositeData.status == 1 ? (
                            <p style={{ color: "#ff0909" }}>Unconfirmed</p>
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
                    {/* <th className="pl-3 text-nowrap">Email ID</th> */}
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
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
