import React, { useEffect, useState } from "react";
import PageTitle from "../common/PageTitle";
import {
  getDashboardCountsFn,
  getUsersFn,
  getActiveUsersFn,
  tradeByMonthFn,
  tradeVolumeFn,
  activeCoinsFn,
  getDashboardCryptoCountsFn,
  getDashboardFiatCountsFn,
} from "../../Redux/Actions/dashboard/dashboard.action";
import { connect } from "react-redux";
import { Card, Col, FormLabel, Table, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const [dashboardCounts, setDashboardCounts] = useState();
  const [cryptoCounts, setCryptoCounts] = useState();
  const [fiatCounts, setFiatCounts] = useState();

  const fetchCountList = (val) => {
    dispatch(getDashboardCountsFn()).then((res) => {
      setDashboardCounts(res);
    });
    dispatch(getDashboardCryptoCountsFn()).then((res) => {
      setCryptoCounts(res);
    });
    dispatch(getDashboardFiatCountsFn()).then((res) => {
      setFiatCounts(res);
    });
  };

  // useEffect(() => {
  //   fetchCountList();
  // }, []);

  return (
    <Container fluid className="main-content-container px-4 dashbd_page">
      {/* Page Header */}
      <PageTitle
        title="Dashboard"
        /* subtitle="Admin" */
      />
      <div className="dashboard_status">
        <Row className="py-12">
          <Col lg={12} md={12} style={{ textAlign: "center" }}>
            <h2 style={{ textAlign: "center", paddingTop: "30px" }}>
              Coming Soon!
            </h2>

            {/* <Card
              className="w-100"
              style={{ width: "15rem", backgroundColor: "#947FFE" }}
            >
              <Link to="/auth/user-management/traders">
                <Card.Body>
                  <Card.Title>
                    <h4 className="text-white"> </h4>
                  </Card.Title>
                  <Card.Text>
                    <h1 className="text-white">
                      {" "}
                      {dashboardCounts?.totalTraders
                        ? dashboardCounts.totalTraders
                        : 0}{" "}
                    </h1>
                  </Card.Text>
                </Card.Body>
              </Link>
            </Card> */}
          </Col>
        </Row>
      </div>

      <br />
    </Container>
  );
}

export default Dashboard;
