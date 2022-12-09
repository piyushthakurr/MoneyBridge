import React, { useEffect, useState } from "react";
import PageTitle from "../../common/PageTitle";
import {
  Table,
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import {
  allfundsFn,
  moveFundFn,
} from "../../../Redux/Actions/Fund/fund.action";
import QRCode from "react-qr-code";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "../../Toast/toast.component";
import { SMALLEST_UNIT } from "../../../Constants/constant";
import DigitAfterDecimal from "../../common/DigitAfterDecimal";
import IsNumber from "../../common/isNumber";

function MoveFunds() {
  const dispatch = useDispatch();
  const [fundList, setFundList] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [moveToExternalWallletModal, setMoveToExternalWallletModal] =
    useState(false);
  const [depositMoveFund, setDepositMoveFund] = useState(false);
  const [copied, setCopied] = useState(false);
  const [depositAddress, setDepositAddress] = useState();

  const getAllfunds = () => {
    dispatch(allfundsFn()).then((val) => {
      setFundList(val.data);
    });
  };

  const openDepositModal = (e) => {
    setCopied(false);
    setDepositMoveFund(true);
    setDepositAddress(e);
  };

  const moveToExternalWallet = (e) => {
    setSelectedWallet(e);
    setMoveToExternalWallletModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    if (
      parseFloat(data.get("amount")) <= parseFloat(selectedWallet.hotwallet)
    ) {
      let dataObj = {
        password: data.get("password"),

        amount: Number(parseFloat(data.get("amount")) * 100000000),
        symbol: selectedWallet.currencySymbol,
        from_address: selectedWallet.depositAddress,
        to_address: data.get("address"),
        assets_id: selectedWallet.assestId ? selectedWallet.assestId : "",
      };
      let tag = data.get("tag");
      if (tag) {
        dataObj = { ...dataObj, tag };
      }

      if (selectedWallet.currencySymbol == "USDT") {
        dataObj["is_erc20token"] = 1;
      } else if (selectedWallet.currencySymbol == "ETH") {
        dataObj["is_erc20token"] = 0;
      }
      dispatch(
        moveFundFn(selectedWallet.currencySymbol.toLowerCase(), dataObj)
      ).then((val) => {
        setMoveToExternalWallletModal(false);
        getAllfunds();
      });
    } else {
      this.spinner.hide();
      this.toastr.error("Insufficient balance!");
    }
  };
  useEffect(() => {
    getAllfunds();
  }, []);

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <PageTitle title="Move Funds" subtitle="" />
        <div className="box_deco">
          <Row className="justify-content-end no-gutters">
            {fundList != undefined && fundList.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="pl-3 text-nowrap">Currency</th>
                    <th className="pl-3 text-nowrap">Funds/Commitment</th>
                    <th className="pl-3 text-nowrap">HotWalletBalance</th>
                    <th className="pl-3 text-nowrap">Delta</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fundList?.map((fund) => {
                    return (
                      <tr>
                        <td className="pl-3 text-nowrap">
                          {fund.currencyName}
                        </td>

                        <td className="pl-3 text-nowrap">
                          {fund?.commitment
                            ? DigitAfterDecimal(fund?.commitment, 8) /
                              SMALLEST_UNIT
                            : "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {fund?.hotwallet
                            ? DigitAfterDecimal(fund?.hotwallet, 8)
                            : "-"}
                        </td>
                        <td className="pl-3 text-nowrap">
                          {fund.delta / SMALLEST_UNIT || "-"}
                        </td>

                        <td>
                          <Button
                            variant="success"
                            onClick={() => moveToExternalWallet(fund)}
                          >
                            Move To External Wallet
                          </Button>{" "}
                          <Button
                            variant="danger"
                            onClick={() => openDepositModal(fund)}
                          >
                            Deposit
                          </Button>{" "}
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
                    <th className="pl-3 text-nowrap">Currency</th>
                    <th className="pl-3 text-nowrap">Funds/Commitment</th>
                    <th className="pl-3 text-nowrap">HotWalletBalance</th>
                    <th className="pl-3 text-nowrap">Delta</th>
                    <th className="pl-3 text-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <td colSpan="7" className="text-center">
                    No Record Found
                  </td>
                </tbody>
              </Table>
            )}
          </Row>
        </div>

        <Modal
          show={moveToExternalWallletModal}
          onHide={() => setMoveToExternalWallletModal(false)}
          keyboard={false}
          className="logoutModal"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Move To External Wallet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="external_wallet" onSubmit={handleSubmit}>
              <Row>
                <Col md={12} className="mb-3">
                  <h4 style={{ textAlign: "left" }}>
                    Balance in Hot Wallet{" "}
                    {parseFloat(selectedWallet.hotwallet).toFixed(6)}{" "}
                    {selectedWallet?.currencySymbol}
                  </h4>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    id="amount"
                    name="amount"
                    type="text"
                    onKeyPress={(e) => IsNumber(e)}
                    placeholder="Enter Amount"
                    //value={props.userData.first_name}
                    className="form-control"
                  />
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Label>Withdraw Address</Form.Label>
                  <Form.Control
                    id="address"
                    name="address"
                    placeholder="Enter Address"
                    className="form-control"
                  />
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Label>Withdraw Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    className="form-control"
                  />
                </Col>
                {selectedWallet?.currencySymbol === "XRP" ? (
                  <Col md={12} className="mb-3">
                    <Form.Label>Tag</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Tag"
                      name="tag"
                      className="form-control"
                    />
                  </Col>
                ) : (
                  ""
                )}
              </Row>
              <Button
                className="mt-3"
                variant="primary"
                tag={Link}
                type="submit"
              >
                Move
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          show={depositMoveFund}
          onHide={() => setDepositMoveFund(false)}
          keyboard={false}
          className="logoutModal"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Deposit
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QRCode value={depositAddress?.depositAddress}></QRCode>

            <div className="depositModal">
              <Form.Control value={depositAddress?.depositAddress} readOnly />
              <CopyToClipboard text={depositAddress?.depositAddress}>
                <Button onClick={() => setCopied(true)}>
                  <Icon disabled name="copy outline" />
                </Button>
              </CopyToClipboard>
              {/* <Col md={12} className="mb-3"> */}
              {/* </Col> */}
            </div>
            <div className="depositModal">
              {depositAddress?.currencySymbol === "XRP" ? (
                <Form.Control value={depositAddress?.tag} readOnly />
              ) : (
                ""
              )}
            </div>
          </Modal.Body>
        </Modal>
      </Container>
      {copied && depositMoveFund ? (
        <span style={{ color: "green" }}>{toast.copied("Copied")}</span>
      ) : null}
    </div>
  );
}

export default MoveFunds;
