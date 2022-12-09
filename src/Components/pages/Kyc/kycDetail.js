import React, { Component, useEffect, useState } from "react";
import PageTitle from "../../common/PageTitle";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  ListGroup,
  Card,
  Image,
  Modal,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import pdfImage from "../../../images/pdfIcon.png";

import {
  getSubmittedFileAdmin,
  kycActionFn,
  singleKycDataFn,
} from "../../../Redux/Actions/user/user.action";

function EditUser() {
  const [singleKycData, setSingleKycData] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const param = useParams();
  const [approvepopup, setApprovepopup] = useState(false);
  const [approvekycid, setApprovekycid] = useState("");
  const [deletedapprovepopup, setDeletedapprovepopup] = useState(false);
  const [deletedapproveid, setDeletedapproveid] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [image6, setImage6] = useState("");

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const getUserInfo = () => {
    dispatch(singleKycDataFn(param.userId)).then((val) => {
      setSingleKycData(val);
      if (val?.profile_image_id) getProfilePic(val?.profile_image_id);

      if (val?.documents[0]?.file_id)
        getFileAdmin(val?.documents[0]?.file_id, 1);
      if (val?.documents[0]?.file_id_back)
        getFileAdmin(val?.documents[0]?.file_id_back, 2);
      if (val?.documents[0]?.selfie_id)
        getFileAdmin(val?.documents[0]?.selfie_id, 3);

      if (val?.financial_doc_id) {
        getFileAdmin(val?.financial_doc_id, 4);
      }
      if (val?.letter_from_user_id) {
        getFileAdmin(val?.letter_from_user_id, 5);
      }

      if (val?.passport_doc_id) {
        getFileAdmin(val?.passport_doc_id, 6);
      }
    });
  };

  const updateUserInfo = (values) => {
    values.user_id = this.state.user_id;
    this.props.editUserInfo(values);
  };

  // const updatekycDetail = (values) => {
  //   /* let kycData = {
  //           kyc_id:this.state.kyc_id,
  //           user_id:this.state.user_id
  //       }
  //       this.props.updateUserKycInfo(kycData) */
  //   alert("KYC FORM BUTTON");
  // };

  // const approveKycStatus = () => {
  //   let kycData = {
  //     kyc_id: this.state.kyc_id,
  //     user_id: this.state.user_id,
  //     kyc_status: "1",
  //   };
  //   this.props.updateUserKycInfo(kycData);
  // };

  // const rejectKycStatus = () => {
  //   let kycData = {
  //     kyc_id: this.state.kyc_id,
  //     user_id: this.state.user_id,
  //     kyc_status: "0",
  //   };
  //   this.props.updateUserKycInfo(kycData);
  // };

  const approveKycAction = (user_id) => {
    let kycActionParams = {
      id: user_id,
      isDeclined: "no",
    };
    dispatch(kycActionFn(kycActionParams, history)).then((res) => {
      history.goBack();
    });
  };

  const rejectKycAction = (user_id) => {
    let kycActionParams = {
      id: user_id,
      isDeclined: "yes",
      reason: rejectReason,
    };
    dispatch(kycActionFn(kycActionParams, history)).then((res) => {
      history.goBack();
    });
  };
  const approvepopupopen = (approveid) => {
    setApprovekycid(approveid);
    setApprovepopup(true);
  };
  const rejectopenpopup = (rejectid) => {
    setDeletedapproveid(rejectid);
    setDeletedapprovepopup(true);
  };
  const handleClose = () => {
    setApprovepopup(false);
    setDeletedapprovepopup(false);
  };

  const getFileAdmin = (id, type) => {
    dispatch(getSubmittedFileAdmin({ fileId: id })).then((val) => {
      // type === 1
      //   ? setImage1(val.file.s3_path)
      //   : type === 2
      //   ? setImage2(val.file.s3_path)
      //   : type === 3
      //   ? setImage3(val.file.s3_path)
      //   : type === 4
      //   ? setImage4(val.file.s3_path)
      //   : setImage5(val.file.s3_path);

      switch (type) {
        case 1:
          setImage1(val?.file?.s3_path);
          break;
        case 2:
          setImage2(val?.file?.s3_path);
          break;
        case 3:
          setImage3(val?.file?.s3_path);
          break;
        case 4:
          setImage4(val?.file?.s3_path);
          break;
        case 5:
          setImage5(val?.file?.s3_path);
          break;
        case 6:
          setImage6(val?.file?.s3_path);
          break;

        default:
          break;
      }
    });
  };

  const getProfilePic = (e) => {
    dispatch(getSubmittedFileAdmin({ fileId: e })).then((val) => {
      setProfileImage(val?.file?.s3_path);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <PageTitle title="User Information" subtitle="" />
      <Card>
        <Card.Body>
          <Row>
            <Col lg={5}>
              <Card className="user_info">
                {!singleKycData?.profile_image_id && (
                  <Card.Img
                    variant="top"
                    className="profilePic"
                    src="https://dwpsbhiwani.in/wp-content/uploads/2020/03/00-user-dummy-200x200-1.png"
                  />
                )}

                {singleKycData?.profile_image_id && profileImage && (
                  <Card.Img
                    variant="top"
                    src={profileImage}
                    className="profilePic"
                  />
                )}

                <Card.Body className="text-center">
                  <Card.Title>
                    {singleKycData?.firstname} {singleKycData?.lastname}
                  </Card.Title>
                  <Card.Text>{singleKycData?.email}</Card.Text>
                  <div class="kyc_status">
                    <Button
                      variant="success"
                      onClick={() => approvepopupopen(singleKycData?.users_id)}
                    >
                      Approve
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => rejectopenpopup(singleKycData?.users_id)}
                    >
                      Reject
                    </Button>{" "}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={7}>
              <Card className="usr_personal">
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <h3 className="mb-3">User Personal Detail</h3>
                    </Col>
                    <Col md={12}>
                      <div className="detail_in">
                        <label>Name</label>
                        <span>
                          {singleKycData?.firstname +
                            "" +
                            singleKycData?.lastname}
                        </span>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="detail_in">
                        <label>Username</label>
                        <span>{singleKycData?.nickname || "-"}</span>
                      </div>
                    </Col>

                    <Col md={12}>
                      <div className="detail_in">
                        <label>Account Type</label>
                        <span>{singleKycData?.account_type}</span>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="detail_in">
                        <label>City</label>
                        <span>{singleKycData?.city || "-"}</span>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="detail_in">
                        <label>Country</label>
                        <span>{singleKycData?.country_id}</span>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="detail_in">
                        <label>DOB</label>
                        <span>
                          {singleKycData?.dob &&
                            singleKycData?.dob.split("T")[0]}
                        </span>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="detail_in">
                        <label>Gender</label>
                        <span>
                          {singleKycData?.gender == 0 ? "Male" : "Female"}
                        </span>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="detail_in">
                        <label>Tax Number</label>
                        <span>{singleKycData?.tax_no || "-"}</span>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="detail_in">
                        <label>Zip Code/Postal Code</label>
                        <span>{singleKycData?.zip}</span>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="detail_in">
                        <label>Phone</label>
                        <span style={{ margin: "1px" }}>
                          {singleKycData?.mobile_no
                            ? singleKycData?.country_code +
                              " " +
                              singleKycData?.mobile_no
                            : "-"}
                        </span>
                      </div>
                    </Col>

                    {singleKycData?.doc_expiry_date &&
                      singleKycData?.passport_no && (
                        <div>
                          <Col md={12}>
                            <div className="detail_in">
                              <label>Document No</label>
                              <span style={{ margin: "1px" }}>
                                {singleKycData?.documents[0]?.document_number ||
                                  singleKycData?.passport_no}
                              </span>
                            </div>
                          </Col>
                          <Col md={12}>
                            <div className="detail_in">
                              <label>Expiry Date</label>
                              <span style={{ margin: "1px" }}>
                                {singleKycData?.documents[0]?.document_expiry_date?.split(
                                  "T"
                                )[0] ||
                                  singleKycData?.doc_expiry_date?.split("T")[0]}
                              </span>
                            </div>
                          </Col>
                        </div>
                      )}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={12} className="mt-3">
              <Card>
                <Card.Body className="kyc_doc">
                  {singleKycData != undefined &&
                    Object.keys(singleKycData).length > 0 &&
                    singleKycData?.documents &&
                    !singleKycData?.financial_doc_id &&
                    !singleKycData?.letter_from_user_id &&
                    singleKycData.documents.length > 0 && (
                      <Row flex-wrap>
                        {singleKycData?.documents.map((docs) => {
                          return (
                            <>
                              <Col lg={12} md={12} sm={12}>
                                <h3>
                                  Document Type :{" "}
                                  {docs?.type == 1
                                    ? "Identity Card"
                                    : docs?.type == 2
                                    ? "Driving Licence"
                                    : ""}
                                </h3>
                                <Form.Group>
                                  {/* {kycDta.file_name == "video" ? (
                                  <video
                                    max-width="320"
                                    width="100%"
                                    height="240"
                                    controls
                                    onClick={() =>
                                      this.setState({
                                        modalShow: true,
                                        kycFilePath: kycDta.file_path,
                                        kycFileName: kycDta.file_name,
                                      })
                                    }
                                  >
                                    <source
                                      src={kycDta.file_path}
                                      type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                  </video>
                                ) : ( */}
                                  <Row>
                                    <Col lg={4} md={6} sm={12}>
                                      <h4>
                                        {docs?.file_id != "" ? "Front" : ""}
                                      </h4>
                                      <Image
                                        className="doc_img"
                                        src={
                                          !image1.includes(".pdf")
                                            ? image1
                                            : pdfImage
                                        }
                                        onClick={() =>
                                          window.open(image1, "_blank")
                                        }
                                        thumbnail
                                      />
                                    </Col>
                                    {docs?.type != 0 && docs?.type != 2 && (
                                      <Col lg={4} md={6} sm={12}>
                                        <h4>
                                          {docs?.file_id_back != ""
                                            ? "Back"
                                            : ""}
                                        </h4>
                                        <Image
                                          className="doc_img"
                                          src={
                                            !image2.includes(".pdf")
                                              ? image2
                                              : pdfImage
                                          }
                                          onClick={() =>
                                            window.open(image2, "_blank")
                                          }
                                        />
                                      </Col>
                                    )}
                                    <Col lg={4} md={6} sm={12}>
                                      <h4>
                                        {docs?.selfie_id != "" ? "Selfie" : ""}
                                      </h4>
                                      <Image
                                        className="doc_img"
                                        src={
                                          !image3.includes(".pdf")
                                            ? image3
                                            : pdfImage
                                        }
                                        onClick={() =>
                                          window.open(image3, "_blank")
                                        }
                                        thumbnail
                                      />
                                    </Col>
                                  </Row>
                                  {/* )} */}
                                </Form.Group>
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                    )}

                  {singleKycData != undefined &&
                    Object.keys(singleKycData).length > 0 &&
                    singleKycData?.financial_doc_id &&
                    singleKycData?.letter_from_user_id && (
                      <Row flex-wrap>
                        <>
                          <Col lg={12} md={12} sm={12}>
                            <h3>Proof Of Fund :</h3>
                            <Form.Group>
                              {/* {kycDta.file_name == "video" ? (
                                    <video
                                      max-width="320"
                                      width="100%"
                                      height="240"
                                      controls
                                      onClick={() =>
                                        this.setState({
                                          modalShow: true,
                                          kycFilePath: kycDta.file_path,
                                          kycFileName: kycDta.file_name,
                                        })
                                      }
                                    >
                                      <source
                                        src={kycDta.file_path}
                                        type="video/mp4"
                                      />
                                      Your browser does not support the video tag.
                                    </video>
                                  ) : ( */}
                              <Row>
                                <Col lg={4} md={6} sm={12}>
                                  <h4>
                                    {singleKycData.financial_doc_id != null
                                      ? "Financial Document"
                                      : ""}
                                  </h4>
                                  <Image
                                    className="doc_img"
                                    src={
                                      !image4.includes(".pdf")
                                        ? image4
                                        : pdfImage
                                    }
                                    onClick={() =>
                                      window.open(image4, "_blank")
                                    }
                                    thumbnail
                                  />
                                </Col>

                                <Col lg={4} md={6} sm={12}>
                                  <h4>
                                    {singleKycData.letter_from_user_id != null
                                      ? "Letter"
                                      : ""}
                                  </h4>
                                  <Image
                                    className="doc_img"
                                    src={
                                      !image5.includes(".pdf")
                                        ? image5
                                        : pdfImage
                                    }
                                    onClick={() =>
                                      window.open(image5, "_blank")
                                    }
                                    thumbnail
                                  />
                                </Col>
                              </Row>
                              <Row className="mt-5">
                                <Col lg={4} md={6} sm={12}>
                                  <h4>
                                    {singleKycData?.passport_doc_id != ""
                                      ? "Passport Front"
                                      : ""}
                                  </h4>
                                  <Image
                                    className="doc_img"
                                    src={
                                      !image6.includes(".pdf")
                                        ? image6
                                        : pdfImage
                                    }
                                    onClick={() =>
                                      window.open(image6, "_blank")
                                    }
                                    thumbnail
                                  />
                                </Col>

                                <Col lg={4} md={6} sm={12}>
                                  <h4>
                                    {singleKycData?.selfie_id != ""
                                      ? "Passport Selfie"
                                      : ""}
                                  </h4>
                                  <Image
                                    className="doc_img"
                                    src={
                                      !image3.includes(".pdf")
                                        ? image3
                                        : pdfImage
                                    }
                                    onClick={() =>
                                      window.open(image3, "_blank")
                                    }
                                    thumbnail
                                  />
                                </Col>
                              </Row>
                              {/* )} */}
                            </Form.Group>
                          </Col>
                        </>
                      </Row>
                    )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {approvepopup && (
        <Modal
          show={approvepopup}
          onHide={() => handleClose()}
          keyboard={false}
          className="logoutModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Approve</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to approve ?</Modal.Body>
          <Modal.Footer className="justify-content-end">
            <Button variant="secondary" onClick={() => handleClose()}>
              Cancel
            </Button>
            <Button
              variant="primary"
              tag={Link}
              onClick={() => approveKycAction(approvekycid)}
            >
              Approve
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {deletedapprovepopup && (
        <Modal
          show={deletedapprovepopup}
          onHide={() => handleClose()}
          keyboard={false}
          className="logoutModal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure want to reject ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-0">
              <Form.Control
                type="text"
                name="reason"
                placeholder="Enter reason"
                onChange={(e) => setRejectReason(e.target.value.trim())}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="justify-content-end">
            <Button variant="secondary" onClick={() => handleClose()}>
              Cancel
            </Button>{" "}
            <Button
              variant="primary"
              tag={Link}
              onClick={() => rejectKycAction(deletedapproveid)}
              disabled={!rejectReason}
            >
              Reject
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default EditUser;
