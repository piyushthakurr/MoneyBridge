import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import _ from "lodash/fp";
import { connect } from "react-redux";
import { COUNTRY } from "../../../Constants/constant";

export default function EditUserForm(props) {
  const { register, handleSubmit, watch, errors } = useForm({
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
    props.handleEditUserForm(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <input
              id="first_name"
              name="first_name"
              placeholder="First Name"
              //value={props.userData.first_name}
              ref={register({
                required: true,
                maxLength: 20,
              })}
              className="form-control"
            />
            {_.get("first_name.type", errors) === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <input
              id="sur_name"
              name="sur_name"
              placeholder="Last Name"
              ref={register({
                required: true,
                maxLength: 20,
              })}
              className="form-control"
            />
            {_.get("sur_name.type", errors) === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <input
              disabled="disabled"
              id="email"
              type="email"
              name="email"
              ref={register({
                // required: true,
                //   maxLength: 20,
                //    pattern: /^\S+@\S+$/i
              })}
              className="form-control"
            />
            {/* {_.get("email.type", errors) === "pattern" && (
                    <p>Incorrect email address</p>
                )} */}

            {/*   {_.get("email.type", errors) === "required" && (
                    <p>This field is required</p>
                )} */}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Street</Form.Label>
            <input
              id="address_street"
              type="text"
              placeholder="Street"
              name="address_street"
              ref={register({
                // required: true,
                maxLength: 20,
              })}
              className="form-control"
            />

            {/* {_.get("address_street.type", errors) === "required" && (
                    <p>This field is required</p>
                )} */}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>City/Town</Form.Label>
            <input
              id="address_town"
              type="text"
              placeholder="Town"
              name="address_town"
              ref={register({
                //    required: true,
                maxLength: 20,
              })}
              className="form-control"
            />

            {/* {_.get("address_town.type", errors) === "required" && (
                    <p>This field is required</p>
                )} */}
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Zipcode</Form.Label>
            <input
              id="address_zip"
              type="text"
              placeholder="ZIP Code"
              name="address_zip"
              ref={register({
                required: true,
                maxLength: 20,
              })}
              className="form-control"
            />

            {_.get("address_zip.type", errors) === "required" && (
              <p>This field is required</p>
            )}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
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
        <Col>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <input
              type="tel"
              placeholder="Mobile number"
              name="Mobile_number"
              ref={register({
                required: true,
                minLength: 6,
                maxLength: 15,
                //pattern: /(7|8|9)\d{9}$/
              })}
              className="form-control"
            />

            {_.get("Mobile_number.type", errors) === "required" && (
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
        <Col></Col>
      </Row>

      <Button variant="primary" type="submit">
        {" "}
        Update{" "}
      </Button>
    </Form>
  );
}
