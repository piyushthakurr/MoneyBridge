import { fetch } from "../axios.service";
import {
  USERS_BASE_URL,
  TRADING_BASE_URL,
  WALLET_BASE_URL,
} from "../../Constants/constant";

export const getDashboardCountsApi = (options) => {
  return fetch("get", `${USERS_BASE_URL}/admin/dashboard/counts`, {}, options);
};

export const getDashboardCryptoCountsApi = (options) => {
  return fetch("get", `${WALLET_BASE_URL}/dashboard/crypto_count`, {}, options);
};

export const getDashboardFiatCountsApi = (options) => {
  return fetch("get", `${WALLET_BASE_URL}/dashboard/fiat_count`, {}, options);
};

export const getUsersApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/user/list`, data, options);
};

export const getActiveUsersApi = (options) => {
  return fetch("get", `${TRADING_BASE_URL}/getActiveUsers`, {}, options);
};

export const tradeVolumeApi = (options) => {
  return fetch("get", `${TRADING_BASE_URL}/trade/trades_volume`, {}, options);
};

export const tradeByMonthApi = (options) => {
  return fetch("get", `${TRADING_BASE_URL}/trade/tradesByMonth`, {}, options);
};

export const activeCoinsApi = (options) => {
  return fetch("get", `${WALLET_BASE_URL}/active-coins`, {}, options);
};

export const activeAllCoinsApi = (options) => {
  return fetch("get", `${WALLET_BASE_URL}/active-all-coins`, {}, options);
};

export const fiatCoinsApi = (options) => {
  return fetch("get", `${WALLET_BASE_URL}/active-coins-fiat`, {}, options);
};

/* export const dashboardApi = (data, options) => {
  return fetch("get", `${BANKING_BASE_URL}/admin/dashboardDataBanking`, data, options);
};
 */
