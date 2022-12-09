import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
  Button,
  Spinner,
} from "react-bootstrap";
import _ from "lodash/fp";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Icon, Pagination } from "semantic-ui-react";
import { limit } from "../../../Constants/constant";

import {
  addVisaCardFn,
  deleteCardDetailsFn,
  getVisaCardFn,
  updateVisaCardFn,
} from "../../../Redux/Actions/VisaCard/VisaCard.action";
import PageTitle from "../../common/PageTitle";
import moment from "moment";

export default function AddAssignCard() {
  const dispatch = useDispatch();
  const [allCardNumbers, setAllCardNumbers] = useState();

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [deletCardModal, setDeletCardModal] = useState(false);
  const [valuesEdit, setValuesEdit] = useState({});

  const [totalRecords, setTotalRecords] = useState();
  const [page, setPage] = useState(1);
  const { register, handleSubmit, setValue, errors } = useForm({
    reValidateMode: "onChange",
    defaultValues: {},
  });
  const onSubmit = (data) => {
    if (addModal && !editModal) {
      dispatch(addVisaCardFn(data)).then((res) => {
        setShowModal(false);

        getVisaCardList();
      });
    }
    if (editModal && !addModal) {
      dispatch(updateVisaCardFn(data, valuesEdit?.cardid)).then((res) => {
        setShowModal(false);

        getVisaCardList();
      });
    }
  };

  useEffect(() => {
    getVisaCardList();
  }, []);

  useEffect(() => {
    setValue("card_num", valuesEdit.card_number);
    setValue("exp_month", valuesEdit.expiry_month);
    setValue("exp_year", valuesEdit.expiry_year);
  }, [valuesEdit]);

  const getVisaCardList = () => {
    let type = {};
    dispatch(getVisaCardFn(page, type)).then((val) => {
      setAllCardNumbers(val);
      setTotalRecords(val.totalRecords);
    });
  };

  const deleteCardModal = (val) => {
    setValuesEdit(val);
    setDeletCardModal(true);
  };

  const deleteCarddetails = () => {
    dispatch(deleteCardDetailsFn(valuesEdit?.cardid)).then((val) => {
      setDeletCardModal(false);
      getVisaCardList();
    });
  };

  const openModal = () => {
    setAddModal(true);
    setEditModal(false);
    setShowModal(true);
  };

  const handleChangeAddAgent = (e) => {
    if (e.target.value.length > 16) {
      console.log(e);

      return e.preventDefault();
    }
  };

  const editCardDetails = (values) => {
    setValuesEdit(values);
    setEditModal(true);
    setAddModal(false);
    setShowModal(true);
  };

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Visa Card" subtitle="" />

        <Card>
          <Card.Header>
            <Button type="button" onClick={() => openModal()}>
              Add Card
            </Button>
          </Card.Header>

          <Card.Body>
            {allCardNumbers != undefined && allCardNumbers.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr.No.</th>
                    <th className="pl-3 text-nowrap">Card Number</th>
                    <th className="pl-3 text-nowrap">Expiry Date</th>
                    <th className="pl-3 text-nowrap">Email</th>

                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allCardNumbers.map((cardList, index) => {
                    return (
                      <tr>
                        <td className="pl-3 text-nowrap">
                          {page * 10 - (9 - index)}

                          {/* {index + 1} */}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {cardList?.card_number}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {cardList?.expiry_month + "/" + cardList?.expiry_year}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {cardList?.email || "-"}
                        </td>

                        <td className="pl-3 text-nowrap ">
                          <Row>
                            {cardList?.status == 0 && (
                              <Col>
                                <Button
                                  type="button"
                                  onClick={() => editCardDetails(cardList)}
                                >
                                  Edit
                                </Button>{" "}
                                <Button
                                  type="button"
                                  onClick={() => deleteCardModal(cardList)}
                                >
                                  delete
                                </Button>
                              </Col>
                            )}
                            {cardList?.status == 1 && (
                              <Col>
                                <h4>Assigned</h4>
                              </Col>
                            )}
                            {cardList?.status == 2 && (
                              <Col>
                                <h4>Expired</h4>
                              </Col>
                            )}
                          </Row>
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
                    <th className="pl-3 text-nowrap">Sr.No.</th>
                    <th className="pl-3 text-nowrap">Card Number</th>
                    <th className="pl-3 text-nowrap">Expiry Date</th>
                    <th className="pl-3 text-nowrap">Email</th>

                    <th className="pl-3 text-nowrap">Action</th>
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

            {totalRecords != undefined && totalRecords > limit && (
              <Pagination
                activePage={page}
                onPageChange={(e, data) => pageChange(e, data)}
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

        <>
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {addModal ? "Add" : ""} {editModal ? "Update" : ""} Visa Card
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                  <Col lg={12} md={12} sm={12}>
                    <Form.Group className="mb-0">
                      <input
                        type="number"
                        name="card_num"
                        id="card_num"
                        placeholder="Enter card number"
                        onChange={(e) => handleChangeAddAgent(e)}
                        ref={register({
                          required: true,
                          maxLength: 16,
                          minLength: 16,
                        })}
                        className="form-control"
                      />
                      {_.get("card_num.type", errors) === "required" && (
                        <p>Card number is required</p>
                      )}
                      {_.get("card_num.type", errors) === "maxLength" && (
                        <p style={{ color: "red" }}>
                          Card Number Must be 16 numbers
                        </p>
                      )}
                      {_.get("card_num.type", errors) === "minLength" && (
                        <p style={{ color: "red" }}>
                          Card Number Must be 16 numbers
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} md={6} sm={6}>
                    <Form.Group className="mb-0">
                      <Form.Control
                        as="select"
                        name="exp_month"
                        id="exp_month"
                        ref={register({
                          required: true,
                          maxLength: 40,
                        })}
                      >
                        {moment.months().map((month, index) => {
                          return <option value={index + 1}>{month}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col lg={6} md={6} sm={6}>
                    <Form.Group className="mb-0">
                      <Form.Control
                        as="select"
                        name="exp_year"
                        id="exp_year"
                        ref={register({
                          required: true,
                          maxLength: 40,
                        })}
                      >
                        {Array.from(new Array(10), (v, i) => (
                          <option key={i} value={new Date().getFullYear() + i}>
                            {new Date().getFullYear() + i}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <Button variant="primary" className="pl-5 pr-5" type="submit">
                    <Spinner
                      id="spinner"
                      style={{ display: "none" }}
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    <span id="submit-login">
                      {addModal ? "Add" : ""} {editModal ? "Update" : ""} Visa
                      Card
                    </span>{" "}
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>

          <Modal show={deletCardModal} onHide={() => setDeletCardModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Card </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Col lg={12} md={12} sm={12}>
                Are you sure to delete the Card?
              </Col>
            </Modal.Body>

            <Modal.Footer className="justify-content-end">
              <Button
                variant="secondary"
                onClick={() => setDeletCardModal(false)}
              >
                Cancel
              </Button>{" "}
              <Button variant="primary" onClick={() => deleteCarddetails()}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </div>
  );
}
