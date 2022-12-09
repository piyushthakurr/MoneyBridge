import React, { useEffect, useState } from "react";
import {
  Form,
  Table,
  Button,
  Container,
  Card,
  Col,
  Row,
} from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import "../../../App.css";
import {
  activeCoinsFiatFn,
  PairsListWithFeeFn,
} from "../../../Redux/Actions/BuySell/BuySell.action";
import { useHistory } from "react-router-dom";
import { COUNTRY } from "../../../Constants/constant";
import { get2fastatusFn } from "../../../Redux/Actions/profile/profile.actions";

function FeeManagement() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [pairListWithFee, setPairListWithFee] = useState([]);
  const [pairListWithFeeClone, setPairListWithFeeClone] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [fiatCoin, setFiatCoin] = useState("");
  const [activeCoins, setActiveCoins] = useState([]);

  useEffect(() => {
    dispatch(activeCoinsFiatFn()).then((val) => {
      setActiveCoins(val.data);
    });
    dispatch(get2fastatusFn()).then(
      (res) => {
        let filtrCountry = COUNTRY.filter(
          (val) => val.name === res.detail.country
        );

        if (filtrCountry[0]?.currSymbol) {
          setFiatCoin(filtrCountry[0]?.currSymbol);
        } else {
          setFiatCoin("ALL");
        }
      },
      (error) => {}
    );
  }, []);
  useEffect(() => {
    if (activeCoins && fiatCoin) getFeePairsList();
  }, [fiatCoin]);

  const getFeePairsList = () => {
    dispatch(PairsListWithFeeFn()).then((res) => {
      setPairListWithFee(res.data);
      setPairListWithFeeClone([...res.data]);
      let listData = [];
      res.data.map((val) => listData.push(val.pair_name));
      let curr = listData.filter((item, i) => listData.indexOf(item) === i);
      setCurrencies(curr);

      if (res.data.length > 0) {
        let e = fiatCoin?.toUpperCase();

        let filtrArr =
          e !== "ALL"
            ? res.data.filter((val) => {
                return val.pair_name.includes(e);
              })
            : res.data;

        setPairListWithFee(filtrArr);
      }
    });
  };

  const selectFiatCoin = (e) => {
    setFiatCoin(e);
    let filtrArr =
      e !== "ALL"
        ? pairListWithFeeClone.filter((val) => val.pair_name.includes(e))
        : pairListWithFeeClone;
    setPairListWithFee(filtrArr);
  };

  const openEditPage = (e) => {
    history.push("/auth/buysell-management/edit-fee-manage", e);
  };

  const filterPairsList = (e) => {
    let evntVal = e.target.value;
    let filtrArr =
      evntVal !== "ALL"
        ? pairListWithFeeClone.filter((val) => val.pair_name === evntVal)
        : pairListWithFeeClone;
    setPairListWithFee(filtrArr);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Fee Management" subtitle="" />
        <Card>
          <Card.Body>
            <Row className="mb-4">
              <Col lg={4} md={6} sm={12}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="coin"
                    id="coin"
                    value={fiatCoin.toUpperCase() || "ALL"}
                    onChange={(e) => selectFiatCoin(e.target.value)}
                  >
                    <option value="ALL">All Coin</option>

                    {activeCoins != undefined &&
                      activeCoins.map((coins, index) => {
                        return (
                          <option key={index} value={coins.fixer_symbol}>
                            {coins.fixer_symbol}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={4} className="title_text">
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="pair"
                    id="pair"
                    onChange={(event) => filterPairsList(event)}
                  >
                    <option value="ALL">All Pair</option>
                    {currencies.map((list, index) => (
                      <option key={index} value={list}>
                        {list}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {/* <Form.Select
                      as="select"
                      id="pair"
                    >
                      <option value="ALL">ALL Pair</option>
                      {currencies.map((list, index) => (
                        <option key={index} value={list}>
                          {list}
                        </option>
                      ))}
                    </Form.Select> */}
              </Col>
            </Row>
            {pairListWithFee !== undefined && pairListWithFee.length > 0 ? (
              <div>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Currency Pair</th>
                      <th>Side</th>
                      <th>Fee(%)</th>
                      <th>Order Limit</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pairListWithFee.map((list, index) => (
                      <tr key={index}>
                        <td>{list?.pair}</td>
                        <td>{list?.type?.toUpperCase()}</td>
                        <td>{list?.fee}</td>
                        <td>{list?.orderLimit}</td>

                        <td className="pl-3 text-nowrap ">
                          <span className="edit_icon">
                            <a
                              className="view"
                              onClick={() => openEditPage(list)}
                            >
                              <Icon name="pencil alternate" />
                            </a>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Currency Pair</th>
                    <th>Side</th>
                    <th>Fee(%)</th>
                    <th>Order Limit</th>
                    <th>Action</th>
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
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default FeeManagement;
