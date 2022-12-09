import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Spinner } from "react-bootstrap";
import "./LoaderStyle.css";

class LoaderComponent extends Component {
  render() {
    if (this.props.loading) {
      return (
        <Container className="loader_style" fluid>
          <Spinner animation="border" />
        </Container>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loader.loading,
  };
};

export default connect(mapStateToProps)(LoaderComponent);
