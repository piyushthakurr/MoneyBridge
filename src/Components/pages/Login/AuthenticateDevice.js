import React from "react";
import { connect } from "react-redux";
import { deviceAuthenticateFn } from "../../../Redux/Actions/user/user.action";
import MoneyBridgeLogo from "../../../images/logo.svg";
import { decryption } from "../../../Services/axios.service";

const LOGIN_BASE_URL = "https://qa.stage-rapix.xyz/admin/";

class AuthenticateDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
    };
  }

  componentDidMount = () => {
    const data = { hash: this.state.id };
    this.props.deviceAuthenticateFn(data);

    decryption(data);
  };

  render() {
    return (
      <div>
        <div
          style={{
            overflow: "hidden",
            top: "0",
            height: "64px",
            paddingLeft: "50px",
            paddingTop: "20px",
            backgroundColor: "white",
            position: "fixed",
            width: "100%",
          }}
        >
          <div>
            <a href={LOGIN_BASE_URL}>
              <img src={MoneyBridgeLogo} alt="BWB Dashboard" />
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: "100px",
            backgroundColor: "#FFFAA0",
            position: "fixed",
            height: "600px",
            width: "100%",
          }}
        >
          <div
            className="container-fluid"
            style={{
              paddingTop: "35px",
              paddingBottom: "35px",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <div
              className="container pd-0 "
              style={{
                boxShadow: "-2px 9px 23px 0 rgba(75, 64, 64, .09)",
                backGround: "white",
                width: "100%",
                minWidth: "300px",
                boxSizing: "border-box",
                position: "relative",
                margin: "20px auto 50px",
                borderRadius: "1px !important",
                padding: "25px 45px",
                zIndex: "2",
                backgroundColor: "#ffffff",
              }}
            >
              <div className="left-side ">
                <div className="text-center" style={{ marginBottom: "20px" }}>
                  <h2
                    style={{
                      fontSize: "18px",
                      color: "#3f3f3f",
                      fontWeight: 400,
                      marginBottom: "0px",
                    }}
                  >
                    New Device is authorized successfully
                  </h2>
                </div>
                <p
                  style={{
                    fontSize: "17px",
                    textAlign: "center",
                    fontWeight: 400,
                  }}
                >
                  You have successfully authorised a new device, Please try to
                  log in with it again.<br></br>
                  <a
                    href={LOGIN_BASE_URL}
                    style={{
                      color: "#947FFE",
                      display: "block",
                      textAlign: "center",
                      fontWeight: "700",
                      marginTop: "10px",
                      textDecoration: "none",
                    }}
                  >
                    Log In &nbsp;
                  </a>
                </p>
                {/* <div className="table-responsive" style={{marginTop: "20px",
                                                                                   fontSize: "15px",
                                                                                   fontWeight: "600", 
                                                                                   paddingBottom: "10px"}}>
                            <table className="table-style" style={{width:"100%"}}>
                                <tr>
                                    <th className="text-left" style={{verticalAlign: "top"}}>Device</th>
                                    <td className="text-right" style={{whiteSpace: "nowrap"}} >{}</td>
                                </tr>
                                <tr>
                                    <th className="text-left" style={{verticalAlign: "top", whiteSpace: "nowrap"}}>IP Address</th>
                                    <td className="text-right">182.73.149.42</td>
                                </tr>
                            </table>
                          </div> */}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "white",
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            color: "gray",
          }}
        >
          <p>
            © 2020 BLACKBOX — All rights reserved
            <br></br>
            <small>
              Powered by &nbsp;
              <a
                href="https://antiersolutions.com/"
                style={{ color: "skyblue", textDecoration: "none" }}
              >
                Antier Solutions Pvt Ltd
              </a>
            </small>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    deviceVerification: state.deviceVerification,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deviceAuthenticateFn: (data) => dispatch(deviceAuthenticateFn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateDevice);
