import React, { useEffect, useRef, useState } from "react";
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

import { connect, useDispatch } from "react-redux";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import "../../../App.css";

import { useForm } from "react-hook-form";
import _ from "lodash/fp";

import { addSubadminFn } from "../../../Redux/Actions/subadmin/subadmin.action";
import { COUNTRY, PERMISSONS } from "../../../Constants/constant";

function AddSubadmin(props) {
  const [permission, setPermission] = useState([]);
  const [country, setSelectedCountry] = useState([]);

  const dispatch = useDispatch();
  const [allotedPermission, setallotedPermission] = useState([]);

  const { register, handleSubmit, watch, errors, setValue } = useForm({
    reValidateMode: "onChange",
    defaultValues: {},
  });

  useEffect(() => {
    let id = props.match.params.id;
    let data = {
      id: id,
    };
  }, []);

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data) => {
    let { singleSubadminData } = props;
    delete data.confirmPassword;
    data.role = permission;
    data.accessRole = 1;
    data["country_iso"] = country[0]?.code;
    dispatch(addSubadminFn(data, props.history));
  };

  let permissionData = [];

  const getPermission = (e) => {
    permissionData.push(e?.target?.checked ? e?.target?.name : "");
    permission.map((perDta, i) => {
      if (perDta === e?.target?.name && !e?.target?.checked) {
        permission.splice(i, 1);
      }
    });
    if (e?.target?.checked) {
      setPermission((oldData) => [...oldData, e?.target?.name]);
    }
  };
  const setCountry = (e) => {
    setSelectedCountry(COUNTRY.filter((val) => val.name == e));
  };

  // const getData = () => {
  //   console.log(permission, '>>>>>>>>>>>>>>>')
  // }

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Add New Sub-Admin" subtitle="" />
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Email Address</Form.Label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      ref={register({
                        required: true,
                      })}
                      className="form-control"
                    />

                    {_.get("email.type", errors) === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group

                  //style={{ marginTop: "26px" }}
                  >
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      as="select"
                      name="country"
                      value={country[0]?.name}
                      onChange={(e) => setCountry(e.target.value)}
                      ref={register({
                        required: true,
                        /*  validate: (value) =>
                      value == "0" || "Please Select a value", */
                      })}
                    >
                      <option value="">Select Country</option>
                      {COUNTRY.map((data) => {
                        return <option value={data.name}>{data.name}</option>;
                      })}
                    </Form.Control>

                    {_.get("country.type", errors) === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}

                    {/* {errors.feeType && <p>{errors.feeType.message}</p>} */}
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
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

                    {_.get("password.type", errors) === "required" && (
                      <p style={{ color: "red" }}>This field is required</p>
                    )}

                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
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
              </Row>

              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Permission</Form.Label>

                    <div key={`default-checkbox`} className="mb-3">
                      {PERMISSONS.map((permissionDta) => {
                        return (
                          <Form.Check
                            className="mb-3"
                            type="checkbox"
                            id={`default-checkbox`}
                            label={permissionDta.label}
                            name={permissionDta.name}
                            onClick={(e) => getPermission(e)}
                            defaultChecked={
                              allotedPermission !== undefined &&
                              allotedPermission.find((x) => {
                                return x === permissionDta.name ? true : false;
                              })
                            }
                            //ref={register}
                          />
                        );
                      })}
                    </div>
                  </Form.Group>
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>

              <Button variant="primary" type="submit">
                {" "}
                Add{" "}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <br />
        {/* <Button onClick={getData}>get Data</Button> */}
      </Container>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     //pairListData: state.orders.pairListData,
//     singleSubadminData: state.subadmin.singleSubadminData
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // getPairListFn: (data) => dispatch(getPairListFn(data))
//     addSubadminFn: (data, history) => dispatch(addSubadminFn(data, history))
//   };
// };

export default AddSubadmin;
