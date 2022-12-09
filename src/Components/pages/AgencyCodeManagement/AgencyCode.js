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
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Icon, Pagination } from "semantic-ui-react";
import { limit } from "../../../Constants/constant";
import {
  deleteAgencycodeFn,
  getAgencycodeFn,
  updateAgencycodeFn,
} from "../../../Redux/Actions/AgencyManagement/agency.action";
import { deletAgencycodeApi } from "../../../Services/API/agencyManagement.service";
import PageTitle from "../../common/PageTitle";

export default function AgencyCode() {
  const dispatch = useDispatch();
  const [allAgencyCodes, setAllAgencyCodes] = useState();
  const [agencyCode, setAgencyCode] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [agencyId, setAgencyId] = useState();

  const [totalRecords, setTotalRecords] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAgencycodeList();
  }, [page]);

  const getAgencycodeList = () => {
    dispatch(getAgencycodeFn(page)).then((val) => {
      setAllAgencyCodes(val.agency_code);
      setTotalRecords(val.totalRecords);
    });
  };

  const deletAgencyModal = (id) => {
    setAgencyId(id);

    setDeleteModal(true);
  };

  const deleteAgencyCode = () => {
    let data = {
      id: agencyId,
    };
    dispatch(deleteAgencycodeFn(data)).then((val) => {
      setDeleteModal(false);
      getAgencycodeList();
    });
  };

  const openModal = () => {
    setUpdateModal(true);
  };

  const pageChange = (e, data) => {
    setPage(data.activePage);
  };

  const addCode = () => {
    setUpdateModal(false);

    let data = {
      agency_code: agencyCode,
    };

    dispatch(updateAgencycodeFn(data)).then((val) => {
      setAgencyCode("");
      getAgencycodeList();
    });
  };

  const handleChangeAddAgent = (e) => {
    if (e.target.value.length > 30) {
      return e.preventDefault();
    }
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Agency Code" subtitle="" />

        <Card>
          <Card.Header>
            <Button type="button" onClick={() => openModal()}>
              Add Code
            </Button>
          </Card.Header>

          <Card.Body>
            {allAgencyCodes != undefined && allAgencyCodes.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr.No.</th>
                    <th className="pl-3 text-nowrap">Agency Code</th>
                    <th className="pl-3 text-nowrap">Date</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allAgencyCodes.map((codeAgency, index) => {
                    return (
                      <tr>
                        <td className="pl-3 text-nowrap">
                          {page * 10 - (9 - index)}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {codeAgency?.agency_code}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {codeAgency?.created_at?.split("T")[0]}
                        </td>

                        <td className="pl-3 text-nowrap ">
                          <Row>
                            <Col>
                              <Button
                                type="button"
                                onClick={() => deletAgencyModal(codeAgency?.id)}
                              >
                                Delete
                              </Button>
                            </Col>
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
                    <th className="pl-3 text-nowrap">S.NO.</th>
                    <th className="pl-3 text-nowrap">Agency Code</th>
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
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={Math.ceil(totalRecords / limit)}
              />
            )}
          </Card.Body>
        </Card>

        <>
          <Modal show={updateModal} onHide={() => setUpdateModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Agency Code</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Col lg={12} md={12} sm={12}>
                <Form.Group className="mb-0">
                  <input
                    type="text"
                    name="code"
                    id="code"
                    placeholder="Enter agency code"
                    value={agencyCode?.trim()}
                    max="40"
                    onChange={(e) => setAgencyCode(e.target.value)}
                    className="form-control"
                  />
                </Form.Group>
              </Col>
            </Modal.Body>

            <Modal.Footer className="justify-content-end">
              <Button variant="secondary" onClick={() => setUpdateModal(false)}>
                Cancel
              </Button>{" "}
              <Button
                variant="primary"
                onClick={() => addCode()}
                disabled={agencyCode.length < 2}
              >
                Add
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Agency Code</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Col lg={12} md={12} sm={12}>
                Are you sure to delete the agency code?
              </Col>
            </Modal.Body>

            <Modal.Footer className="justify-content-end">
              <Button variant="secondary" onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>{" "}
              <Button variant="primary" onClick={() => deleteAgencyCode()}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </div>
  );
}
