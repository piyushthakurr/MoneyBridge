import { startLoader, stopLoader } from "../Loader/loader.action";
import * as userService from "../../../Services/API/agencyManagement.service";
import { toast } from "../../../Components/Toast/toast.component";

export function getMerchantlistFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getMerchantlistApi(data, options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          // toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}

export function approveDisapproveMerchantFn(id, status) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .approveDisapproveMerchantApi(id, status, options)
        .then((res) => {
          toast.success(res?.data?.message);
          resolve(res.data?.data);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          // toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}

export function updateMerchantPaymentLimitFn(id, data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .updateMerchantPaymentLimit(id, data, options)
        .then((res) => {
          toast.success(res?.data?.message);
          resolve(res.data?.data);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          // toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}

export function getMerchantCommissionListFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getMerchantCommissionListApi(options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          // toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}

export function updatecommisionFeeFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .updatecommisionFeeApi(data, options)
        .then((res) => {
          resolve(res.data?.data);
          toast.success(res?.data?.message);

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}

export function cryptoFiatTransHistoryFn(page, type, data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .cryptoFiatTransHistoryApi(page, type, data, options)
        .then((res) => {
          resolve(res?.data);
          // toast.success(res?.data?.message);

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}
