import { fetch } from "../axios.service";
import {
  USERS_BASE_URL,
  TRADING_BASE_URL,
  WALLET_BASE_URL,
} from "../../Constants/constant";

export const withdrawListApi = (page, options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/admin/getAllWithdraws/` + page,
    {},
    options
  );
};

export const withdrawListSearchApi = (coin, data, page, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/${coin}/admin/withdraw_transactions_search/` + page,
    data,
    options
  );
};

export const allFundApi = (options) => {
  return fetch("get", `${WALLET_BASE_URL}/admin/all_funds`, {}, options);
};

export const moveFundApi = (coin, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/${coin}/admin/transfer-funds-request`,
    data,
    options
  );
};

export const fundWalletWithdrawTxnsApi = (coin, page, options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/${coin}/admin/get_funds_withdraw_txns/` + page,
    {},
    options
  );
};

export const withdrawListFiatApi = (coin, page, options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/${coin}/admin/get_withdraw_transactions/` + page,
    {},
    options
  );
};

export const withdrawFiatRequestApi = (coin, page, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/${coin}/admin/get_withdraw_transactions/` + page,
    data,
    options
  );
};

export const merchantWithdrawFiatRequestApi = (coin, page, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/merchant/admin/withdraw_transactions/${coin}/` + page,
    data,
    options
  );
};

export const withdrawLimitApi = (options) => {
  return fetch("get", `${WALLET_BASE_URL}/withdraw/settings`, {}, options);
};

export const updateWithdrawLimitApi = (id, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/setting/update/` + id,
    data,
    options
  );
};
export const withdrawFilterApi = (coin, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/${coin}/admin/withdraw_transactions_search/1`,
    data,
    options
  );
};
export const permissionRequest = (coin, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/${coin}/admin/withdraw-approval-request`,
    data,
    options
  );
};

export const balanceReportsApi = (coin, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/${coin}/admin/balanceReports`,
    {},
    options
  );
};
