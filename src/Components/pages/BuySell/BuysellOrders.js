import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import PageTitle from "../../common/PageTitle";
import dateFormat from "dateformat";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import { offset, limit, ORDER_TYPE } from "../../../Constants/constant";
import "../../../App.css";

import ImportCsv from "../../../Components/common/common";
import {
  activeCoinsTradingFn,
  buySellOrdersFn,
} from "../../../Redux/Actions/BuySell/BuySell.action";
import DigitAfterDecimal from "../../common/DigitAfterDecimal";
import { get2fastatusFn } from "../../../Redux/Actions/profile/profile.actions";

function BuysellOrders() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [allBuySell, setAllBuySell] = useState([]);
  const [activeCoins, setActiveCoins] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [totalRecords, setTotalRecords] = useState();

  // useEffect(() => {
  //   dispatch(activeCoinsTradingFn()).then((val) => {
  //     setActiveCoins(val?.data?.filter((val) => val.is_fiat_currency === 0));
  //     console.log("xxxx", activeCoins)
  //   });

    // for select coin by sub admin's currency //

    // dispatch(get2fastatusFn()).then(
    //   (res) => {
    //     let filtrCountry = COUNTRY.filter(
    //       (val) => val.name === res?.detail?.country
    //     );

    //     console.log(filtrCountry[0]?.currSymbol);
    //     if (filtrCountry[0]?.currSymbol) {
    //       setFilterData({ coin: filtrCountry[0]?.currSymbol });
    //     } else {
    //       alert();
    //       setFilterData({ coin: "all" });
    //     }
    //   },
    //   (error) => {}
    // );
  // }, []);

  useEffect(() => {
    getBuySellOrderList();
  }, [filterData, page]);

  const getBuySellOrderList = () => {
    let abc = [];
    abc = activeCoins.filter(
      (val) =>
        val?.currency_symbol?.toLowerCase() == filterData?.coin?.toLowerCase()
    );

    // if (abc[0]?.currency_id || filterData.coin == "all") {
    let data = {
      // currency_id: abc.length
      //   ? filterData.coin
      //     ? abc[0]?.currency_id
      //     : "all"
      //   : "all",
      order_type: filterData.type ? filterData.type : "all",
    };

    dispatch(buySellOrdersFn(data, page)).then((val) => {
      setAllBuySell(val.data);

      setTotalRecords(val.total_records);

    });
    // }
  };
  console.log("all buy sell", allBuySell)
  console.log("total records", totalRecords)
  // getBuySellOrderList()
  const clearSearch = () => {
    setFilterData({ coin: "all" });
  };

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  const searchValues = () => {
    setPage(1);
    getBuySellOrderList();
  };

  const getFilterInputData = (e, type) => {
    let filterDatas = { ...filterData };
    if (type === "type") {
      filterDatas.type = e.target.value;
    } else if (type === "coin") {
      filterDatas.coin = e.target.value;
    }
    setFilterData(filterDatas);
  };

  const convertDate = (str) => {
    return dateFormat(str, ' d "" mmm, yyyy "" h:MM');
  };
console.log("filter", filterData)
console.log("activeCoins", activeCoins)
  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Buy Sell Order List" subtitle="" />
        <Card className="mb-4">
          <Card.Body>
            <Row className="withdrw_tran">
              <Col lg={4} md={6} sm={12}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    defaultValue="Currency"
                    name="coin"
                    id="coin"
                    onChange={(e) => getFilterInputData(e, "coin")}
                    value={filterData?.coin?.toUpperCase() || ""}
                  >
                    <option value={""}>All</option>
                    {activeCoins.map((coin) => {
                      return (
                        <option value={coin.currency_symbol?.toUpperCase()}>
                          {coin?.currency_symbol?.toUpperCase()}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
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

        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order type</th>
                  <th>Amount/Qty</th>
                  <th>Fees</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {allBuySell.map((buySellData, i) => (
                  <tr>
                    <td>{buySellData?.id}</td>
                    <td>{buySellData?.type}</td>
                    <td>{buySellData?.amount}</td>
                    <td>{buySellData?.platform_fee}</td>
                    <td>{(buySellData?.amount) - (buySellData?.platform_fee)}</td>
                    <td>{buySellData?.status === 0 ? "Pending" : buySellData?.status === 1 ? "Confirmed" : buySellData?.status === 2 ? "Paid" : buySellData?.status === 3 ? "Faild" : "Action Required"}</td>
                    <td>{convertDate(buySellData?.created_at)}</td>
                    {/* <td>{DigitAfterDecimal(buySellData?.fee, 8)}</td>
                    <td>
                      {DigitAfterDecimal(
                        buySellData?.total_price + buySellData?.fee,
                        2
                      )}
                    </td>

                    <td>{buySellData?.order_status}</td> */}

                    {/* <td className="pl-3 text-nowrap ">
                      {buySellData?.status === 1 ? (
                        <p style={{ color: "#ff0909" }}>Unconfirmed</p>
                      ) : buySellData?.status === 2 ? (
                        <p style={{ color: "#129857" }}>Confirmed</p>
                      ) : buySellData?.status === 0 ? (
                        <p style={{ color: "#947FFE" }}>Pending</p>
                      ) : (
                        ""
                      )}
                    </td> */}
                  </tr>
                ))}
                <tr>
                  {allBuySell.length === 0 && (
                    <td colSpan="12" className="text-center">
                      No Record Found
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>

            {totalRecords !== undefined && totalRecords > limit && (
              <Pagination
                activePage={page}
                onPageChange={(e, d) => pageChange(e, d)}
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

export default BuysellOrders;
