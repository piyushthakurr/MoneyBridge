import React, { useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import "../../../App.css";

import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import QR from "qrcode-base64";
import QRCode from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  enableGoogleAuthFn,
  get2fastatusFn,
  enableGoogleValidateFn,
  disableGoogleValidateFn,
} from "../../../Redux/Actions/profile/profile.actions";
import "./googleAuth.css";
import { toast } from "../../Toast/toast.component";

export default function GoogleAuth() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [twoFastatusData, setTwoFastatusData] = useState();
  const [enableGoogleAuthData, setEnableGoogleAuthData] = useState();
  const [token, setToken] = useState();

  const [accept, setAccept] = useState();

  const [secretKeyCopied, setSecretKeyCopied] = useState();

  const [copied, setCopied] = useState(false);

  // constructor() {
  //   super();
  //   this.state = {
  //     token: "",
  //     secretKeyCopied: "",
  //     value: "",
  //     copied: false,
  //     accept: false,
  //   };
  // }

  // componentDidMount = () => {

  //   this.props.get2fastatusFn();
  //   this.props.enableGoogleAuthFn(params);
  // };

  const get2fastatus = () => {
    dispatch(get2fastatusFn()).then((res) => {
      setTwoFastatusData(res);
    });

    dispatch(enableGoogleAuthFn({ issuer: "RapiXchange" })).then((val) => {
      setEnableGoogleAuthData(val);
    });
  };

  useEffect(() => {
    get2fastatus();
  }, []);

  const changePassword = () => {
    history.push("/auth/admin-dashboard-section/change-password");
  };

  const enableGoogleAuth = () => {
    let enableGoogleParams = {
      secret: enableGoogleAuthData?.secret,
      token: token,
    };
    dispatch(enableGoogleValidateFn(enableGoogleParams, history));
  };

  const disableGoogleAuth = () => {
    let disableGoogleAuthParams = {
      token: token,
    };
    dispatch(disableGoogleValidateFn(disableGoogleAuthParams, history));
  };
  const googlecheckenabled = (e) => {
    setSecretKeyCopied(token);

    if (e.target.checked == false) {
      setAccept(false);
    } else {
      setAccept(true);
    }
  };

  // let { enableGoogleAuthData, twoFastatusData } = this.props;
  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Enable Google Authentication" subtitle="" />
        {twoFastatusData?.is_google_2fa_active === 0 ? (
          <div style={{ textAlign: "center" }}>
            <Card>
              <Card.Body>
                <img src={enableGoogleAuthData?.qrImgUrl} />
              </Card.Body>

              <Form.Group className="col-lg-6 col-md-12 mx-auto">
                <Form.Label>Verify Token</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Token"
                  onChange={(e) => setToken(e.target.value) && setCopied(false)}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group className="col-lg-6 col-md-12 mx-auto">
                <div className="copy_btn">
                  <Form.Control
                    type="text"
                    value={enableGoogleAuthData?.secret}
                    disabled
                  />
                  <CopyToClipboard
                    text={enableGoogleAuthData?.secret}
                    onCopy={() => setCopied(true)}
                  >
                    <Button>Copy</Button>
                  </CopyToClipboard>
                </div>
              </Form.Group>
              {copied ? (
                <span style={{ color: "green" }}>{toast.copied("Copied")}</span>
              ) : null}
              <div key={`default-checkbox`} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={`default-checkbox`}
                  label="Make sure you have saved your key"
                  disabled={!token}
                  onChange={(e) => googlecheckenabled(e)}
                />
                <Button
                  style={{ margin: "10px" }}
                  onClick={(e) => enableGoogleAuth(e)}
                  disabled={!accept || !token}
                >
                  Submit
                </Button>
                <Button onClick={() => history.push("/auth/dashboard")}>
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <>
            <div
              style={{ textAlign: "center" }}
              className="w-50 mx-auto pl-5 pr-5"
            >
              <Card>
                <Form.Group className="p-4">
                  <Form.Label className="pb-3">
                    Enter Token To Disable Google Authenticator
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Token"
                    onChange={(e) => setToken(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="mb-3">
                  <Button
                    style={{ margin: "10px" }}
                    onClick={() => disableGoogleAuth()}
                  >
                    Update
                  </Button>
                  <Button onClick={() => history.push("/auth/dashboard")}>
                    Cancel
                  </Button>
                </div>
              </Card>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     //pairListData: state.orders.pairListData,,
//     enableGoogleAuthData: state.profile.enableGoogleAuthData,
//     twoFastatusData: state.profile.twoFastatusData,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // getPairListFn: (data) => dispatch(getPairListFn(data))
//     enableGoogleAuthFn: (data) => dispatch(enableGoogleAuthFn(data)),
//     get2fastatusFn: (data) => dispatch(get2fastatusFn(data)),
//     disableGoogleValidateFn: (data, history) =>
//       dispatch(disableGoogleValidateFn(data, history)),
//     enableGoogleValidateFn: (data, history) =>
//       dispatch(enableGoogleValidateFn(data, history)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Users);
