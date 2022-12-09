import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import _ from "lodash/fp";
import { connect } from "react-redux";
import { COUNTRY } from "../../../Constants/constant";

export default function AddNotesModal(props) {
  const { register, handleSubmit, watch, errors } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      /*   'first_name': props.first_name*/
    },
  });

  const onSubmit = (data) => {
    props.handleNotesForm(data);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={props.closeModal}>
        <Modal.Title id="contained-modal-title-vcenter">
          Account Info
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <input
                  id="notes"
                  name="notes"
                  placeholder="Add Note..."
                  type="message"
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
          </Row>

          <Button variant="primary" type="submit">
            {" "}
            Submit{" "}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
