import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Form,
  Button,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import PageTitle from "../../../common/PageTitle";
import { submittedKycFn } from "../../../../Redux/Actions/user/user.action";
import { connect, useDispatch } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import { limit } from "../../../../Constants/constant";
import "../../user/Users.css";
import "../../../../App.css";

import ImportCsv from "../../../common/common";

function ApprovedUsersList() {
  const dispatch = useDispatch();
  const [submittedKycData, setSubmittedKycData] = useState();
  const [stateCsvData, setStateCsvData] = useState();
  const [searchData, setSearchData] = useState();
  const [kycCount, setKycCount] = useState();

  const [deletedataPopup, setDeletedataPopup] = useState(false);

  const [page, setPage] = useState(1);

  const fetchApprovedUserList = (searchedParams) => {
    dispatch(submittedKycFn(searchedParams)).then((val) => {
      setSubmittedKycData(val?.listing);
      setKycCount(val?.totalRecords);
      let statementCsvData = [];
      if (val.listing !== undefined && val.listing.length > 0) {
        val.listing.map((stateData) => {
          let data = {
            Name:
              stateData.firstname != null || stateData.lastname != null
                ? stateData?.firstname + " " + stateData?.lastname
                : "N/A",
            Email: stateData.email != null ? stateData?.email : "N/A",
            "Kyc Submitted Date":
              stateData.submitted_at != null
                ? stateData.submitted_at.split("T")[0]
                : "N/A",
          };

          statementCsvData.push(data);
        });
        setStateCsvData(statementCsvData);
      }
    });
  };

  useEffect(() => {
    let searchedParams = { page: page, search: "", status: "1" };

    fetchApprovedUserList(searchedParams);
  }, [page]);

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  const searchValues = () => {
    let searchedData = {
      page: page,
      search: searchData,
      status: "1",
    };

    fetchApprovedUserList(searchedData);
  };

  const clearSearch = () => {
    setSearchData("");
    let searchedData = {
      page: page,
      search: "",
      status: "1",
    };

    fetchApprovedUserList(searchedData);
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Members - Approved" subtitle="" />
        <Card className="mb-4">
          <Card.Body>
            <Row>
              <Col xl={4} md={6} xs={12}>
                <Form.Group className="mb-0">
                  <Form.Control
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search"
                    value={searchData}
                    onChange={(e) => setSearchData(e.target.value)}
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
        {/* <ImportCsv stateCsvData={stateCsvData} file_name={"users"} /> */}

        <Card>
          <Card.Body>
            {submittedKycData != undefined && submittedKycData.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Name</th>
                    <th className="pl-3 text-nowrap">Email Address</th>
                    <th className="pl-3 text-nowrap">KYC Submitted Date</th>
                    <th className="pl-3 text-nowrap">KYC Approved Date</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedKycData.map((submitKycData) => {
                    return (
                      <tr>
                        <td className="pl-3 text-nowrap">
                          {submitKycData?.firstname} {submitKycData?.lastname}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {submitKycData?.email}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {submitKycData?.submitted_at?.split("T")[0]}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {submitKycData?.submitted_at?.split("T")[0]}
                        </td>

                        <td className="pl-3 text-nowrap edit_icon">
                          <Link
                            className="view"
                            to={`/auth/approvekycDetail/${submitKycData?.users_id}`}
                          >
                            <Icon style={{ color: "" }} name="eye" />{" "}
                          </Link>{" "}
                          <Link
                            className="view"
                            to={`/auth/member-approved-edit/${submitKycData?.users_id}`}
                          >
                            <Icon name="pencil alternate" />{" "}
                          </Link>{" "}
                          {/* <Link className="dlt">
                            <Icon
                              name="trash alternate"
                          
                            />{" "}
                          </Link> */}
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
                    <th className="pl-3 text-nowrap">Name</th>
                    <th className="pl-3 text-nowrap">Email Address</th>
                    <th className="pl-3 text-nowrap">KYC Submitted Date</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Record Found
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}

            {kycCount != undefined && kycCount > limit && (
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
                totalPages={Math.ceil(kycCount / limit)}
              />
            )}
          </Card.Body>
        </Card>
        {deletedataPopup && (
          <Modal
            // show={deletedataPopup}
            // onHide={handleClose}
            keyboard={false}
            className="logoutModal"
          >
            <Modal.Header closeButton>
              {/* <Modal.Title>Modal title</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>Are you sure want to delete ?</Modal.Body>
            <Modal.Footer className="justify-content-end">
              <Button
                variant="secondary"
                // onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                tag={Link}
                // onClick={() => deleteKycData(deletedId)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
}

export default ApprovedUsersList;
