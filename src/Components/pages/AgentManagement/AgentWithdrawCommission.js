import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
  getAgentCommissionListFn,
  updatecommisionFeeFn,
} from "../../../Redux/Actions/AgentManagement/agent.action";
function AgentWithdrawCommission() {
  const dispatch = useDispatch();
  const [agentCommissionFeeFiat, setAgentCommissionFeeFiat] = useState([]);
  const [commissionFee, setCommissionFee] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState();

  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    getCommissionList();
  }, []);

  const getCommissionList = () => {
    dispatch(getAgentCommissionListFn()).then((res) => {
      setAgentCommissionFeeFiat(res.data);
      console.log(
        Object.keys(res.data).map((val) => {
          console.log(val);
        })
      );
    });
  };

  const editFiatCommisson = (currency, fee) => {
    setSelectedCurrency(currency?.toUpperCase());
    setCommissionFee(fee);
    setOpenEditModal(true);
  };

  const updateCommissionFee = () => {
    let data = {
      coin: selectedCurrency,
      commission: commissionFee,
    };
    dispatch(updatecommisionFeeFn(data)).then((res) => {
      setOpenEditModal(false);
      getCommissionList();
    });
  };
  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Agent Withdraw Commission" subtitle="" />

        <Card>
          <Card.Body>
            {Object.keys(agentCommissionFeeFiat) != undefined &&
            Object.keys(agentCommissionFeeFiat).length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr.No.</th>
                    <th className="pl-3 text-nowrap">Currency</th>
                    <th className="pl-3 text-nowrap">Commission ( % )</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(agentCommissionFeeFiat).map(
                    (fiatCommission, index) => {
                      return (
                        <tr>
                          <td className="pl-3 text-nowrap">{index + 1}</td>

                          <td className="pl-3 text-nowrap">
                            {agentCommissionFeeFiat[
                              fiatCommission
                            ]?.name?.toUpperCase()}
                          </td>

                          <td className="pl-3 text-nowrap">
                            {agentCommissionFeeFiat[fiatCommission]
                              ?.agent_commission || "-"}
                          </td>

                          <td className="pl-3 text-nowrap ">
                            <Row>
                              <Col>
                                <Button
                                  type="button"
                                  onClick={() =>
                                    editFiatCommisson(
                                      agentCommissionFeeFiat[fiatCommission]
                                        ?.name,
                                      agentCommissionFeeFiat[fiatCommission]
                                        ?.agent_commission
                                    )
                                  }
                                >
                                  <Icon name="pencil alternate" />
                                </Button>
                              </Col>
                            </Row>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </Table>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Sr.No.</th>
                    <th className="pl-3 text-nowrap">Currency</th>
                    <th className="pl-3 text-nowrap">Commission</th>
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
              <Modal.Title>Edit Commission Fee</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Col lg={12} md={12} sm={12} className="mb-3">
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
              <Col lg={12} md={12} sm={12}>
                <Form.Group className="mb-0">
                  <Form.Control
                    type="number"
                    name="fee"
                    id="fee"
                    placeholder="Commission fee"
                    value={commissionFee || ""}
                    onKeyPress={(e) => IsNumber(e)}
                    onChange={(e) => setCommissionFee(e.target.value)}
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
                onClick={() => updateCommissionFee()}
                disabled={!commissionFee}
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

export default AgentWithdrawCommission;
