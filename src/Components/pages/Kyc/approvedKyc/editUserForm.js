import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import _ from "lodash/fp";
import { connect } from "react-redux";
import { COUNTRY } from "../../../../Constants/constant";

export default function EditUserForm(props) {
  const [userData, setUserData] = useState({});

  const { register, handleSubmit, watch, errors, setValue } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      /*   'first_name': props.first_name,
                'sur_name': props.sur_name,
                'email': props.email,
                'address_country': props.country,
                'address_street': props.address_street == undefined ? props.address_street : '',
                'address_town': props.address_town,
                'address_zip': props.address_zip,
                'dob': props.dob,
                'Mobile_number': props.phone */
    },
  });

  const onSubmit = (data) => {
    data.kstatus = 1;
    data.gender =
      data.gender == "male"
        ? 0
        : data.gender == "female"
        ? 1
        : data.gender == "other" && 2;
    data.selfieid = props?.userInfo?.selfie_id;
    data.users_id = props?.userInfo?.users_id;
    //    alert(JSON.stringify(data))
    props.handleEditUserForm(data);
  };

  useEffect(() => {
    let { userInfo } = props;
    if (Object.keys(props.userInfo).length > 0) {
      setValue("firstname", userInfo?.firstname);
      setValue("lastname", userInfo?.lastname);
      setValue("mobileno", userInfo?.mobile_no);

      setValue("dob", userInfo?.dob?.split("T")[0]);
      // setValue("gender", userInfo.gender)
      setValue("city", userInfo?.city);
      setValue("state", userInfo?.state);

      setValue("tax_no", userInfo?.tax_no);

      setValue("gender", userInfo?.gender);
      setValue("countryid", userInfo?.country_id);
      setValue("zip", userInfo?.zip);

      setUserData(props.userInfo);
    }

    /* 
        setValue("buyFee", props.buyFee)
        setValue("sellFee", props.sellFee)
        setValue("withdrawFee", props.withdrawFee) */
  }, [props.userInfo]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col lg={6} md={12}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <input
              id="firstname"
              name="firstname"
              placeholder="First Name"
              //value={props.userData.first_name}
              ref={register({
                required: true,
                //maxLength: 20,
              })}
              className="form-control"
            />
            {_.get("firstname.type", errors) === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </Form.Group>
        </Col>
        <Col lg={6} md={12}>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <input
              id="lastname"
              name="lastname"
              placeholder="Last Name"
              ref={register({
                required: true,
                //maxLength: 20,
              })}
              className="form-control"
            />
            {_.get("lastname.type", errors) === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg={6} md={12}>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <input
              type="tel"
              placeholder="Mobile Number"
              name="mobileno"
              ref={register({
                required: true,
                minLength: 6,
                maxLength: 15,
                //pattern: /(7|8|9)\d{9}$/
              })}
              className="form-control"
            />

            {_.get("mobileno.type", errors) === "required" && (
              <p>This field is required</p>
            )}

            {/*  {_.get("Mobile_number.type", errors) === "pattern" && (
                    <p>Incorrect mobile number</p>
                )} */}

            {_.get("Mobile_number.type", errors) === "minLength" && (
              <p>Incorrect mobile number</p>
            )}

            {_.get("Mobile_number.type", errors) === "maxLength" && (
              <p>Incorrect mobile number</p>
            )}
          </Form.Group>
        </Col>

        <Col lg={6} md={12}>
          <Form.Group>
            <Form.Label>Date Of Birth</Form.Label>
            <input
              id="dob"
              type="date"
              placeholder="DOB"
              name="dob"
              ref={register({
                required: true,
                maxLength: 20,
              })}
              className="form-control"
            />

            {_.get("dob.type", errors) === "required" && (
              <p>This field is required</p>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg={6} md={12}>
          <Form.Group

          //style={{ marginTop: "26px" }}
          >
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              defaultValue={userData.gender == 0 && "male"}
              ref={register({
                required: true,
                /*  validate: (value) =>
                      value == "0" || "Please Select a value", */
              })}
            >
              <option value="" className="d-none">
                Select Gender
              </option>
              <option value="0">Male</option>
              <option value="1">Female</option>
              <option value="2">Other</option>
            </Form.Control>

            {_.get("gender.type", errors) === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}

            {/* {errors.feeType && <p>{errors.feeType.message}</p>} */}
          </Form.Group>
        </Col>
        <Col lg={6} md={12}>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <input
              id="city"
              type="text"
              placeholder="City"
              name="city"
              ref={register({
                required: true,
                maxLength: 20,
              })}
              className="form-control"
            />

            {_.get("city.type", errors) === "required" && (
              <p>This field is required</p>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg={6} md={12}>
          <Form.Group>
            <Form.Label>Tax Number</Form.Label>
            <input
              id="tax_no"
              type="text"
              placeholder="Tax Number"
              name="tax_no"
              ref={register({
                required: true,
                maxLength: 20,
              })}
              className="form-control"
            />

            {_.get("tax_no.type", errors) === "required" && (
              <p>This field is required</p>
            )}
          </Form.Group>
        </Col>
        <Col lg={6} md={12}>
          <Form.Group>
            <Form.Label>State</Form.Label>
            <input
              id="state"
              type="text"
              name="state"
              ref={register({
                required: true,
                maxLength: 20,
              })}
              className="form-control"
            />

            {_.get("state.type", errors) === "required" && (
              <p>This field is required</p>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col lg={6} md={12}>
          <Form.Group

          //style={{ marginTop: "26px" }}
          >
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="select"
              name="countryid"
              defaultValue={props?.userInfo?.country_code}
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

            {_.get("countryid.type", errors) === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}

            {/* {errors.feeType && <p>{errors.feeType.message}</p>} */}
          </Form.Group>
        </Col>
        <Col lg={6} md={12}>
          <Form.Group>
            <Form.Label>Zipcode</Form.Label>
            <input
              id="zip"
              type="text"
              placeholder="ZIP Code"
              name="zip"
              ref={register({
                required: true,
                maxLength: 20,
              })}
              className="form-control"
            />

            {_.get("zip.type", errors) === "required" && (
              <p>This field is required</p>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        {" "}
        Update{" "}
      </Button>
    </Form>
  );
}
