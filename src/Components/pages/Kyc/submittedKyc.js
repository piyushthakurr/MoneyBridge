import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PageTitle from "../../common/PageTitle";
import { submittedKycFn } from "../../../Redux/Actions/user/user.action";
import { useDispatch } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import { limit } from "../../../Constants/constant";
import "../user/Users.css";
import "../../../App.css";

import ImportCsv from "../../common/common";

function UserSubmittedKyc() {
  const dispatch = useDispatch();
  const [submittedKycData, setSubmittedKycData] = useState();
  const [searchData, setSearchData] = useState("");

  const [page, setPage] = useState(1);

  const [kycCount, setKycCount] = useState(10);
  const [StateCsvData, setStateCsvData] = useState();

  const clearSearch = () => {
    setSearchData("");
    let searchedParams = {
      page: page,
      search: "",
      status: "0,3",
      kyc_level: 3,
    };

    dispatch(submittedKycFn(searchedParams)).then((val) => {
      setSubmittedKycData(val.listing);
      setKycCount(val?.totalRecords);
    });
  };

  const pageChange = (e, data) => {
    setPage(data.activePage);
    // let pageNo = page === 1 ? 0 : (page - 1) * limit;

    // let searchedParams = { page: page };
    // this.props.getUsersFn(searchedParams);
  };

  const searchValues = () => {
    // let { submittedKycFn } = this.props;

    let searchedData = {
      page: page,
      search: searchData,
      status: "0,3",
      kyc_level: 3,
    };

    dispatch(submittedKycFn(searchedData)).then((val) => {
      setSubmittedKycData(val.listing);
      setKycCount(val?.totalRecords);
    });
  };

  // const keyEnter = (e) => {
  //   console.log(e);
  //   if (e.which === 13) {
  //     e.preventDefault();
  //     searchValues();
  //   }
  // };

  const getSearchData = (e) => {
    this.setState({ searchedData: e.target.value });
    if (e.target.value == "") {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  };

  useEffect(() => {
    searchValues();
  }, [page]);

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Submitted KYC Documents" subtitle="" />
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
        {/* <ImportCsv stateCsvData={StateCsvData} file_name={"Submitted Kyc"} /> */}
        <Card className="mb-4">
          <Card.Body>
            {submittedKycData != undefined && submittedKycData.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>KYC Submitted Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedKycData.map((submitKycData) => {
                    return (
                      <tr>
                        <td>
                          {submitKycData?.firstname} {submitKycData?.lastname}
                        </td>

                        <td>{submitKycData?.email}</td>

                        <td>{submitKycData?.submitted_at?.split("T")[0]}</td>

                        <td className="pl-3 text-nowrap inner_btn edit_icon">
                          <Link
                            className="view"
                            to={`/auth/kycDetail/${submitKycData?.users_id}`}
                          >
                            <Icon name="eye" />
                          </Link>
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
                    <th>Name</th>
                    <th>Email Address</th>
                    <th>KYC Submitted Date</th>
                    <th>Action</th>
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
      </Container>
    </div>
  );
}

export default UserSubmittedKyc;
