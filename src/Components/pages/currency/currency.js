import React from "react";
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
import PageTitle from "../../common/PageTitle";

import { activeCoinsFn } from "../../../Redux/Actions/dashboard/dashboard.action";
import {
  currencyFn,
  currencyAuthFn,
} from "../../../Redux/Actions/currency/currency.action";

import { connect } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import "../../../App.css";

import CurrencyAuthModal from "../currency/currencyAuth.modal";
import { PASSWORD_TWO, SMALLEST_UNIT } from "../../../Constants/constant";
import { toast } from "../../../Components/Toast/toast.component";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      currencyData: [],
      showAuthModal: false,
      coiname: "",
    };
  }

  componentDidMount = () => {
    let { activeCoinsFn, currencyFn } = this.props;
    let currencyDta = [];
    activeCoinsFn().then((response) => {
      if (response) {
        response.map((coinData) => {
          currencyFn(coinData)
            .then((coinDta) => {
              currencyDta.push(coinDta);
            })
            .then(() => {
              this.setState({ currencyData: currencyDta });
            });
        });
      }
    });
  };

  componentWillReceiveProps = (nextProps) => {
    /* if(nextProps.activeCoins !== this.props.activeCoins){
        
    } */
  };

  getData = (value) => {
    let { currencyAuthFn } = this.props;
    if (PASSWORD_TWO === value) {
      currencyAuthFn(true);
      this.props.history.push(
        `/auth/currency-management/edit-fee-limit/${this.state.coiname}`,
        this.state
      );
    } else {
      currencyAuthFn(false);
      toast.error("This is incorrect Password please try again.");
    }
  };

  render() {
    let { activeCoins } = this.props;
    let { currencyData } = this.state;

    return (
      <div>
        <Container fluid className="main-content-container px-4">
          <PageTitle title="Currency-Management" subtitle="" />
          <Card>
            <Card.Body>
              <CurrencyAuthModal
                show={this.state.showAuthModal}
                handleClose={() => {
                  this.setState({ showAuthModal: false });
                }}
                getPassword={this.getData}
              />
              <Row flex-wrap className="currency_mng">
                {currencyData.map((crncy) => {
                  return (
                    <>
                      <Col lg={4} md={6} style={{ padding: "20px" }}>
                        <Card>
                          <Card.Header> {crncy?.name} </Card.Header>

                          <Card.Header
                            style={{
                              backgroundColor: "rgba(16, 31, 56, 0.99)",
                            }}
                          >
                            <Button
                              onClick={() =>
                                this.setState({
                                  showAuthModal: this.state.showAuthModal
                                    ? false
                                    : true,
                                  pairId:
                                    crncy?.tarding_pair_id &&
                                    crncy?.tarding_pair_id,
                                  coiname:
                                    crncy.name && crncy.name.toLowerCase(),
                                })
                              }
                              disabled={this.state.showAuthModal}
                            >
                              {" "}
                              Set Limit
                            </Button>
                          </Card.Header>

                          <Card.Body>
                            {/* <Card.Title>Card title</Card.Title> */}
                            <Row>
                              <ul>
                                <li>
                                  Min Withdraw Amount:{" "}
                                  {crncy?.minimum_withdraw / SMALLEST_UNIT}
                                </li>
                                {/* <li>
                                  Withdrawl Limit With KYC:{" "}
                                  {crncy?.with_kyc_withdraw_limit /
                                    SMALLEST_UNIT}
                                </li>
                                <li>
                                  Withdrawl Limit Without KYC:{" "}
                                  {crncy?.without_kyc_withdraw_limit /
                                    SMALLEST_UNIT}
                                </li> */}
                                <li>
                                  Withdraw Fee:{" "}
                                  {crncy?.withdraw_fee / SMALLEST_UNIT}
                                </li>
                              </ul>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //pairListData: state.orders.pairListData,
    activeCoins: state.dashboard.activeCoins,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getPairListFn: (data) => dispatch(getPairListFn(data)),
    activeCoinsFn: (data) => dispatch(activeCoinsFn(data)),
    currencyFn: (data) => dispatch(currencyFn(data)),
    currencyAuthFn: (data) => dispatch(currencyAuthFn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
