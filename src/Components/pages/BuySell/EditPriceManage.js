import React, { useState } from "react";
import PageTitle from "../../common/PageTitle";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  FormControl,
  Button,
  Form,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import "../../../App.css";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateMarkupMarkdownFn } from "../../../Redux/Actions/BuySell/BuySell.action";
import { Label } from "semantic-ui-react";

export default function EditPriceManage() {
  const stateObj = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const editPriceSchema = Yup.object().shape({
    currency: Yup.string().required("Price is required"),
    refPrice: Yup.string().required("Amount is required"),
    markupPrice: Yup.string().required("Amount is required"),
    markdownPrice: Yup.string().required("Amount is required"),
    askPrice: Yup.string().required("Amount is required"),
    bidPrice: Yup.string().required("Amount is required"),
    status: Yup.string().required("Amount is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: editPriceSchema,
    initialValues: {
      currency: stateObj?.state?.pair,
      refPrice: stateObj?.state?.referencePrice,
      markupPrice: stateObj?.state?.markup_price,
      markdownPrice: stateObj?.state?.markdown_price,
      askPrice: stateObj?.state?.sellPrice,
      bidPrice: stateObj?.state?.buyPrice,
      status: stateObj?.state?.is_enable,
    },

    onSubmit: (values) => {
      let data = {
        id: stateObj?.state?.id,
        markdown_value: values.markdownPrice,
        markup_value: values.markupPrice,
        status: values.status,
      };

      dispatch(updateMarkupMarkdownFn(data)).then((val) => {
        history.push("/auth/buysell-management/price-management");
      });
    },
  });

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Edit Price Management" subtitle="" />
        <Card>
          <Card.Body>
            <Form onSubmit={formik.handleSubmit}>
              <Row className="mb-3">
                <Col lg={4} className="title_text">
                  <Label>Currency</Label>
                  <FormControl
                    placeholder="Currency"
                    aria-describedby="basic-addon2"
                    id="currency"
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                    disabled
                    value={formik.values.currency}
                  />
                </Col>

                <Col lg={4} className="title_text">
                  <Label>Reference Price</Label>

                  <FormControl
                    placeholder="Reference Price"
                    aria-describedby="basic-addon2"
                    id="refPrice"
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                    disabled
                    value={formik.values.refPrice}
                  />
                </Col>
                <Col lg={4} className="title_text">
                  <Label>Markup Price(%)</Label>

                  <FormControl
                    placeholder="Markup Price(%)"
                    aria-describedby="basic-addon2"
                    id="markupPrice"
                    onChange={(event) => {
                      if (/^\d*(\.\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event);
                      }
                    }}
                    value={formik.values.markupPrice}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={4} className="title_text">
                  <Label>Markdown Price(%)</Label>

                  <FormControl
                    placeholder="Markdown Price(%)"
                    aria-describedby="basic-addon2"
                    id="markdownPrice"
                    onChange={(event) => {
                      if (/^\d*(\.\d{0,8})?$/.test(event.target.value)) {
                        formik.handleChange(event);
                      }
                    }}
                    value={formik.values.markdownPrice}
                  />
                </Col>
                <Col lg={4} className="title_text">
                  <Label>Ask Price</Label>

                  <FormControl
                    placeholder="Ask Price"
                    aria-describedby="basic-addon2"
                    id="askPrice"
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                    disabled
                    value={formik.values.askPrice}
                  />
                </Col>
                <Col lg={4} className="title_text">
                  <Label>Bid Price</Label>

                  <FormControl
                    placeholder="Bid Price"
                    aria-describedby="basic-addon2"
                    id="bidPrice"
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                    disabled
                    value={formik.values.bidPrice}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col lg={4} className="title_text">
                  <Label>Status</Label>

                  <FormControl
                    as="select"
                    id="status"
                    onChange={(event) => {
                      formik.handleChange(event);
                    }}
                    value={formik.values.status}
                  >
                    <option value="yes">Enable</option>
                    <option value="no">Disable</option>
                  </FormControl>
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
