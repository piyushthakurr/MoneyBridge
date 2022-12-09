import * as userService from "../../../Services/API/currency.service";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";
import { BASEURL, SUCCESS_MESSAGE } from "../../../Constants/constant";
//import { reset } from 'redux-form';

const currencyData = (currencyData) => {
  return {
    type: types.CURRENCY_DATA,
    payload: {
      currencyData: currencyData,
    },
  };
};

const currencyPairData = (currencyPairData) => {
  return {
    type: types.CURRENCY_PAIR_DATA,
    payload: {
      currencyPairData: currencyPairData,
    },
  };
};

const currencyAuth = (currencyAuth) => {
  return {
    type: types.CURRENCY_AUTH,
    payload: {
      currencyAuth: currencyAuth,
    },
  };
};

const currencyPairAuth = (currencyPairAuth) => {
  return {
    type: types.CURRENCY_PAIR_AUTH,
    payload: {
      currencyPairAuth: currencyPairAuth,
    },
  };
};

export function currencyAuthFn(isAuth) {
  return (dispatch, getState) => {
    dispatch(currencyAuth(isAuth));
  };
}

export function currencyPairAuthFn(isAuth) {
  return (dispatch, getState) => {
    dispatch(currencyPairAuth(isAuth));
  };
}

export function currencyPairFn(coin) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .currencyPairApi(coin, options)
      .then((res) => {
        dispatch(currencyPairData(res.data?.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function currencyFn(coin) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .currencyApi(coin, options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(currencyData(res.data?.data));
          dispatch(stopLoader());
          return res.data?.data;
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}
export function editFeeLimit(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .EditFeeApiCurrency(data, options)
      .then((res) => {
        toast.success(res?.data?.message);

        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function editFee(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .EditFeeApi(data, options)
      .then((res) => {
        toast.success(res?.data?.message);

        history.push("/auth/currency-pairs");

        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
