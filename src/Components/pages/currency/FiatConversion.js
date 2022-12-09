import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Modal,
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import { Icon } from "semantic-ui-react";
import {
  fiatPaymentTypeFn,
  updateFiatPaymentTypeFn,
} from "../../../Redux/Actions/DepositeTrans/deposite.action";
import { useDispatch } from "react-redux";
import "../../../App.css";
import {
  getActivefiatCoinsFn,
  updateActivefiatCoinsFn,
} from "../../../Redux/Actions/BuySell/BuySell.action";
import IsNumber from "../../common/isNumber";

function FiatPriceConversion() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(3);
  const [type, setType] = useState("DEPOSITS");
  const [allFiatPaymentTypes, setAllFiatPaymentTypes] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [currency, SetCurrency] = useState();
  const [conversionPrice, SetConversionPrice] = useState();
  const [editStatus, setEditStatus] = useState();
  const [currencyId, setCurrencyId] = useState([]);

  const getConversionRate = () => {
    dispatch(getActivefiatCoinsFn()).then((val) => {
      setAllFiatPaymentTypes(val.data);
    });
  };

  const getFilterInputData = (e) => {
    let type = e.target.value;
    getConversionRate();
  };

  const openModalUpdate = (e) => {
    setCurrencyId(e.currency_id);
    SetCurrency(e.currency_name);
    SetConversionPrice(e.exchange_price_per_usd);
    setEditModal(true);
  };

  const updatePaymentSettings = () => {
    let data = {
      exchange_price_per_usd: conversionPrice,
    };

    dispatch(updateActivefiatCoinsFn(currencyId, data)).then((val) => {
      getConversionRate();
      setEditModal(false);
    });
  };

  useEffect(() => {
    getConversionRate();
  }, []);

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Fiat Conversion Rate" subtitle="" />
        <Card>
          <Card.Body>
            {allFiatPaymentTypes !== undefined &&
            allFiatPaymentTypes.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Exchange price in USD</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allFiatPaymentTypes.map((list) => {
                    return (
                      <tr>
                        <td>{list?.currency_name}</td>
                        <td>{list?.exchange_price_per_usd}</td>
                        <td>
                          <span className="edit_icon">
                            {list?.fixer_symbol?.toLowerCase() !== "usd" && (
                              <a
                                href
                                className="view"
                                onClick={() => openModalUpdate(list)}
                              >
                                <Icon name="pencil alternate" />{" "}
                              </a>
                            )}
                          </span>
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
                    <th>Method</th>
                    <th>Exchange price in USD</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="3" className="text-center">
                      No Record Found
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
        <Modal show={editModal} onHide={() => setEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="Currency"
                disabled
                defaultValue={currency}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="number"
                onKeyPress={(e) => IsNumber(e)}
                placeholder="Exchange Price in USD"
                name="conversionPrice"
                defaultValue={conversionPrice}
                onChange={(e) => SetConversionPrice(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditModal(false)}>
              Close
            </Button>{" "}
            <Button variant="primary" onClick={() => updatePaymentSettings()}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default FiatPriceConversion;
