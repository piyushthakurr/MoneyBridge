import React, { useEffect, useState } from "react";
import { Table, Form, Card, Container, Row, Col, Modal } from "react-bootstrap";
import { Pagination, Icon, Button } from "semantic-ui-react";
import { Header } from "semantic-ui-react";
import PageTitle from "../../common/PageTitle";
import dateFormat from "dateformat";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import { offset, limit, ORDER_TYPE } from "../../../Constants/constant";
import "../../../App.css";
import { buySellTokenListingFn } from "../../../Redux/Actions/BuySell/BuySell.action";
import ImportCsv from "../../../Components/common/common";
import {
  activeCoinsTradingFn,
  buySellOrdersFn,
} from "../../../Redux/Actions/BuySell/BuySell.action";
import DigitAfterDecimal from "../../common/DigitAfterDecimal";
import { get2fastatusFn } from "../../../Redux/Actions/profile/profile.actions";
import FeelistingModal from "./FeelistingModal";
import { buySellFeeListingFn } from "../../../Redux/Actions/BuySell/BuySell.action";
import DeleteModal from "./DeleteModal";
export const Feelisting = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [allBuySell, setAllBuySell] = useState([]);
  const [activeCoins, setActiveCoins] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [totalRecords, setTotalRecords] = useState();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [id, setId] = React.useState("");
  const [refrenceVariable, SetRefrenceVariable] = useState(false);
  const [buyData, setBuyData] = React.useState();

  //   useEffect(() => {
  //     dispatch(activeCoinsTradingFn()).then((val) => {
  //       setActiveCoins(val?.data?.filter((val) => val.is_fiat_currency === 0));
  //       console.log("xxxx", activeCoins)
  //     });

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
  //   }, []);

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

    dispatch(buySellFeeListingFn(data, page)).then((val) => {
      setAllBuySell(val.data);
      setTotalRecords(val.total_records);
    });

    // }
  };
  //   console.log("all buy sell", allBuySell)
  //   console.log("total records", totalRecords)
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

  const modelIsOpen = (buySellData) => {
    setOpen(true);
    console.log("zzzzz", buySellData, open);
    setId(id);
    setBuyData(buySellData);
  };
  const deleteModalIsOpen = () => {
    setDeleteOpen(true);
    setId(id);
  };
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
                  <th>Token</th>
                  <th>Type</th>
                  <th>Trading Fee(%)</th>
                  <th>PlatForm Fee(%)</th>
                  <th>Oder Limit</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allBuySell.map((buySellData, i) => (
                  <tr>
                    <td>
                      <img
                        style={{ width: "15px" }}
                        src={buySellData?.logo_uri}
                      />{" "}
                      {"      "}
                      {buySellData?.token_key}
                    </td>
                    <td>{buySellData?.fee_type}</td>
                    <td>{buySellData?.fee}</td>
                    <td> {buySellData?.platform_fee}</td>
                    <td>{buySellData?.order_limit}</td>
                    <th>
                      <Button
                        variant="outline-dark"
                        onClick={(e) => modelIsOpen(buySellData)}
                      >
                        Edit
                      </Button>
                    </th>
                    <th>
                      <Button
                        variant="outline-dark"
                        onClick={() => deleteModalIsOpen()}
                      >
                        Delete
                      </Button>
                    </th>
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
            <DeleteModal
              deleteOpen={deleteOpen}
              setDeleteOpen={setDeleteOpen}
              buyData={buyData}
            />
            <FeelistingModal open={open} setOpen={setOpen} buyData={buyData} />
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
};
