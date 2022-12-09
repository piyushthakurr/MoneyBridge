import React, { Component, useEffect, useState } from "react";
import PageTitle from "../../../common/PageTitle";
import { connect, useDispatch } from "react-redux";
import Pass from "../../../../images/passport.jpg";
import {
  Form,
  Button,
  ListGroup,
  Card,
  Image,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {
  getSubmittedFileAdmin,
  singleKycDataFn,
} from "../../../../Redux/Actions/user/user.action";
import pdfImage from "../../../../images/pdfIcon.png";

import { useHistory, useParams } from "react-router";

function Approvekyc() {
  const history = useHistory();
  const dispatch = useDispatch();
  const param = useParams();

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");

  const [singleKycData, setSingleKycData] = useState();
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    getApprovedUserInfo();
  }, []);

  const getApprovedUserInfo = () => {
    dispatch(singleKycDataFn(param.userId)).then((val) => {
      setSingleKycData(val);
      if (val?.profile_image_id) getProfilePic(val?.profile_image_id);

      if (val?.financial_doc_id) {
        getFileAdmin(val?.financial_doc_id, 4);
      }
      if (val?.letter_from_user_id) {
        getFileAdmin(val?.letter_from_user_id, 5);
      }

      if (val?.documents[0]?.file_id)
        getFileAdmin(val?.documents[0]?.file_id, 1);
      if (val?.documents[0]?.file_id_back)
        getFileAdmin(val?.documents[0]?.file_id_back, 2);
      if (val?.documents[0]?.selfie_id)
        getFileAdmin(val?.documents[0]?.selfie_id, 3);
    });
  };

  const getProfilePic = (e) => {
    dispatch(getSubmittedFileAdmin({ fileId: e })).then((val) => {
      setProfileImage(val?.file?.s3_path);
    });
  };
  const getFileAdmin = (id, type) => {
    dispatch(getSubmittedFileAdmin({ fileId: id })).then((val) => {
      switch (type) {
        case 1:
          setImage1(val?.file.s3_path);
          break;
        case 2:
          setImage2(val?.file.s3_path);
          break;
        case 3:
          setImage3(val?.file.s3_path);
          break;
        case 4:
          setImage4(val?.file.s3_path);
          break;
        case 5:
          setImage5(val?.file.s3_path);
          break;

        default:
          break;
      }
    });
    // return type === 1 ? image1 : type === 2 ? image2 : image3;
  };

  const updateUserInfo = (values) => {
    values.user_id = this.state.user_id;
    this.props.editUserInfo(values);
  };

  const updatekycDetail = (values) => {
    // alert("KYC FORM BUTTON");
  };

  return (
    <Container fluid className="main-content-container px-4 pb-4">
      <PageTitle title="User Information" subtitle="" />
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col lg={5}>
              <Card className="user_info ">
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
                </Card.Body>
              </Card>
            </Col>

            <Col lg={7}>
              <Card className="usr_personal apprvd_ones">
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
                        <span>{singleKycData?.nickname}</span>
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
                        <span>{singleKycData?.city}</span>
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
                        <sapn>{singleKycData?.zip || "-"}</sapn>
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
                    {singleKycData?.documents[0]?.type == 0 && (
                      <div>
                        <Col md={12}>
                          <div className="detail_in">
                            <label>Document No</label>
                            <span style={{ margin: "1px" }}>
                              {singleKycData?.documents[0]?.document_number}
                            </span>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className="detail_in">
                            <label>Expiry Date</label>
                            <span style={{ margin: "1px" }}>
                              {
                                singleKycData?.documents[0]?.document_expiry_date?.split(
                                  "T"
                                )[0]
                              }
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
                                    : docs?.type == 0
                                    ? "Passport"
                                    : ""}
                                </h3>
                                <Form.Group>
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
                              </Col>{" "}
                              {singleKycData != undefined &&
                                Object.keys(singleKycData).length > 0 &&
                                singleKycData?.financial_doc_id !== null &&
                                singleKycData?.letter_from_user_id !== null && (
                                  <Col lg={12} md={12} sm={12} className="mt-3">
                                    <h3>Proof Of Fund : </h3>
                                    <Form.Group>
                                      <Row>
                                        <Col lg={4} md={6} sm={12}>
                                          <h4>Financial Document</h4>
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
                                          <h4>Explanation Letter</h4>
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
                                          />
                                        </Col>
                                      </Row>
                                      {/* )} */}
                                    </Form.Group>
                                  </Col>
                                )}
                            </>
                          );
                        })}
                      </Row>
                    )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Approvekyc;
