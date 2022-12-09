import React from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

export default class CurrencyAuthModal extends React.Component {
  constructor() {
    super();
    this.state = {
      authPassword: "",
    };
  }

  handleAuth = () => {
    this.props.getPassword(this.state.authPassword)
    
  }

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please Enter Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <InputGroup className="mb-3">
              
              <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                type="password"
                value={this.state.authPassword}
                onChange = {(e) => this.setState({authPassword:e.target.value})}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleAuth}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
