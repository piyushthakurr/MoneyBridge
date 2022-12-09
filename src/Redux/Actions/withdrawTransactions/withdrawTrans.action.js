import * as walletService from "../../../Services/API/withdraw.service";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";

//import { reset } from 'redux-form';

const saveBalancereport = (data) => {
  return {
    type: types.BALANCE_REPORTS,
    payload: {
      data: data,
    },
  };
};

const withdrawList = (withdrawListData) => {
  return {
    type: types.WITHDRAW_LIST,
    payload: {
      withdrawListData: withdrawListData,
    },
  };
};

const withdrawAuth = (withdrawAuth) => {
  return {
    type: types.WITHDRAW_AUTH,
    payload: {
      withdrawAuth: withdrawAuth,
    },
  };
};
const permissionLIst = (permissionData) => {
  return {
    type: types.PERMISSION_LISTING,
    payload: {
      permissionLIstData: permissionData,
    },
  };
};
export function withdrawAuthFn(isAuth) {
  return (dispatch, getState) => {
    dispatch(withdrawAuth(isAuth));
  };
}

export function withdrawFilterDataFn(coin, data) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return walletService
      .withdrawFilterApi(coin, data, options)
      .then((res) => {
        dispatch(withdrawList(res.data?.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function withdrawListFn(page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return walletService
        .withdrawListApi(page, options)
        .then((res) => {
          resolve(res.data);
          dispatch(withdrawList(res.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function withdrawListSearchFn(coin, data, page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return walletService
        .withdrawListSearchApi(coin, data, page, options)
        .then((res) => {
          resolve(res.data);
          dispatch(withdrawList(res.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function withdrawListFiatFn(coin, page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return walletService
        .withdrawListFiatApi(coin, page, options)
        .then((res) => {
          resolve(res.data);
          dispatch(withdrawList(res.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function withdrawFiatRequestFn(coin, page, data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return walletService
        .withdrawFiatRequestApi(coin, page, data, options)
        .then((res) => {
          resolve(res.data);
          dispatch(withdrawList(res.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function merchantWithdrawFiatRequestFn(coin, page, data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return walletService
        .merchantWithdrawFiatRequestApi(coin, page, data, options)
        .then((res) => {
          resolve(res.data);
          dispatch(withdrawList(res.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function withdrawLimitFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return walletService
        .withdrawLimitApi(options)
        .then((res) => {
          resolve(res.data);
          dispatch(withdrawList(res.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function updateWithdrawLimitFn(id, data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return walletService
        .updateWithdrawLimitApi(id, data, options)
        .then((res) => {
          resolve(res.data);
          dispatch(withdrawList(res.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function applypermissionRequest(coin, permissiondata) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return walletService
      .permissionRequest(coin, permissiondata, options)
      .then((res) => {
        toast.success(res.data?.message);
        dispatch(permissionLIst(res.data?.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function balanceReportFn(coin) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return walletService
        .balanceReportsApi(coin, options)
        .then((res) => {
          resolve(res.data);
          let item = {
            data: res.data,
            coin: coin,
          };
          dispatch(saveBalancereport(item));
          // toast.success(res.data?.message);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          // toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}
