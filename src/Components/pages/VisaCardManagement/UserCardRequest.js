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
  assignCardToUserFn,
  getUserCardReqFn,
  getVisaCardFn,
} from "../../../Redux/Actions/VisaCard/VisaCard.action";
import PageTitle from "../../common/PageTitle";
import { useHistory } from "react-router";

export default function UserCardRequest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [allCardUsers, setAllCardUsers] = useState();
  const [allCardNumbers, setAllCardNumbers] = useState();
  const [singleUserData, setSingleUserData] = useState();

  const [showCardList, setShowCardList] = useState(false);

  const [totalRecords, setTotalRecords] = useState();
  const [page, setPage] = useState(1);
  const { register, handleSubmit, setValue, errors } = useForm({
    reValidateMode: "onChange",
    defaultValues: {},
  });

  useEffect(() => {
    getUserCardRequestList();
  }, []);

  const getUserCardRequestList = () => {
    dispatch(getUserCardReqFn(page)).then((val) => {
      setAllCardUsers(val);
      setTotalRecords(val.totalRecords);
    });
  };

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  const cardListPage = (cardRequestUserData) => {
    // history.push(
    //   "/auth/visa-card-management/add-assign-card",
    //   cardRequestUserData
    // );

    setSingleUserData(cardRequestUserData);
    let type = {
      type: "0",
    };
    dispatch(getVisaCardFn(page, type)).then((val) => {
      setShowCardList(true);
      setAllCardNumbers(val);
      setTotalRecords(val.totalRecords);
    });
  };

  const assignCardToUser = (cardId) => {
    let data = {
      card_id: cardId,
      member_id: singleUserData.memberid,
    };

    dispatch(assignCardToUserFn(data)).then((res) => {
      setShowCardList(false);
      getUserCardRequestList();
    });
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="User Card Request" subtitle="" />
        {showCardList && (
          <div lg={12} className="mb-4 d-flex justify-content-end">
            <Button
              style={{ cursor: "pointer" }}
              onClick={() => setShowCardList(false)}
            >
              Back
            </Button>
          </div>
        )}

        {!showCardList && (
          <Card>
            <Card.Body>
              {allCardUsers != undefined && allCardUsers.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="pl-3 text-nowrap">Sr.No.</th>
                      <th className="pl-3 text-nowrap">Email</th>
                      <th className="pl-3 text-nowrap">Date</th>
                      <th className="pl-3 text-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCardUsers.map((cardUserList, index) => {
                      return (
                        <tr>
                          <td className="pl-3 text-nowrap">
                            {page * 10 - (9 - index)}

                            {/* {index + 1} */}
                          </td>

                          <td className="pl-3 text-nowrap">
                            {cardUserList?.email}
                          </td>

                          <td className="pl-3 text-nowrap">
                            {cardUserList?.created_at?.split("T")[0]}
                          </td>

                          <td className="pl-3 text-nowrap ">
                            <Row>
                              {cardUserList?.status == 0 && (
                                <Col>
                                  <Button
                                    type="button"
                                    onClick={() => cardListPage(cardUserList)}
                                  >
                                    Assign
                                  </Button>{" "}
                                </Col>
                              )}
                              {cardUserList?.status == 1 && (
                                <Col>
                                  <h4>Assigned</h4>
                                </Col>
                              )}
                              {cardUserList?.status == 2 && (
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
                      <th className="pl-3 text-nowrap">Email</th>
                      <th className="pl-3 text-nowrap">Date</th>
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
                  nextItem={{
                    content: <Icon name="angle right" />,
                    icon: true,
                  }}
                  totalPages={Math.ceil(totalRecords / limit)}
                />
              )}
            </Card.Body>
          </Card>
        )}

        {showCardList && (
          <Card>
            <Card.Body>
              {allCardNumbers != undefined && allCardNumbers.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th className="pl-3 text-nowrap">Sr.No.</th>
                      <th className="pl-3 text-nowrap">Card Number</th>
                      <th className="pl-3 text-nowrap">Expiry Date</th>

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
                            {cardList?.expiry_month +
                              "/" +
                              cardList?.expiry_year}
                          </td>

                          <td className="pl-3 text-nowrap ">
                            <Row>
                              {cardList?.status == 0 && (
                                <Col>
                                  <Button
                                    type="button"
                                    onClick={() =>
                                      assignCardToUser(cardList?.cardid)
                                    }
                                  >
                                    Select
                                  </Button>{" "}
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
                  nextItem={{
                    content: <Icon name="angle right" />,
                    icon: true,
                  }}
                  totalPages={Math.ceil(totalRecords / limit)}
                />
              )}
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}
