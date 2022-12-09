import React from "react";
import { Modal, Button } from "react-bootstrap";
const DeleteModal = (props) => {
  console.log("pooo", props);
  return (
    <Modal
      show={props.deleteOpen}
      //   onHide={props.setDeleteOpen(false)}
      keyboard={false}
      className="logoutModal"
    >
      <Modal.Header closeButton>
        {/* <Modal.Title>Modal title</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>Are You Sure Want to delete the record?</Modal.Body>
      <Modal.Footer className="mx-auto">
        <Button variant="secondary" onClick={() => props.setDeleteOpen(false)}>
          No
        </Button>
        <Button variant="primary" onClick={() => this.logouthandleUser()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default React.memo(DeleteModal);
