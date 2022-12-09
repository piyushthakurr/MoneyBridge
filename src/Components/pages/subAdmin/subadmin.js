import React, { useEffect, useState } from "react";
import { Table, Form, Button, Container, Row, Card } from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import { useHistory } from "react-router";

import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import "../../../App.css";

import {
  getSubadminListFn,
  deleteSubadminFn,
} from "../../../Redux/Actions/subadmin/subadmin.action";
import { Pagination, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { limit } from "../../../Constants/constant";

function Subadmin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [getAllSubadmin, setAllSubadmin] = useState();
  const [totalRecords, settotalRecords] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSubadminList();
  }, [page]);

  const fetchSubadminList = () => {
    let data = {
      page: page,
    };
    dispatch(getSubadminListFn(data)).then((val) => {
      setAllSubadmin(val?.data?.listing);
      settotalRecords(val?.total);
    });
  };

  const pageChange = (e, data) => {
    // let page = data.activePage;
    // let pageNo = page === 1 ? 0 : (page - 1) * limit;

    setPage(data.activePage);

    // let searchedParams = { page: page };
  };

  const deleteSubadmin = () => {
    dispatch(deleteSubadminFn()).then((val) => {
      fetchSubadminList();
    });
  };

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Sub-Admin-Management" subtitle="" />
        <div className="import-btn d-flex justify-content-end mb-3">
          <Button
            onClick={() =>
              history.push("/auth/sub-admin-management/sub-admin-new")
            }
          >
            Add New
          </Button>
        </div>
        <Card>
          <Card.Body>
            {getAllSubadmin != undefined && getAllSubadmin.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">User ID</th>
                    <th className="pl-3 text-nowrap">Email Address</th>
                    <th className="pl-3 text-nowrap">Country</th>

                    <th className="pl-3 text-nowrap">Status</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllSubadmin.map((subadminData) => {
                    return (
                      <tr>
                        <td className="pl-3 text-nowrap">
                          <p
                            style={{
                              whiteSpace: "nowrap",
                              width: "250px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {subadminData?.admin_users_id || "-"}
                          </p>
                        </td>

                        <td className="pl-3 text-nowrap">
                          {" "}
                          {subadminData?.email || "-"}{" "}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {" "}
                          {subadminData?.country || "-"}{" "}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {subadminData.status == 1 && "Active"}
                        </td>

                        <td className="pl-3 text-nowrap">
                          <span className="edit_icon">
                            <Link
                              className="view"
                              to={`/auth/sub-admin-management/sub-admin-edit/${subadminData.admin_users_id}`}
                            >
                              <Icon name="pencil alternate" />
                            </Link>{" "}
                          </span>
                          {/* |{" "} */}
                          {/* <Icon
                              onClick={() => deleteSubadmin()}
                              name="trash alternate"
                              style={{ color: "red", cursor: "pointer" }}
                            /> */}
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
                    <th className="pl-3 text-nowrap">ID</th>
                    <th className="pl-3 text-nowrap">Email Address</th>
                    <th className="pl-3 text-nowrap">Status</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <p>No Record Found</p>
                </tbody>
              </Table>
            )}

            {totalRecords !== undefined && totalRecords > limit && (
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
      </Container>
    </div>
  );
  // }
}

export default Subadmin;
