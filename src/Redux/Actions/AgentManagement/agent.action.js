import { startLoader, stopLoader } from "../Loader/loader.action";
import * as userService from "../../../Services/API/agencyManagement.service";
import { toast } from "../../../Components/Toast/toast.component";

export function getAgentlistFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getAgentlistApi(data, options)
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

export function getAgentTicketFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .agentTicketsApi(data, options)
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

export function approveDisapproveAgentFn(id, status) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .approveDisapproveAgentApi(id, status, options)
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

export function getAgentFeeListFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getAgentFeeListApi(options)
        .then((res) => {
          resolve(res.data);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          // toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}

export function updateAgentFeeFn(data, id) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .updateAgentFeeApi(data, id, options)
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

export function getAgentCommissionListFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getAgentCommissionListApi(options)
        .then((res) => {
          resolve(res.data);
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
        .updateAgentCommisionFeeApi(data, options)
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

export function ticketTransactionsFn(data, page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .ticketTransactionsApi(data, page, options)
        .then((res) => {
          resolve(res.data);

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}

export function agentCommissionCoinWiseFn(coin) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .agentCommissionCoinWiseApi(coin, options)
        .then((res) => {
          resolve(res.data);

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}

export function agentWithdrawTxnsFn(coin, page, data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .agentWithdrawTxnsApi(coin, page, data, options)
        .then((res) => {
          resolve(res.data);

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}
