import * as depositService from "../../../Services/API/deposite.service";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";
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

export function depositeFilterDataFn(coin, page, data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return depositService
        .depositeFilterDataApi(coin, page, data, options)
        .then((res) => {
          resolve(res.data);
          dispatch(getAllDeposites(res.data, res.data.totalRecords));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function getDepositFundHistoryFn(coin, page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return depositService
        .getDepositFundHistory(coin, page, options)
        .then((res) => {
          resolve(res.data);
          dispatch(getAllDeposites(res.data, res.data.totalRecords));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function applypermissionRequestFn(coin, id, permissiondata) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return depositService
      .applypermissionRequestApi(coin, id, permissiondata, options)
      .then((res) => {
        toast.success(res.data?.message);
        // dispatch(permissionLIst(res.data?.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function depositeFiatDataFn(coin, page, data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return depositService
        .depositeFiatDataApi(coin, page, data, options)
        .then((res) => {
          resolve(res.data);
          dispatch(getAllDeposites(res.data, res.data.totalRecords));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function fiatPaymentTypeFn(coin, page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return depositService
        .fiatPaymentTypeApi(coin, page, options)
        .then((res) => {
          resolve(res.data);
          dispatch(getAllDeposites(res.data, res.data.totalRecords));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function fiatPaymentTypeEditFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return depositService
        .fiatPaymentTypeEditApi(data, options)
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

export function paymodeCurrencyFiatFn(id) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return depositService
        .paymodeCurrencyFiatApi(id, options)
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

export function UpdateFiatPaymentFeesFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return depositService
        .UpdateFiatPaymentFeesApi(data, options)
        .then((res) => {
          resolve(res.data);
          toast.success(res?.data?.message);

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function updateFiatPaymentTypeFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return depositService
        .UpdateFiatPaymentApi(data, options)
        .then((res) => {
          resolve(res.data);
          dispatch(getAllDeposites(res.data, res.data.totalRecords));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function getAllDepositesFn(history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return depositService
      .getAllDepositesApi(options)
      .then((res) => {
        dispatch(getAllDeposites(res.data?.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
