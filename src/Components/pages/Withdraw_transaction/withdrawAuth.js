import React from "react";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import { connect } from "react-redux";
import "../../../App.css";
import { toast } from "../../../Components/Toast/toast.component";
import { withdrawAuthFn } from "../../../Redux/Actions/withdrawTransactions/withdrawTrans.action";
import { PASSWORD_ONE } from "../../../Constants/constant";

class WithdrawRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      withdrawPass: "",
    };
  }

  onSubmit = () => {
    let { withdrawAuthFn } = this.props;
    let redirectUrl = this.props.location?.state?.from?.pathname;
    this.props.history.push(redirectUrl);

    if (PASSWORD_ONE === this.state.withdrawPass) {
      withdrawAuthFn(true);
    } else {
      withdrawAuthFn(false);
      toast.error("This is incorrect Password please try again.");
    }
  };

  render() {
    return (
      <div>
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <PageTitle
            title={
              this.props.location?.state?.from?.pathname !=
              "/auth/deposit-transactions/deposite_transaction_fiat"
                ? "Withdraw - Request"
                : "Deposit - Request"
            }
            subtitle=""
          />

          <Card>
            <Card.Body>
              <Row>
                <Card.Title>Please Enter Step 1 Password</Card.Title>
                <Col lg={4} md={6} sm={12}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={this.state.withdrawPass}
                      onChange={(e) =>
                        this.setState({ withdrawPass: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} md={6} sm={12}>
                  <Button variant="primary" onClick={this.onSubmit}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    withdrawAuth: state.withdraw.withdrawAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    withdrawAuthFn: (data) => dispatch(withdrawAuthFn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawRequest);
