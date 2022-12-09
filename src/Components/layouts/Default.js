import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "react-bootstrap";

import MainNavbar from "../common/MainNavbar/MainNavbar";
import MainSidebar from "../common/MainSidebar/MainSidebar";
import MainFooter from "../common/MainFooter";
//import LoaderComponent from '../components/Loader/loader.component';
import { connect } from "react-redux";

const DefaultLayout = (props) => {
  return (
    <div>
      {/*   <LoaderComponent></LoaderComponent> */}
      <Container
        fluid
        // style={
        //   props.loading === true ? { display: "none" } : { display: "block" }
        // }
      >
        <Row>
          <MainSidebar />
          <Col
            className="main-content p-0 ml-0"
            lg={{ size: 10, offset: 2 }}
            tag="main"
          >
            {!props.noNavbar && <MainNavbar />}
            {props.children}
            {/* {!noFooter && <MainFooter />} */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
};

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
  };
};

export default connect(mapStateToProps, null)(DefaultLayout);
