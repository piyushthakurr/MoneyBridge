import React, { useState } from "react";
import _ from "lodash/fp";
import { Card, Container, Button, Spinner, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { google2faAuthenticateFn } from "../../../Redux/Actions/user/user.action";

function GoogleLogin(props) {
  const { errors, register, handleSubmit } = useForm();
  const { token, SetToken } = useState("");

  const onSubmit = (data) => {
    const tempObj = { token: data.token };
    props.google2faAuthenticateFn(tempObj);
  };

  return (
    <div>
      <Container fluid className="main-content-container">
        <Card className="w-25 mx-auto" style={{ marginTop: "80px" }}>
          <br />
          <Card.Title>
            <h3 style={{ paddingLeft: "20px" }}> Google Authenticator </h3>
          </Card.Title>

          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group>
                <input
                  id="text"
                  type="text"
                  name="token"
                  ref={register({
                    required: true,
                  })}
                  placeholder="Enter your token here"
                  className="form-control"
                />

                {_.get("token.type", errors) === "required" && (
                  <p style={{ color: "red" }}>Token is required</p>
                )}
              </Form.Group>

              <div className="text-center mt-4">
                <Button
                  variant="info"
                  className="pl-10 pr-10 form-control"
                  type="submit"
                >
                  <Spinner
                    id="spinner"
                    style={{ display: "none" }}
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  LOGIN
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    //    token: state.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    google2faAuthenticateFn: (data) => dispatch(google2faAuthenticateFn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);
