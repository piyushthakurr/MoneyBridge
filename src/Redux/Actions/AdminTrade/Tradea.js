import * as adminTradeServices from '../../../Services/API/admin.trade.service';
import { toast } from '../../../Components/Toast/toast.component';
import * as types from '../../../Constants/_Types/types.reduxStore';
import { startLoader, stopLoader } from '../Loader/loader.action';

const getTradelistData = (tradeData, totalrecords) => {
  return {
    type: types.GET_ALL_TRADE_LIST,
    payload: {
      tradeData: tradeData,
      totalrecords: totalrecords,
    },
  };
};

const getSingleTradelistData = (tradeData) => {
  return {
    type: types.GET_SINGLE_TRADE_LIST,
    payload: {
      singletradeData: tradeData,
    },
  };
};

const getSingleSellerRelease = (tradeData) => {
  return {
    type: types.GET_SINGLE_SELLER_RELEASE,
    payload: {
      singleselller: tradeData,
    },
  };
};
const getSingleOffer = (offerData, tradeofferData) => {
  return {
    type: types.GET_SINGLE_OFFER,
    payload: {
      singlesellleroffer: offerData,
      tradeoffer: tradeofferData,
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
export function getTradeListfn(page, limit) {
  return (dispatch, getState) => {
    let options = {
      'api-access-token': getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminTradeServices
      .getTradeList(page, limit, options)
      .then((res) => {
        dispatch(getTradelistData(res.data?.data, res.data?.total));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function getSingleTradeListfn(tradeid) {
  return (dispatch, getState) => {
    let options = {
      'api-access-token': getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminTradeServices
      .getTradeListBYTradeId(tradeid, options)
      .then((res) => {
        dispatch(getSingleTradelistData(res.data?.data));
        dispatch(stopLoader());
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function getSingleSellerRealease(tradeid) {
  return (dispatch, getState) => {
    let options = {
      'api-access-token': getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminTradeServices
      .getSellerRelease(tradeid, options)
      .then((res) => {
        dispatch(getSingleSellerRelease(res.data?.data));
        dispatch(stopLoader());
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function getSingleOfferListfn(tradeid) {
  return (dispatch, getState) => {
    let options = {
      'api-access-token': getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminTradeServices
      .getSingleOffer(tradeid, options)
      .then((res) => {
        dispatch(
          getSingleOffer(res.data?.data.offer, res.data?.data?.trades[0])
        );
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
      'api-access-token': getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminTradeServices
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
