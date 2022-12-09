import React, { useState } from "react";
import PageTitle from "../../common/PageTitle";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  FormControl,
  Button,
  Form,
  Col,
  Container,
  Row,
  Card,
} from "react-bootstrap";
import "../../../App.css";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateListPairFeeFn } from "../../../Redux/Actions/BuySell/BuySell.action";
import { Label } from "semantic-ui-react";

export default function EditFeeManage() {
  const stateObj = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const editPriceSchema = Yup.object().shape({
    pair: Yup.string().required("Price is required"),
    type: Yup.string().required("Amount is required"),
    fee: Yup.string().required("Amount is required"),
    orderLimit: Yup.string().required("Amount is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: editPriceSchema,
    initialValues: {
      pair: stateObj?.state?.pair_name,
      type: stateObj?.state?.type?.toUpperCase(),
      fee: stateObj?.state?.fee,
      orderLimit: stateObj?.state?.orderLimit,
    },

    onSubmit: (values) => {
      let data = {
        fee: values?.fee,
        order_limit: values?.orderLimit,
        order_type: values?.type,
        pair_id: stateObj?.state?.pair_id,
        fee_type: "percentage",
      };

      dispatch(updateListPairFeeFn(data)).then((val) => {
        history.push("/auth/buysell-management/fee-manage");
      });
    },
  });

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Edit Fee Management" subtitle="" />
        <Card>
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Row className="mb-3">
                <Col lg={4} className="title_text">
                  <Label>Pair</Label>

                  <FormControl
                    placeholder="Pair"
                    aria-describedby="basic-addon2"
                    id="pair"
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                    disabled
                    value={formik.values.pair}
                  />
                </Col>

                <Col lg={4} className="title_text">
                  <Label>Type</Label>

                  <FormControl
                    placeholder="Type"
                    aria-describedby="basic-addon2"
                    id="type"
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                    disabled
                    value={formik.values.type}
                  />
                </Col>
                <Col lg={4} className="title_text">
                  <Label>Fee</Label>

                  <FormControl
                    placeholder="Fee"
                    aria-describedby="basic-addon2"
                    id="fee"
                    onChange={(event) => {
                      if (/^\d*(\.\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event);
                      }
                    }}
                    value={formik.values.fee}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} className="title_text">
                  <Label>Order Limit</Label>

                  <FormControl
                    placeholder="Order Limit"
                    aria-describedby="basic-addon2"
                    id="orderLimit"
                    onChange={(event) => {
                      if (/^\d*(\.\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event);
                      }
                    }}
                    value={formik.values.orderLimit}
                  />
                </Col>
                <Col lg={4} className="mt-4 pt-2">
                  <Button type="submit">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
