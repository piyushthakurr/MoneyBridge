import React, { useState } from "react";
import { Row, Col, Modal, Button, Form, Spinner } from "react-bootstrap";
import _ from "lodash/fp";
import ReactDOM from "react-dom";
import "./Login.css";
import logo from "../../../images/logo.svg";
import { useForm } from "react-hook-form";
import HidePassword from "../profile/images/eye_close.png";
import showPassword from "../profile/images/eye_open.png";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "../../Toast/toast.component";
import {
  startLoader,
  stopLoader,
} from "../../../Redux/Actions/Loader/loader.action";
import { RECAPTCHAKEY } from "../../../Constants/constant";
import { useDispatch, useSelector } from "react-redux";

// import { toast } from "../../Toast/toast.component";
function Login(props) {
  const recaptchaRef = React.createRef();
  const { register, handleSubmit, watch, errors } = useForm();
  const [showpassword, setshowpassword] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    if (recaptchaValue) {
      dispatch(startLoader());
      props.handleFormSubmit(data);
      // dispatch(stopLoader());
      window.grecaptcha.reset();
    } else {
      toast.error("Recaptcha verification is required.");
    }
  };

  const onChangeRecaptcha = (e) => {
    setRecaptchaValue(e);
  };

  let showmodal = true;
  return (
    <div>
      <div className="Login log_des">
        {/* <loaderComponent></loaderComponent> */}

        <Modal
          show={/* this.state. */ showmodal}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="pb-4">
            <Row className="justify-content-center">
              <Col sm={12} className="justify-content-center d-flex pb-4">
                <img src={logo} />
              </Col>
              <Col sm={12}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <input
                      id="email"
                      //type="email"
                      name="email"
                      ref={register({
                        required: true,
                        //maxLength: 20,
                        pattern: /^\S+@\S+$/i,
                      })}
                      className="form-control"
                    />

                    {_.get("email.type", errors) === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}

                    {_.get("email.type", errors) === "pattern" && (
                      <p style={{ color: "red" }}>Email address not valid</p>
                    )}
                  </Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Group className="formBasicPassword mb-3">
                    <input
                      id="password"
                      type={showpassword ? "text" : "password"}
                      name="password"
                      ref={register({
                        required: true,
                        //pattern: /^[A-Za-z]+$/i
                      })}
                      className="form-control"
                    />
                    <a
                      className="showPassword"
                      onClick={() => setshowpassword(!showpassword)}
                    >
                      {showpassword ? (
                        <img
                          className="light_icon"
                          src={showPassword}
                          width="20"
                        />
                      ) : (
                        <img
                          className="blue_icon"
                          src={HidePassword}
                          width="20"
                        />
                      )}
                    </a>
                    {_.get("password.type", errors) === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}
                  </Form.Group>

                  <Form.Group>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHAKEY}
                      onChange={(e) => onChangeRecaptcha(e)}
                    />
                    ,
                  </Form.Group>

                  <div className="text-center mt-4">
                    <Button
                      variant="primary"
                      className="pl-5 pr-5"
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
                      <span id="submit-login">Submit</span>{" "}
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Login;
