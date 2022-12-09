import * as userService from "../../../Services/API/orders.service";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";
import { BASEURL, SUCCESS_MESSAGE } from "../../../Constants/constant";
//import { reset } from 'redux-form';

const getPairList = (pairListData) => {
  return {
    type: types.PAIR_LIST,
    payload: {
      pairListData: pairListData,
    },
  };
};
const getOrderListing = (orderListing) => {
  return {
    type: types.ORDER_LISTING,
    payload: {
      orderListData: orderListing,
    },
  };
};
export const getTradeSummary = (tradeSummaryData) => {
  return {
    type: types.TRADE_SUMMARY,
    payload: {
      tradeSummaryData: tradeSummaryData,
    },
  };
};

export function tradeSummaryFn(type) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    // let tradeData = [];

    dispatch(startLoader());
    return userService
      .tradeSummaryApi(type, options)
      .then((res) => {
        // dispatch(getTradeSummary(res.data[0]));
        // debugger;
        dispatch(stopLoader());
        return res.data[0];
      })
      .catch((error) => {
        // toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function setTradeData(data) {
  return (dispatch, getState) => {
    dispatch(getTradeSummary(data));
  };
}

export function getPairListFn(history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };

    dispatch(startLoader());
    return userService
      .getPairListApi(options)
      .then((res) => {
        dispatch(getPairList(res.data?.data));
        dispatch(stopLoader());
        return res.data.data;
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function depositeFilterDataFn(filterData) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .getorderListPair(filterData, options)
      .then((res) => {
        dispatch(getOrderListing(res.data?.data));
        dispatch(stopLoader());
        return res.data.data;
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
