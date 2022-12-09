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
  fiatPaymentTypeEditFn,
  fiatPaymentTypeFn,
  updateFiatPaymentTypeFn,
} from "../../../Redux/Actions/DepositeTrans/deposite.action";
import { useDispatch } from "react-redux";
import "../../../App.css";
import { fiatCoinsApi } from "../../../Services/API/dashboard.service";
import { useHistory } from "react-router";

function FiatPaymentType() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [status, setStatus] = useState(3);
  const [type, setType] = useState("DEPOSITS");
  const [allFiatPaymentTypes, setAllFiatPaymentTypes] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [paymentFee, setPaymentFee] = useState();
  const [extraFee, setExtraFee] = useState();
  const [editStatus, setEditStatus] = useState();
  const [listData, setListData] = useState([]);

  const getDepositTransactions = (type, status) => {
    dispatch(fiatPaymentTypeFn(type, status)).then((val) => {
      setAllFiatPaymentTypes(val?.list);
    });
  };

  const getFilterInputData = (e) => {
    let type = e.target.value;
    getDepositTransactions(type, status);
  };

  const openModalUpdate = (e) => {
    history.push("/auth/edit-fiat-payment-type", e);
  };

  const updatePaymentSettings = () => {
    let data = {
      extra_fee: extraFee,
      id: listData.id,
      name: listData.name,
      payment_fee: paymentFee,
      status: editStatus,
    };

    dispatch(updateFiatPaymentTypeFn(data)).then((val) => {
      getDepositTransactions(type, status);
      setEditModal(false);
    });
  };

  const activateDeactivatePaymentType = (id, action, supported_currencies) => {
    let data = {
      id,
      status: action,
      supported_currencies,
    };

    dispatch(fiatPaymentTypeEditFn(data)).then((res) => {
      getDepositTransactions(type, status);
    });
  };

  useEffect(() => {
    getDepositTransactions(type, status);
  }, []);

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Fiat Payment Types" subtitle="" />
        <Card className="mb-4">
          <Card.Body>
            <Col lg={4}>
              <Form.Group>
                <Form.Control
                  as="select"
                  defaultValue="Status"
                  name="status"
                  id="status"
                  onChange={(e) => getFilterInputData(e, "status")}
                >
                  <option value={"DEPOSITS"} selected>
                    Deposit
                  </option>
                  <option value={"WITHDRAW"} selected>
                    Withdraw
                  </option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            {allFiatPaymentTypes !== undefined &&
            allFiatPaymentTypes.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Supported Currency</th>

                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allFiatPaymentTypes.map((list) => {
                    return (
                      <tr>
                        <td>{list?.name?.ENG}</td>

                        <td>
                          {list.supported_currencies != null
                            ? list.supported_currencies.toUpperCase()
                            : "-"}
                        </td>

                        <td>
                          <Form.Group>
                            <Form.Control
                              as="select"
                              defaultValue="Status"
                              name="status"
                              id="status"
                              value={list?.status}
                              onChange={(e) =>
                                activateDeactivatePaymentType(
                                  list.id,
                                  e.target.value,
                                  list.supported_currencies
                                )
                              }
                            >
                              <option value={0}>Inactive</option>
                              <option value={1}>Active</option>
                            </Form.Control>
                          </Form.Group>
                        </td>

                        <td className="pl-3 text-nowrap ">
                          <span className="edit_icon">
                            <a
                              className="view"
                              onClick={() => openModalUpdate(list)}
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
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Payment Fee</th>
                    <th>Extra Fee</th>
                    <th>Status</th>
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

export default FiatPaymentType;
