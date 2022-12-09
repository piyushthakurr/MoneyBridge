import { toast } from "../../../Components/Toast/toast.component";
import * as userService from "../../../Services/API/visacard.service";
import { startLoader, stopLoader } from "../Loader/loader.action";

export function getVisaCardFn(page, type) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getVisaCardApi(page, type, options)
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

export function getUserCardReqFn(page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getUserCardReqApi(page, options)
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

export function addVisaCardFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .addVisaCardApi(data, options)
        .then((res) => {
          console.log(res);

          resolve(res.data?.data);
          dispatch(stopLoader());
          toast.success(res?.data?.message?.ENG);
        })
        .catch((error) => {
          toast.error(error?.data.message);
          reject(error);

          dispatch(stopLoader());
        });
    });
}

export function updateVisaCardFn(data, id) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .updateVisaCardApi(data, id, options)
        .then((res) => {
          console.log(res);

          resolve(res.data?.data);
          dispatch(stopLoader());
          toast.success(res?.data?.message?.ENG);
        })
        .catch((error) => {
          toast.error(error?.data.message);
          reject(error);

          dispatch(stopLoader());
        });
    });
}

export function deleteCardDetailsFn(id) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .deleteCardDetailsApi(id, options)
        .then((res) => {
          console.log(res);

          resolve(res.data?.data);
          dispatch(stopLoader());
          toast.success(res?.data?.message?.ENG);
        })
        .catch((error) => {
          toast.error(error?.data.message);
          reject(error);

          dispatch(stopLoader());
        });
    });
}

export function assignCardToUserFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .assignCardToUserApi(data, options)
        .then((res) => {
          console.log(res);

          resolve(res.data?.data);
          dispatch(stopLoader());
          toast.success(res?.data?.message?.ENG);
        })
        .catch((error) => {
          toast.error(error?.data.message);
          reject(error);

          dispatch(stopLoader());
        });
    });
}
