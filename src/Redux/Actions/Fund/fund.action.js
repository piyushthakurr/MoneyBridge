import * as userService from "../../../Services/API/withdraw.service";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";
import { BASEURL, SUCCESS_MESSAGE } from "../../../Constants/constant";
//import { reset } from 'redux-form';

const getAllDeposites = (getAllDeposites, totalRecords) => {
  return {
    type: types.DEPOSITE_TRANS,
    payload: {
      getAllDeposites: getAllDeposites,
      totalRecords: totalRecords,
    },
  };
};

export function allfundsFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .allFundApi(options)
        .then((res) => {
          resolve(res.data);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function moveFundFn(coin, data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .moveFundApi(coin, data, options)
        .then((res) => {
          resolve(res.data);
          toast.error(res?.data?.message);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function fundWalletWithdrawTxnsFn(coin, page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .fundWalletWithdrawTxnsApi(coin, page, options)
        .then((res) => {
          resolve(res.data);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}
