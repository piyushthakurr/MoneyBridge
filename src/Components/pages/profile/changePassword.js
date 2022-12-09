import React, { useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Dropdown,
  Card,
} from "react-bootstrap";
import PageTitle from "../../common/PageTitle";

import { connect } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import "../../../App.css";

import { useForm } from "react-hook-form";
import _ from "lodash/fp";

import { getSubadminListFn } from "../../../Redux/Actions/subadmin/subadmin.action";
import { changePasswordFn } from "../../../Redux/Actions/profile/profile.actions";
import { PERMISSONS } from "../../../Constants/constant";
import HidePassword from "./images/eye_close.png";
import showPassword from "./images/eye_open.png";
import "./profile.css";
function Users(props) {
  const [permission, setPermission] = useState([]);
  const [oldpassword, setshowoldpassword] = useState(false);
  const [newpassword, setnewpassword] = useState(false);
  const [confirmpwd, setconfirmpaswd] = useState(false);

  const { register, handleSubmit, watch, reset, errors } = useForm({
    reValidateMode: "onChange",
    defaultValues: {},
  });

  const password = useRef({});
  password.current = watch("new_password", "");

  const onSubmit = (data) => {
    delete data.confirmPassword;
    props.changePasswordFn(data);
  };
  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Change Password" subtitle="" />
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg={4} md={12}>
                  <Form.Label>Old Password</Form.Label>
                  <Form.Group className="pwcol">
                    <Form.Control
                      type={oldpassword ? "text" : "password"}
                      name="old_password"
                      placeholder="Old Password"
                      ref={register({
                        required: true, //validation_messages.password_required,
                        /*  pattern: {
                                                         value: /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                                                         message: 'Password must contain atleast 1 small-case letter, 1 Capital letter, 1 digit, 1 special character and the length should be minium 8 characters.'
                                                     } */
                      })}
                    />
                    <a
                      className="showPassword"
                      onClick={() => setshowoldpassword(!oldpassword)}
                    >
                      {oldpassword ? (
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
                    {_.get("old_password.type", errors) === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}
                  </Form.Group>{" "}
                </Col>

                <Col lg={4} md={12}>
                  <Form.Label>New Password</Form.Label>
                  <Form.Group className="pwcol">
                    <Form.Control
                      type={newpassword ? "text" : "password"}
                      name="new_password"
                      placeholder="New Password"
                      ref={register({
                        required: true, //validation_messages.password_required,
                        pattern: {
                          value:
                            /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                          message:
                            "Password must contain atleast 1 small-case letter, 1 Capital letter, 1 digit, 1 special character and the length should be minium 8 characters.",
                        },
                      })}
                    />
                    <a
                      className="showPassword"
                      onClick={() => setnewpassword(!newpassword)}
                    >
                      {newpassword ? (
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
                    {_.get("new_password.type", errors) === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}

                    {errors.new_password && (
                      <p style={{ color: "red" }}>
                        {errors.new_password.message}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={4} md={12}>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Group className="pwcol">
                    <Form.Control
                      type={confirmpwd ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      ref={register({
                        required: true,

                        validate: (value) =>
                          value === password.current ||
                          "The passwords do not match",

                        //pattern: /^[A-Za-z]+$/i
                      })}
                    />
                    <a
                      className="showPassword"
                      onClick={() => setconfirmpaswd(!confirmpwd)}
                    >
                      {confirmpwd ? (
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
                    {_.get("confirmPassword.type", errors) === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}

                    {errors.confirmPassword && (
                      <p style={{ color: "red" }}>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col lg={4} md={12} className="mt-3">
                  <Button variant="primary" type="submit">
                    {" "}
                    Update{" "}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    //pairListData: state.orders.pairListData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getPairListFn: (data) => dispatch(getPairListFn(data))
    changePasswordFn: (data) => dispatch(changePasswordFn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
