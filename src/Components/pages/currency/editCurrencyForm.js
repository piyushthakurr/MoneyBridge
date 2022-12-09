import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import _ from "lodash/fp";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { COUNTRY } from "../../../Constants/constant";
import { editFee } from "../../../Redux/Actions/currency/currency.action";
import IsNumber from "../../common/isNumber";
function EditCurrencyForm(props) {
  const { pairId, pairCoin } = useParams();
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm({
    reValidateMode: "onChange",
    defaultValues: {
      email: "test@test.com",
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
    data.pairId = pairId;
    data.pair = pairCoin.toLowerCase();
    props.handleEditUserForm(data, history);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Min Trade Limit</Form.Label>
            <input
              id="minTradeLimit"
              name="minTradeLimit"
              placeholder="Min Trade Limit"
              //value={props.userData.first_name}
              type="number"
              onKeyPress={(e) => IsNumber(e)}
              pattern="^\d*(\.\d{0,2})?$"
              ref={register({
                required: true,
              })}
              className="form-control"
            />
            {_.get("minTradeLimit.type", errors) === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
            {errors.minTradeLimit && (
              <p style={{ color: "red" }}> {errors.minTradeLimit.message}</p>
            )}
          </Form.Group>
        </Col>
        {/* <Col>
          <Form.Group >
            <Form.Label>Withdraw Limit With KYC</Form.Label>
            <input
              id="buyFee"
              name="buyFee"
              placeholder="Buy Trade Fee"
              type="number"
              //value={props.userData.first_name}
              ref={register({
                required: true,
                maxLength: 20,
              })}
              className="form-control"
            />
            {_.get('buyFee.type', errors) === 'required' && (
              <p style={{ color: 'red' }}>This field is required</p>
            )}
          </Form.Group>
        </Col> */}
        <Col>
          <Form.Group>
            <Form.Label>Buy Trade Fee</Form.Label>
            <input
              id="buyFee"
              name="buyFee"
              placeholder="Buy Trade Fee"
              type="number"
              //value={props.userData.first_name}
              ref={register({
                required: true,
                maxlength: "15",
              })}
              className="form-control"
            />
            {_.get("buyFee.type", errors) === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label>Sell Trade Fee</Form.Label>
            <input
              id="sellFee"
              name="sellFee"
              placeholder="Sell Trade Fee"
              type="number"
              //value={props.userData.first_name}
              ref={register({
                required: true,
                maxlength: "15",
              })}
              className="form-control"
            />
            {_.get("sellFee.type", errors) === "required" && (
              <p style={{ color: "red" }}>This field is required</p>
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
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleEditUserForm: (data, history) => dispatch(editFee(data, history)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCurrencyForm);
