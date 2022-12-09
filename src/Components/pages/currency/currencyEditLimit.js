import React from "react";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Card,
  Container,
} from "react-bootstrap";
import { useHistory } from "react-router";
import CurrencyEditLimitForm from "../currency/currencyEditLimitForm";

export default function CurrencyEditLimit() {
  const history = useHistory();

  return (
    <>
      <Container>
        <br />
        <Card>
          <Card.Header as="h2">Edit Limits</Card.Header>
          <Card.Body>
            <Card.Text>
              <CurrencyEditLimitForm history={history} />
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
