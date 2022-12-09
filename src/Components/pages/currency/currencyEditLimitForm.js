import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import _ from "lodash/fp";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { COUNTRY, SMALLEST_UNIT } from "../../../Constants/constant";
import { editFeeLimit } from "../../../Redux/Actions/currency/currency.action";
function EditCurrencyForm(props) {
  const { coinname } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [stateData, setStateData] = useState();
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
    data.withdrawStatus = 1;
    data.coin = coinname == "dogecoin" ? "doge" : coinname;

    let finaData = {
      minWithdrawFee: +data.minWithdrawFee * SMALLEST_UNIT,
      withKycLimit: +data.withKycLimit * SMALLEST_UNIT,
      withoutKycLimit: +data.withoutKycLimit * SMALLEST_UNIT,
      withdrawFee: +data.withdrawFee * SMALLEST_UNIT,
      coin: data.coin,
      withdrawStatus: data.withdrawStatus,
    };

    dispatch(editFeeLimit(finaData, history)).then((res) => {
      history.push("/auth/currency-management/currency");
    });
  };

  useEffect(() => {
    if (props?.history?.location?.state?.currencyData) {
      getDataState();
    }
  }, []);

  const getDataState = () => {
    let abc = props?.history?.location?.state?.currencyData.filter(
      (val) => val?.name?.toLowerCase() === coinname?.toLowerCase()
    );
    if (abc.length > 0) {
      setStateData(abc[0]);
    }
  };

  return (
    <div>
      {stateData && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Min Withdraw Amount</Form.Label>
                <input
                  id="minWithdrawFee"
                  name="minWithdrawFee"
                  placeholder="Min Withdraw Limit"
                  defaultValue={
                    stateData?.minimum_withdraw / SMALLEST_UNIT || 0
                  }
                  type="text"
                  ref={register({
                    required: true,
                    pattern: /^\d{1,10}(\.\d{1,6})?$/,
                    maxLength: 15,
                  })}
                  className="form-control"
                />
                {_.get("minWithdrawFee.type", errors) === "required" && (
                  <p style={{ color: "red" }}>This field is required</p>
                )}
                {_.get("minWithdrawFee.type", errors) === "pattern" && (
                  <p style={{ color: "red" }}>Only number allowed</p>
                )}
              </Form.Group>
            </Col>
            {/* <Col>
              <Form.Group >
                <Form.Label>Withdraw Limit With KYC</Form.Label>
                <input
                  id="withKycLimit"
                  name="withKycLimit"
                  placeholder="With Kyc Limit"
                  type="text"
                  defaultValue={
                    stateData?.with_kyc_withdraw_limit / SMALLEST_UNIT || 0
                  }
                  ref={register({
                    required: true,
                    pattern: /^\d{1,10}(\.\d{1,6})?$/,
                    maxLength: 15,
                  })}
                  className="form-control"
                />
                {_.get("withKycLimit.type", errors) === "required" && (
                  <p style={{ color: "red" }}>This field is required</p>
                )}
                {_.get("withKycLimit.type", errors) === "pattern" && (
                  <p style={{ color: "red" }}>Only number allowed</p>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group >
                <Form.Label>Withdrawal Limit Without Kyc</Form.Label>
                <input
                  id="withoutKycLimit"
                  name="withoutKycLimit"
                  placeholder="Without Kyc Limit"
                  type="text"
                  defaultValue={
                    stateData?.without_kyc_withdraw_limit / SMALLEST_UNIT || 0
                  }
                  ref={register({
                    required: true,
                    pattern: /^\d{1,10}(\.\d{1,6})?$/,

                    maxLength: 15,
                  })}
                  className="form-control"
                />
                {_.get("withoutKycLimit.type", errors) === "required" && (
                  <p style={{ color: "red" }}>This field is required</p>
                )}
                {_.get("withoutKycLimit.type", errors) === "pattern" && (
                  <p style={{ color: "red" }}>Only number allowed</p>
                )}
              </Form.Group>
            </Col> */}

            <Col>
              <Form.Group>
                <Form.Label>Withdraw Fee</Form.Label>
                <input
                  id="withdrawFee"
                  name="withdrawFee"
                  placeholder="Withdraw Fee"
                  type="text"
                  defaultValue={stateData?.withdraw_fee / SMALLEST_UNIT || 0}
                  //value={props.userData.first_name}
                  ref={register({
                    required: true,
                    pattern: /^\d{1,10}(\.\d{1,6})?$/,

                    maxLength: 15,
                  })}
                  className="form-control"
                />
                {_.get("withdrawFee.type", errors) === "required" && (
                  <p style={{ color: "red" }}>This field is required</p>
                )}
                {_.get("withdrawFee.type", errors) === "pattern" && (
                  <p style={{ color: "red" }}>Only number allowed</p>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button variant="primary" type="submit">
                {" "}
                Update{" "}
              </Button>
              <Link
                style={{ margin: "20px" }}
                variant="primary"
                to="/auth/currency-management/currency"
              >
                {" "}
                Cancel{" "}
              </Link>
            </Col>
          </Row>
        </Form>
      )}
    </div>
  );
}

export default EditCurrencyForm;
