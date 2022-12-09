import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Pagination, Icon } from "semantic-ui-react";
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
import {
  DEPOSITE_STATUS,
  limit,
  SMALLEST_UNIT,
} from "../../../Constants/constant";
import DatePicker from "react-datepicker";

import {
  activeCoinsFn,
  getUsersFn,
} from "../../../Redux/Actions/dashboard/dashboard.action";
import { depositeFilterDataFn } from "../../../Redux/Actions/DepositeTrans/deposite.action";
import {
  withdrawFilterDataFn,
  withdrawListFn,
} from "../../../Redux/Actions/withdrawTransactions/withdrawTrans.action";
import ImportCsv from "../../common/common";
import PageTitle from "../../common/PageTitle";
import {
  fundWalletWithdrawTxnsFn,
  getWithdrawFundHistoryFn,
} from "../../../Redux/Actions/Fund/fund.action";

export default function WithdrawHistory() {
  const dispatch = useDispatch();
  const [stateCsvData, setStateCsvData] = useState();
  const [page, setPage] = useState(1);
  const [allWithdrawTrans, setAllWithdrawTrans] = useState([]);
  const [activeCoins, setActiveCoins] = useState();
  const [filterData, setFilterData] = useState({ coin: "btc" });
  const [totalRecords, setTotalRecords] = useState();

  const [approvedrequest, setApprovedrequest] = useState();
  const [enableFilterInput, setEnableFilterInput] = useState(true);
  const [filterOtion, setFilterOtion] = useState(false);
  const [resetdata, setResetdata] = useState(false);

  useEffect(() => {
    dispatch(activeCoinsFn()).then((val) => {
      setActiveCoins(val);
    });
  }, []);

  const getWithdrawTransactions = () => {
    dispatch(fundWalletWithdrawTxnsFn(filterData?.coin, page)).then((val) => {
      setAllWithdrawTrans(val.data);
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
    });
  };

  useEffect(() => {
    getWithdrawTransactions();
  }, [page, filterData]);

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  const getFilterInputData = (e, type) => {
    // let { filterData } = state;
    setPage(1);
    let filteD = { ...filterData };

    if (type == "coin") {
      filteD.coin = e.target.value;
    }

    setFilterData(filteD);
  };

  const approveRequestHandle = (e, withdrwal_id, coin, amount) => {
    let applypermission = {
      withdraw_id: withdrwal_id,
      isApproved: e.target.value,
      password: "2R:H8udp7{);-:+L",
      amount: amount,
      symbol: coin,
      reason: e.target.value,
    };
    // permissionapplyfn(coin, applypermission).then(() => {
    withdrawListFn();
    // });
    setApprovedrequest(applypermission);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Withdraw Transaction" subtitle="" />
        <Card>
          <Card.Body>
            <Col lg={4} md={6} sm={12}>
              <Form.Group>
                {/* <Form.Label>Kyc status</Form.Label> */}
                <Form.Control
                  as="select"
                  defaultValue="Select Coin"
                  name="coin"
                  id="coin"
                  value={filterData?.coin || ""}
                  onChange={(e) => getFilterInputData(e, "coin")}
                >
                  {filterData?.coin == "" && (
                    <option className="d-none" value="">
                      Select Coin
                    </option>
                  )}
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
          </Card.Body>
        </Card>

        <Row className="mt-4 mb-2">
          <Col></Col>
          <Col style={{ textAlign: "right" }} className="import-btn">
            <ImportCsv
              stateCsvData={stateCsvData}
              file_name={"Withdraw_History"}
            />
          </Col>
        </Row>

        <Card>
          <Card.Body>
            {allWithdrawTrans != undefined && allWithdrawTrans.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Txn ID</th>
                    <th className="pl-3 text-nowrap">Coin</th>
                    <th className="pl-3 text-nowrap">Amount</th>
                    {/* <th className="pl-3 text-nowrap">Address from</th> */}
                    <th className="pl-3 text-nowrap">Address To</th>
                    <th className="pl-3 text-nowrap">Date & Time</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allWithdrawTrans.map((withdarwData) => {
                    return (
                      <tr>
                        <td
                          className="pl-3 text-nowrap"
                          title={withdarwData?.tx_id}
                        >
                          {(withdarwData?.tx_id?.length &&
                            withdarwData?.tx_id?.slice(0, 15) + "...") ||
                            "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {filterData?.coin.toUpperCase()}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {withdarwData?.amount / SMALLEST_UNIT}
                        </td>
                        {/* <td
                          className="pl-3 text-nowrap"
                          title={withdarwData?.from_address}
                        >
                          {(withdarwData?.from_address?.length &&
                            withdarwData?.from_address?.slice(0, 15) + "...") ||
                            "-"}
                        </td> */}
                        <td
                          className="pl-3 text-nowrap"
                          title={withdarwData?.address_to}
                        >
                          {(withdarwData?.address_to?.length &&
                            withdarwData?.address_to?.slice(0, 15) + "...") ||
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
                            <p style={{ color: "green" }}>CONFIRMED </p>
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
                    <th className="pl-3 text-nowrap">Amount</th>
                    {/* <th className="pl-3 text-nowrap">Address from</th> */}
                    <th className="pl-3 text-nowrap">Address To</th>
                    <th className="pl-3 text-nowrap">Date & Time</th>
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
  // }
}
