import { fetch } from "../axios.service";
import { WALLET_BASE_URL } from "../../Constants/constant";

export const getAllDepositesApi = (options) => {
  return fetch("get", `${WALLET_BASE_URL}/admin/getAllDeposits`, {}, options);
};

export const depositeFilterDataApi = (coin, page, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/${coin}/admin/deposit_transactions_search/` + page,
    data,
    options
  );
};

export const getDepositFundHistory = (coin, page, options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/${coin}/admin/get_admin_deposit_funds/${page}`,
    {},
    options
  );
};

export const applypermissionRequestApi = (coin, id, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/${coin}/admin/approve_deposit/` + id,
    data,
    options
  );
};

export const depositeFiatDataApi = (coin, page, data, options) => {
  return fetch(
    // "post",
    "post",
    `${WALLET_BASE_URL}/${coin?.toLowerCase()}/admin/get_deposit_transactions/` +
      page,
    data,
    options
  );
};

export const fiatPaymentTypeApi = (type, status, options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/payment_mode?type=${type}&status=${status}`,
    {},
    options
  );
};

export const fiatPaymentTypeEditApi = (data, options) => {
  return fetch("post", `${WALLET_BASE_URL}/payment_mode/update`, data, options);
};

export const paymodeCurrencyFiatApi = (id, options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/payment_mode/currency?fiat_payment_mode_id=` + id,
    options
  );
};

export const UpdateFiatPaymentApi = (data, options) => {
  return fetch("post", `${WALLET_BASE_URL}/payment_mode/update`, data, options);
};
export const UpdateFiatPaymentFeesApi = (data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/payment_mode/currency/update
  `,
    data,
    options
  );
};
