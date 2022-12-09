import React from 'react';
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Card,
  Container,
} from 'react-bootstrap';
import EditCurrencyForm from '../currency/editCurrencyForm';

export default class currencyEdit extends React.Component {
  editUserInfo = (data) => {
    this.props.handleEditUserForm(data);
  };

  render() {
    return (
      <>
        <Container>
          <br />

          <Card>
            <Card.Header as="h2">Edit Fee</Card.Header>
            <Card.Body>
              <Card.Text>
                <EditCurrencyForm handleEditUserForm={this.editUserInfo} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}
