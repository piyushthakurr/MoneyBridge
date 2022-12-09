import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Image,
  Form,
} from "react-bootstrap";
import PageTitle from "../../common/PageTitle";
import Avatar from "../../../images/user-profile/default-profile-pic.png";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "moment/locale/en-gb";
import "rc-datepicker/lib/style.css";
import "../../../App.css";
import "./profile.css";

import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import {
  get2fastatusFn,
  updateProfileImageFn,
} from "../../../Redux/Actions/profile/profile.actions";
import {
  fileUploadFn,
  getSubmittedFileAdmin,
} from "../../../Redux/Actions/user/user.action";

function Users() {
  const dispatch = useDispatch();
  let data = {
    picture: "",
    src: "",
  };
  const [imageData, setImageData] = useState(data);
  const [twoFastatusData, setTwoFastatusData] = useState([]);
  const history = useHistory();

  // constructor() {
  // super();

  // }

  // componentDidMount = () => {
  //   this.props.get2fastatusFn().then((val) => {
  //     console.log(val, "sdds");

  //   });
  // };

  const getTwoFaDetails = () => {
    dispatch(get2fastatusFn()).then((val) => {
      getAdminProfileImage(val?.detail?.profile_image_id);
      setTwoFastatusData(val);
    });
  };

  const getAdminProfileImage = (id) => {
    dispatch(getSubmittedFileAdmin({ fileId: id })).then((val) => {
      setImageData(val?.file?.s3_path);
    });
  };

  useEffect(() => {
    getTwoFaDetails();
  }, []);

  const validateFile = (name, typeis, size) => {
    size = Math.round(size / 1000) / 1024;

    var ext = name.substring(name.lastIndexOf(".") + 1);
    if (typeis == "photo") {
      if (
        ext.toLowerCase() == "png" ||
        ext.toLowerCase() == "jpg" ||
        ext.toLowerCase() == "jpeg"
      ) {
        if (size <= 1) {
          return true;
        } else {
          this.toastr.error("Document size should be less than 1 Mb.");
          return false;
        }
      } else {
        this.toastr.error("Profile image format should be png or jpg.");
        return false;
      }
    } else {
      if (
        ext.toLowerCase() == "doc" ||
        ext.toLowerCase() == "docx" ||
        ext.toLowerCase() == "pdf" ||
        ext.toLowerCase() == "png" ||
        ext.toLowerCase() == "jpg" ||
        ext.toLowerCase() == "jpeg"
      ) {
        if (size <= 1) {
          return true;
        } else {
          this.toastr.error("Document size should be less than 1 Mb.");
          return false;
        }
      } else {
        this.toastr.error(
          "Document format should be doc,pdf,png or jpg",
          "Error!"
        );

        return false;
      }
    }
  };

  const fileChangedHandler = (event) => {
    var picture = event.target.files[0];

    var src = URL.createObjectURL(picture);
    let data = {
      picture: src,
      src: src,
    };
    setImageData(data);
    dispatch(fileUploadFn(picture)).then((val) => {
      let data = {
        profile_image_id: val.data.fileId,
        id: twoFastatusData?.detail?.userid,
      };

      dispatch(updateProfileImageFn(data)).then((val) => {
        getTwoFaDetails();
      });
    });
  };

  const changePassword = () => {
    history.push("/auth/admin-dashboard-section/change-password");
  };

  // render() {
  // let { twoFastatusData, twoFastatusDetails } = this.props;

  return (
    <div>
      <Container fluid className="main-content-container px-4">
        <PageTitle title="Profile" subtitle="" />
        <Row>
          <Col md={4} className="mb-3">
            <Card>
              {!imageData && (
                <Link className="d-flex justify-content-center my-4">
                  <Image src={Avatar} roundedCircle className="avatarImages" />
                </Link>
              )}
              {imageData !== undefined && imageData !== 0 && (
                <Link className="d-flex justify-content-center my-4">
                  <Image
                    src={imageData}
                    roundedCircle
                    className="avatarImages"
                  />
                </Link>
              )}

              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  onChange={(e) => fileChangedHandler(e)}
                />
              </Form.Group>

              <Card.Body>
                <h3>Email</h3>
                <Card.Text>{twoFastatusData?.detail?.email}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8}>
            <Card className="profile_xtra">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="">Change Password</h3>
                    <p>
                      This password is required for login, Never give your
                      password away.{" "}
                    </p>
                    <br />
                  </div>

                  <Button onClick={() => changePassword()}>
                    Change Password
                  </Button>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="">Google Authentication</h3>
                    <p>Used for secure login. </p>
                    <br />
                  </div>

                  <Button
                    onClick={() =>
                      history.push(
                        "/auth/admin-dashboard-section/google-authentication-setting"
                      )
                    }
                  >
                    {!twoFastatusData?.data?.is_google_2fa_active
                      ? "Enable"
                      : "Disable"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
// }

const mapStateToProps = (state) => {
  return {
    //pairListData: state.orders.pairListData,

    twoFastatusData: state.profile.twoFastatusData,
    twoFastatusDetails: state.profile.twoFaDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getPairListFn: (data) => dispatch(getPairListFn(data))
    get2fastatusFn: () => dispatch(get2fastatusFn()),
    fileUploadFn: (data) => dispatch(fileUploadFn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
