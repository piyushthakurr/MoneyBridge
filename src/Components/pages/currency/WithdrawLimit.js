import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import { Icon } from "semantic-ui-react";
import {
  updateWithdrawLimitFn,
  withdrawLimitFn,
} from "../../../Redux/Actions/withdrawTransactions/withdrawTrans.action";
import { useDispatch } from "react-redux";
import IsNumber from "../../common/isNumber";

export default function WithdrawLimit() {
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = useState(false);
  const [withdrawLimitData, setWithdrawLimitData] = useState([]);
  const [withdrawLimit, setWithdrawLimit] = useState("");
  const [sid, setSid] = useState();

  const fetchWithdrawLimit = () => {
    dispatch(withdrawLimitFn()).then((val) => {
      setWithdrawLimitData(val.data);
    });
  };

  const openModalUpdate = (e) => {
    setWithdrawLimit(e.withdraw_limit);
    setSid(e.sid);
    setUpdateModal(true);
  };

  useEffect(() => {
    if (withdrawLimit == "unlimited") {
      updateWithdrawLimit();
    }
  }, [withdrawLimit]);

  const updateWithdrawLimit = () => {
    let data = {
      is_active: 1,
      withdraw_limit: withdrawLimit,
    };

    dispatch(updateWithdrawLimitFn(sid, data)).then((val) => {
      fetchWithdrawLimit();
      setUpdateModal(false);
    });
  };

  useEffect(() => {
    fetchWithdrawLimit();
  }, []);

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Withdraw Limit" subtitle="" />
        <Card>
          {/* <Card.Header> Min withdraw limit </Card.Header> */}
          {/* <Card.Header style={{ backgroundColor: '#f9f1d9' }}>
              </Card.Header> */}
          <Card.Body>
            <ul className="withdrawLimitUl">
              {withdrawLimitData.map((data, index) => (
                <li>
                  {data.is_active != 0 && (
                    <div>
                      <p>
                        {" "}
                        Withdrawal Limit {index === 0 ? "Without" : "With"}{" "}
                        Complete Level {index > 0 ? data?.type - 1 : 1}{" "}
                        (Monthly): {data?.withdraw_limit} USD{" "}
                      </p>{" "}
                      <span className="edit_icon">
                        <a
                          className="view"
                          onClick={() => openModalUpdate(data)}
                        >
                          <Icon name="pencil alternate" />
                        </a>
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Card.Body>
        </Card>

        <>
          <Modal
            show={updateModal}
            onHide={() => setUpdateModal(false)}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Withdraw Limit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-0">
                <Form.Control
                  type="number"
                  name="withdrawLimit"
                  onKeyPress={(e) => IsNumber(e)}
                  defaultValue={withdrawLimit}
                  placeholder="Enter withdraw limit"
                  onChange={(e) => setWithdrawLimit(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-end">
              <Button
                variant="warning"
                onClick={() => setWithdrawLimit("unlimited")}
              >
                Unlimited
              </Button>{" "}
              <Button
                variant="primary"
                onClick={() => updateWithdrawLimit()}
                disabled={!withdrawLimit}
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
