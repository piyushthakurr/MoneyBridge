import { toast } from "../../../Components/Toast/toast.component";
import * as buysellService from "../../../Services/API/buysell.service";
import { startLoader, stopLoader } from "../Loader/loader.action";

export function activeCoinsFiatFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .getActiveCoinsFiatApi(options)
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

export function activeCoinsTradingFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .getActiveCoinsTradingApi(options)
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
export function getActivefiatCoinsFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .getActivefiatCoinsApi(options)
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

export function updateActivefiatCoinsFn(id, data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .updateActivefiatCoinsApi(id, data, options)
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

export function marketPairsListFn(coin) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .getMarketPairsListApi(coin, options)
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

export function updateMarkupMarkdownFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .updateMarkupMarkdownApi(data, options)
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

export function PairsListWithFeeFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .getPairsListWithFeeApi(options)
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

export function updateListPairFeeFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .updatePairListWithFeeApi(data, options)
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

export function BuySellLimitFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .getBuySellLimitApi(options)
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

export function updateBuySellLimitFn(data, id) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .updateBuySellLimitApi(data, id, options)
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

export function liquidityBuySellOrderFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .liquidityBuySellOrderApi(data, options)
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

export function liquidityBuyWithdrawOrderFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return buysellService
        .liquidityBuyWithdrawOrderApi(data, options)
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

export function buySellOrdersFn(data, page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
        // "body":JSON.stringify({
        // "order_type": "SELL"
        // })
      };
      dispatch(startLoader());
      return buysellService
        .buySellOrdersApi(data, page, options)
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
export function buySellTokenListingFn(data, page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
        // "body":JSON.stringify({
        // "order_type": "SELL"
        // })
      };
      dispatch(startLoader());
      return buysellService
        .buySellTokenListingApi(data, page, options)
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

export function buySellFeeListingFn(data, page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
        // "body":JSON.stringify({
        // "order_type": "SELL"
        // })
      };
      dispatch(startLoader());
      return buysellService
        .buySellFeeListingApi(data, page, options)
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

//busell fee listing by id
export function buySellFeeListingByIdFn(data, page, id) {
  alert("hello");
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
        // "body":JSON.stringify({
        // "order_type": "SELL"
        // })
      };
      dispatch(startLoader());
      return buysellService
        .buySellFeeListingByIdApi(data, page, id, options)
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
