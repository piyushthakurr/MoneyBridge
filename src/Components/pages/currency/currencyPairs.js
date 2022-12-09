import React from "react";
import { Container, Row, Col, Table, Form, Button, Dropdown, Card } from "react-bootstrap";
import PageTitle from "../../common/PageTitle";

import {
  currencyPairFn,
  currencyPairAuthFn,
} from "../../../Redux/Actions/currency/currency.action";

import { connect } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import "../../../App.css";
import CurrencyPairAuthModal from "./currencyPairAuth.modal";
import { PASSWORD2 } from "../../../Constants/constant";
import { toast } from "../../../Components/Toast/toast.component";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      currencyData: [],
      showLimit: false,
      showAuthModal: false,
      pairId: "",
      pairCoin: "",
    };
  }

  componentDidMount = () => {
    let { currencyPairFn } = this.props;
    currencyPairFn();
  };

  componentWillReceiveProps = (nextProps) => {
    /* if(nextProps.activeCoins !== this.props.activeCoins){
        
    } */
  };

  getData = (value) => {
    let { currencyPairAuthFn } = this.props;
    this.props.history.push(
      `/auth/currency-management/currency-pairs-fee-edit/${this.state.pairId}/${this.state.pairCoin}`
    );
    if ("Tn$E4y6Ghj^gUmC#" === value) {
      // alert(';;')
      currencyPairAuthFn(true);
    } else {
      currencyPairAuthFn(false);
      toast.error("This is incorrect Password please try again.");
    }
  };

  render() {
    let { currencyPairData } = this.props;
    function preciseTodecimal(num) {
      return (num / 100000000).toFixed(8);
    }
    return (
      <div>
        <Container fluid className="main-content-container px-4">
        <PageTitle
                title="Currency Pairs"
                subtitle=""
              />
          <CurrencyPairAuthModal
            show={this.state.showAuthModal}
            handleClose={() => {
              this.setState({ showAuthModal: false });
            }}
            getPassword={this.getData}
          />

          <Row flex-wrap className="currency_mng">
            {currencyPairData != undefined &&
              currencyPairData.length > 0 &&
              currencyPairData.map((crncy) => {
                return (
                  <>
                    <Col lg={6} style={{ padding: "20px" }}>
                      <Card>
                        <Card.Header> {crncy.pair}</Card.Header>

                        <Card.Header style={{ backgroundColor: "#f9f1d9" }}>
                          <Button
                            onClick={() =>
                              this.setState({
                                showAuthModal: this.state.showAuthModal
                                  ? false
                                  : true,
                                pairId:
                                  crncy.tarding_pair_id &&
                                  crncy.tarding_pair_id,
                                pairCoin: crncy.pair && crncy.pair,
                              })
                            }
                            disabled={this.state.showAuthModal}
                          >
                            {" "}
                            Set Fee
                          </Button>
                        </Card.Header>

                        <Card.Body className="cur_pairs">
                          <Row>
                            <Col md={6} sm={12} className="buy_mng">
                              <p>Buy</p>
                              <ul
                                style={{ listStyleType: "none" }}
                                className="pl-0"
                              >
                                <li>Trade Limit: {crncy.minTradeLimit}</li>
                                <li>
                                  Trade Fee:{" "}
                                  {preciseTodecimal(crncy.buyTradeFee)}
                                </li>
                              </ul>
                            </Col>
                            <Col md={6} sm={12}>
                              <p>Sell</p>
                              <ul
                                style={{ listStyleType: "none" }}
                                className="pl-0"
                              >
                                <li>Trade Limit: {crncy.minTradeLimit}</li>
                                <li>
                                  Trade Fee:{" "}
                                  {preciseTodecimal(crncy.buyTradeFee)}
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </>
                );
              })}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currencyPairData: state.currency.currencyPairData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    currencyPairFn: (data) => dispatch(currencyPairFn(data)),
    currencyPairAuthFn: (data) => dispatch(currencyPairAuthFn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
