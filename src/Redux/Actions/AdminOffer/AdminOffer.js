import * as adminOfferServices from "../../../Services/API/admin.offer.services";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";

const getSingleOffer = (offerData) => {
  return {
    type: types.GET_SINGLE_OFFER,
    payload: {
      singlesellleroffer: offerData,
    },
  };
};
const getofferData = (offerData, totalrecords) => {
  return {
    type: types.GET_ALL_OFFER,
    payload: {
      offerData: offerData,
      totalrecords: totalrecords,
    },
  };
};

export function getSingleOfferfn(offerId) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminOfferServices
      .getSingleOffer(offerId, options)
      .then((res) => {
        dispatch(getSingleOffer(res.data?.data));
        dispatch(stopLoader());
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function getAlloffer(page, limit, ordertype) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminOfferServices
      .getofferListdata(page, limit, ordertype, options)
      .then((res) => {
        dispatch(getofferData(res.data?.data, res.data?.total));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
