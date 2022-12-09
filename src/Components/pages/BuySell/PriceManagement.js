import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Card,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import "../../../App.css";
import {
  activeCoinsFiatFn,
  marketPairsListFn,
} from "../../../Redux/Actions/BuySell/BuySell.action";
import { useHistory } from "react-router-dom";
import { COUNTRY } from "../../../Constants/constant";
import { get2fastatusFn } from "../../../Redux/Actions/profile/profile.actions";

function PriceManagement() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [activeCoins, setActiveCoins] = useState([]);
  const [selectedFiatCoin, setSelectedFiatCoin] = useState("");

  const [marketPairData, setMarketPairData] = useState([]);

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
          setSelectedFiatCoin(filtrCountry[0]?.currSymbol);
        } else {
          setSelectedFiatCoin("All");
        }
      },
      (error) => {}
    );
  }, []);

  useEffect(() => {
    if (selectedFiatCoin) {
      getMarketPairsList();
    }
  }, [selectedFiatCoin]);

  const getMarketPairsList = () => {
    dispatch(
      marketPairsListFn(selectedFiatCoin == "All" ? "" : selectedFiatCoin)
    ).then((val) => {
      setMarketPairData(val.data);
    });
  };

  const openEditPage = (e) => {
    history.push("/auth/buysell-management/edit-manage", e);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Price Management" subtitle="" />
        <Card>
          <Card.Body>
            {/* {marketPairData !== undefined && marketPairData.length > 0 ? (
              <div> */}
            <Row className="mb-4">
              <Col lg={4} md={6} sm={12}>
                <Form.Group>
                  <Form.Control
                    as="select"
                    name="coin"
                    id="coin"
                    value={selectedFiatCoin.toUpperCase() || "All"}
                    onChange={(e) => setSelectedFiatCoin(e.target.value)}
                  >
                    <option value="All">All Coin</option>
                    {/* <option value="All">All Coin</option> */}
                    {activeCoins != undefined &&
                      activeCoins.map((coins, index) => {
                        return (
                          <option value={coins.fixer_symbol}>
                            {coins.fixer_symbol}
                          </option>
                        );
                      })}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            {marketPairData !== undefined && marketPairData.length > 0 ? (
              <div>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Currency Pair</th>
                      <th>Reference Price</th>
                      <th>Markup(%)</th>
                      <th>Markdown(%)</th>
                      <th>Ask Price</th>
                      <th>Bid Price</th>
                      <th>Is Enabled</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketPairData.map((list) => {
                      return (
                        <tr>
                          <td>{list.api_pair}</td>

                          <td>{list.referencePrice}</td>
                          <td>{list.markup_price}</td>
                          <td>{list.markdown_price}</td>
                          <td>{list.buyPrice}</td>
                          <td>{list.sellPrice}</td>
                          <td>{list.is_enable}</td>
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
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Currency Pair</th>
                    <th>Reference Price</th>
                    <th>Markup(%)</th>
                    <th>Markdown(%)</th>
                    <th>Bid Price</th>
                    <th>Is Enabled</th>
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

export default PriceManagement;
