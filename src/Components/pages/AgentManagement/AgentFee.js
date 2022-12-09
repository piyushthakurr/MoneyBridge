import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getMerchantCommissionListFn,
  updatecommisionFeeFn,
} from "../../../Redux/Actions/MerchantCommission/merchant.action";
import {
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
  Button,
} from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import IsNumber from "../../common/isNumber";
import { Icon } from "semantic-ui-react";
import {
  getAgentFeeListFn,
  updateAgentFeeFn,
} from "../../../Redux/Actions/AgentManagement/agent.action";
function AgentFee() {
  const dispatch = useDispatch();
  const [agentFee, setAgentFee] = useState([]);
  //   const [feeData, setFeeData] = useState({});
  const [depositFee, setDepositFee] = useState();
  const [withdrawFee, setWithdrawFee] = useState();

  const [selectedCurrency, setSelectedCurrency] = useState();
  const [agentFeeId, setAgentfeeId] = useState();

  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    getAgentFeeList();
  }, []);

  const getAgentFeeList = () => {
    dispatch(getAgentFeeListFn()).then((res) => {
      setAgentFee(res?.list);
    });
  };
  const editAgentFee = (agentfeelist) => {
    setSelectedCurrency(agentfeelist?.currency?.toUpperCase());
    setDepositFee(agentfeelist?.deposit_fee);
    setWithdrawFee(agentfeelist?.withdraw_fee);
    setAgentfeeId(agentfeelist?.agent_fee_id);
    setOpenEditModal(true);
  };

  const updateAgentFee = () => {
    let data = {
      deposit_fee: depositFee,
      withdraw_fee: withdrawFee,
    };
    dispatch(updateAgentFeeFn(data, agentFeeId)).then((res) => {
      setOpenEditModal(false);
      getAgentFeeList();
    });
  };
  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Agent Commission management" subtitle="" />

        <Card>
          <Card.Body>
            {agentFee != undefined && agentFee.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr.No.</th>
                    <th className="pl-3 text-nowrap">Currency</th>
                    <th className="pl-3 text-nowrap">Deposit Fee ( % )</th>
                    <th className="pl-3 text-nowrap">Withdraw Fee ( % )</th>

                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {agentFee.map((agentfeelist, index) => {
                    return (
                      <tr>
                        <td className="pl-3 text-nowrap">{index + 1}</td>

                        <td className="pl-3 text-nowrap">
                          {agentfeelist?.currency.toUpperCase()}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {agentfeelist?.deposit_fee || "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {agentfeelist?.withdraw_fee || "-"}
                        </td>

                        <td className="pl-3 text-nowrap ">
                          <Row>
                            <Col>
                              <Button
                                type="button"
                                onClick={() => editAgentFee(agentfeelist)}
                              >
                                <Icon name="pencil alternate" />
                              </Button>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr.No.</th>
                    <th className="pl-3 text-nowrap">Currency</th>
                    <th className="pl-3 text-nowrap">Deposit Fee ( % )</th>
                    <th className="pl-3 text-nowrap">Withdraw Fee ( % )</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Record Found
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        <>
          <Modal show={openEditModal} onHide={() => setOpenEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Agent Fee</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Col lg={12} md={12} sm={12} className="mb-3">
                <label>Currency</label>
                <Form.Group className="mb-0">
                  <Form.Control
                    type="text"
                    name="currency"
                    id="currency"
                    placeholder="currrecny"
                    value={selectedCurrency || ""}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col lg={12} md={12} sm={12} className="mb-3">
                <label>Deposit Fee</label>

                <Form.Group className="mb-0">
                  <Form.Control
                    type="number"
                    name="deposit_fee"
                    id="deposit_fee"
                    placeholder="Deposit fee"
                    value={depositFee || ""}
                    onKeyPress={(e) => IsNumber(e)}
                    onChange={(e) => setDepositFee(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={12} md={12} sm={12}>
                <label>Withdraw Fee</label>

                <Form.Group className="mb-0">
                  <Form.Control
                    type="number"
                    name="withdraw_fee"
                    id="withdraw_fee"
                    placeholder="withdraw fee"
                    value={withdrawFee || ""}
                    onKeyPress={(e) => IsNumber(e)}
                    onChange={(e) => setWithdrawFee(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Modal.Body>

            <Modal.Footer className="justify-content-end">
              <Button
                variant="secondary"
                onClick={() => setOpenEditModal(false)}
              >
                Cancel
              </Button>{" "}
              <Button
                variant="primary"
                onClick={() => updateAgentFee()}
                disabled={!depositFee || !withdrawFee}
              >
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </div>
  );
}

export default AgentFee;
