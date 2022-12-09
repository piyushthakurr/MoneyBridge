import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Card, Form } from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import { useDispatch } from "react-redux";
import { Icon } from "semantic-ui-react";
import {
  BuySellLimitFn,
  updateBuySellLimitFn,
} from "../../../Redux/Actions/BuySell/BuySell.action";
import IsNumber from "../../common/isNumber";

export default function BuySellLimit() {
  const dispatch = useDispatch();
  const [updateModal, setUpdateModal] = useState(false);
  const [buySellData, setBuySellData] = useState([]);
  const [buySellLimit, setBuySellLimit] = useState("");
  const [sid, setSid] = useState();

  const fetchBuySellLimit = () => {
    dispatch(BuySellLimitFn()).then((val) => {
      setBuySellData(val.data);
    });
  };

  const openModalUpdate = (e) => {
    setBuySellLimit(e.bs_limit);
    setSid(e.sid);
    setUpdateModal(true);
  };

  const updateBuySellLimit = () => {
    let data = {
      is_active: 1,
      bs_limit: buySellLimit,
    };

    dispatch(updateBuySellLimitFn(data, sid)).then((val) => {
      fetchBuySellLimit();
      setUpdateModal(false);
    });
  };

  useEffect(() => {
    fetchBuySellLimit();
  }, []);

  useEffect(() => {
    if (buySellLimit == "unlimited") {
      updateBuySellLimit();
    }
  }, [buySellLimit]);

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Buy Sell Limit" subtitle="" />
        <Card>
          {/* <Card.Header> Min withdraw limit </Card.Header> */}
          {/* <Card.Header style={{ backgroundColor: '#f9f1d9' }}>
              </Card.Header> */}
          <Card.Body>
            <ul className="withdrawLimitUl">
              {buySellData.map((data, index) => (
                <li>
                  {data.is_active != 0 && (
                    <div>
                      <p>
                        {" "}
                        Buy-Sell Limit {index === 0 ? "Without" : "With"}{" "}
                        Complete Level {index > 0 ? data?.type - 1 : 1}{" "}
                        (Monthly): {data?.bs_limit} USD{" "}
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
              <Modal.Title>Buy Sell Limit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-0">
                <Form.Control
                  type="number"
                  onKeyPress={(e) => IsNumber(e)}
                  name="withdrawLimit"
                  defaultValue={buySellLimit}
                  onChange={(e) => setBuySellLimit(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="justify-content-end">
              <Button
                variant="warning"
                onClick={() => setBuySellLimit("unlimited")}
              >
                Unlimited
              </Button>{" "}
              <Button
                variant="primary"
                onClick={() => updateBuySellLimit()}
                disabled={!buySellLimit}
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
