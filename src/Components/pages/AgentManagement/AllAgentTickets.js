import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Button,
  Dropdown,
  Modal,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import PageTitle from "../../common/PageTitle";
import dateFormat from "dateformat";

import "react-datepicker/dist/react-datepicker.css";
import { connect, useDispatch } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import { limit } from "../../../Constants/constant";
//import "./Users.css";
import "../../../App.css";

import {
  approveDisapproveAgentFn,
  getAgentlistFn,
  getAgentTicketFn,
} from "../../../Redux/Actions/AgentManagement/agent.action";

function AllAgentTickets() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [merchantList, setMerchantList] = useState([]);
  const [filterData, setFilterData] = useState({ coin: "USD" });
  const [totalRecords, setTotalRecords] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const [actiontype, setActionType] = useState();
  const [approveRequestHandle, setApproveRequestHandle] = useState();
  const [searchData, setSearchData] = useState("");
  const [clearSrch, setclearSearch] = useState(false);

  useEffect(() => {
    getAgentTicketlist();
  }, [page, clearSrch]);

  const getAgentTicketlist = () => {
    let searchedData = {
      page: page,
      search: searchData,
    };
    dispatch(getAgentTicketFn(searchedData)).then((res) => {
      setMerchantList(res?.listing);
      setTotalRecords(res?.totalRecords);
    });
  };

  const searchValues = () => {
    setclearSearch(false);
    getAgentTicketlist();
  };

  //   useEffect(() => {
  //     getDepositTransactions();
  //   }, [page, filterData?.coin]);

  const clearSearch = () => {
    setPage(1);
    setSearchData("");
    setclearSearch(true);
  };

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  const getFilterInputData = (e, type) => {
    let filterDatas = { ...filterData };

    if (type == "coin") {
      setPage(1);
      filterDatas.coin = e.target.value;
    } else if (type == "status") {
      filterDatas.status = e.target.value;
    } else if (type == "reason") {
      filterDatas.reason = e.target.value;
    }

    setFilterData(filterDatas);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Ticket List" subtitle="" />
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col lg={4} md={12}>
                <Form.Group className="mb-0">
                  <Form.Control
                    type="search"
                    name="search"
                    id="search"
                    value={searchData}
                    placeholder="Search"
                    onChange={(e) => setSearchData(e.target.value)}
                    // onKeyPress={(e) => keyEnter(e)}
                  />
                </Form.Group>
              </Col>

              <Col lg={4} md={12}>
                <Button
                  variant="primary"
                  type="SUBMIT"
                  onClick={() => searchValues()}
                >
                  Search
                </Button>{" "}
                <Button className="ml-2 yl-btn" onClick={() => clearSearch()}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className="box_deco">
          <Row className="justify-content-end no-gutters">
            {merchantList != undefined && merchantList.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr No</th>

                    <th className="pl-3 text-nowrap">User Email ID</th>
                    <th className="pl-3 text-nowrap">Agent Email ID</th>
                    <th className="pl-3 text-nowrap">Ticket Code</th>

                    <th className="pl-3 text-nowrap">Date</th>
                    {/* <th className="pl-3 text-nowrap">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {merchantList.map((merchantData, index) => {
                    const convertDate = (str) => {
                      return dateFormat(str, ' d "" mmm, yyyy "" h:MM');
                    };
                    return (
                      <tr>
                        <td>{page * 10 - (9 - index)}</td>

                        <td className="pl-3 text-nowrap">
                          {merchantData?.useremail}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {merchantData?.agtemail}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {merchantData?.ticket_code}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {convertDate(merchantData?.created_at)}
                        </td>
                        {/* <td className="pl-3 text-nowrap ">
                          {merchantData?.merchant_status == 1 ? (
                            <p style={{ color: "#129857" }}>Approved</p>
                          ) : merchantData?.merchant_status == 2 ? (
                            <p style={{ color: "#ff0909" }}>Declined</p>
                          ) : merchantData?.merchant_status == 0 ? (
                            <Row>
                              <Col
                                lg={4}
                                md={6}
                                sm={12}
                                text-nowrap
                                className="text-nowrap"
                              >
                                <Button
                                  variant="primary"
                                  type="SUBMIT"
                                  value="approve"
                                  onClick={() =>
                                    openModal("approve", merchantData, index)
                                  }
                                >
                                  Approve
                                </Button>
                                {"  "}
                                <Button
                                  variant="danger"
                                  className="ml-2"
                                  value="decline"
                                  onClick={() =>
                                    openModal("decline", merchantData, index)
                                  }
                                >
                                  Reject
                                </Button>
                              </Col>
                            </Row>
                          ) : (
                            ""
                          )}
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr No</th>
                    <th className="pl-3 text-nowrap">User Email ID</th>
                    <th className="pl-3 text-nowrap">Agent Email ID</th>
                    <th className="pl-3 text-nowrap">Ticket Code</th>
                    <th className="pl-3 text-nowrap">Date</th>
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
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default AllAgentTickets;
