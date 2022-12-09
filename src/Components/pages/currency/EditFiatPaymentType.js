import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Modal,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import {
  fiatPaymentTypeEditFn,
  fiatPaymentTypeFn,
  paymodeCurrencyFiatFn,
  UpdateFiatPaymentFeesFn,
  updateFiatPaymentTypeFn,
} from "../../../Redux/Actions/DepositeTrans/deposite.action";
import { useDispatch } from "react-redux";
import "../../../App.css";
import { useHistory } from "react-router";
import { MultiSelect } from "react-multi-select-component";
import { activeFiatCoinsFn } from "../../../Redux/Actions/dashboard/dashboard.action";
import IsNumber from "../../common/isNumber";

function EditFiatPaymentType() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [listData, setListData] = useState([]);
  const [activeCoins, setActiveCoins] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currencyResponse, setCurrencyResponse] = useState([]);
  useEffect(() => {
    getDepositTransactions();
  }, []);

  useEffect(() => {
    dispatch(paymodeCurrencyFiatFn(history?.location?.state?.id)).then(
      (val) => {
        setCurrencyResponse(val);
      }
    );
  }, []);

  const getDepositTransactions = () => {
    let currencies = history?.location?.state?.supported_currencies?.split(",");
    if (
      history.location.state.supported_currencies != null &&
      history.location.state.supported_currencies !== ""
    ) {
      let data = [];
      currencies.map((e) => {
        let a = {
          label: e.toUpperCase(),
          value: e,
        };
        data.push(a);
      });
      setSelected(data);
    }
    dispatch(activeFiatCoinsFn()).then((val) => {
      let options = val.map((val) => {
        let data = {
          label: val.toUpperCase(),
          value: val,
        };
        return data;
      });
      setActiveCoins(options);
    });
  };

  const updatePaymentSettings = (val) => {
    let item = {};
    currencyResponse.forEach((element) => {
      if (element.currency.toUpperCase() === val.toUpperCase()) {
        item = element;
      }
    });
    let data = {
      extra_fee: item.extra_fee,
      id: item.id,
      payment_fee: item.payment_fee,
    };

    dispatch(UpdateFiatPaymentFeesFn(data)).then((val) => {
      // getDepositTransactions();
    });
  };

  useEffect(() => {
    if (activeCoins.length > 0) {
      let joinArray = activeCoins.concat(selected);
      let currr = [];
      selected.forEach((element) => {
        currr.push(element.value);
      });

      let uniquie = [];
      joinArray.forEach((element, index) => {
        if (!currr.includes(element.value)) {
          uniquie.push(element);
        }
      });

      let new_array = [];
      uniquie.forEach((element) => {
        new_array.push(element.value);
      });
      let curr = [];
      selected.forEach((element) => {
        curr.push(element.value);
      });
      let data = {
        id: history?.location?.state?.id,
        supported_currencies: curr.toString(),
        remove_currencies: new_array.toString(),
      };

      dispatch(fiatPaymentTypeEditFn(data)).then((res) => {
        setCurrencyResponse(res.data);
      });
    }
  }, [selected, activeCoins]);

  const getPaymentFeeValue = (curr) => {
    let data = currencyResponse.filter(
      (item) => item.currency.toUpperCase() === curr.toUpperCase()
    );
    if (data) {
      return data[0]?.payment_fee;
    } else {
      return 0;
    }
  };

  const getExtraFeeValue = (curr) => {
    let data = currencyResponse.filter(
      (item) => item.currency.toUpperCase() === curr.toUpperCase()
    );
    if (data) {
      return data[0]?.extra_fee;
    } else {
      return 0;
    }
  };
  const assignPaymentFeeToCoin = (val, curr) => {
    let currRes = [...currencyResponse];
    currRes.forEach((element, index) => {
      if (element.currency.toUpperCase() === curr.toUpperCase()) {
        element.payment_fee = val;
      }
    });

    setCurrencyResponse(currRes);
  };

  const assigExtraFeeToCoin = (val, curr) => {
    let currRes = [...currencyResponse];
    currRes.forEach((element, index) => {
      if (element.currency.toUpperCase() === curr.toUpperCase()) {
        element.extra_fee = val;
      }
    });

    setCurrencyResponse(currRes);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Edit Fiat Payment Type" subtitle="" />
        <div lg={12} className="mb-4 d-flex justify-content-end">
          <Button
            style={{ cursor: "pointer" }}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </div>
        <div className="box_deco">
          <Row className="withdrw_srch">
            <form>
              <Col lg={12} className="mb-4">
                <MultiSelect
                  options={activeCoins}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </Col>

              <Row>
                {selected.map((val, index) => (
                  <Col lg={6}>
                    <Card className="mb-4">
                      <Card.Body>
                        <h4 style={{ fontSize: "20px", color: "#f45126" }}>
                          {val?.value?.toUpperCase()}
                        </h4>
                        <Row>
                          <Col lg={5}>
                            <Form.Group className="mb-0">
                              <Form.Label>Payment Fee</Form.Label>
                              <Form.Control
                                type="number"
                                name={"paymentFee" + index}
                                value={
                                  currencyResponse.length > 0
                                    ? getPaymentFeeValue(val.value)
                                    : ""
                                }
                                onKeyPress={(e) => IsNumber(e)}
                                onChange={(e) =>
                                  assignPaymentFeeToCoin(
                                    e.target.value,
                                    val.value
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={5}>
                            <Form.Group className="mb-0">
                              <Form.Label>Extra Fee</Form.Label>
                              <Form.Control
                                type="number"
                                name={"extraFee" + index}
                                value={
                                  currencyResponse.length > 0
                                    ? getExtraFeeValue(val.value)
                                    : ""
                                }
                                onKeyPress={(e) => IsNumber(e)}
                                onChange={(e) =>
                                  assigExtraFeeToCoin(e.target.value, val.value)
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={2} style={{ marginTop: "27px" }}>
                            <Button
                              variant="primary"
                              onClick={() => updatePaymentSettings(val.value)}
                            >
                              Update
                            </Button>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}{" "}
              </Row>
            </form>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default EditFiatPaymentType;
