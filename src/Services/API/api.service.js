import { fetch } from "../axios.service";
import {
  USERS_BASE_URL,
  TRADING_BASE_URL,
  WALLET_BASE_URL,
} from "../../Constants/constant";

export const login = (data) => {
  return fetch("post", `${USERS_BASE_URL}/admin/login`, data);
};

export const get2fastatusApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/get2fastatus`, {}, data);
};

export const google2faAuthenticateApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/google2faAuthenticate`,
    data,
    options
  );
};

export const deviceAuthenticateApi = (data) => {
  return fetch("post", `${USERS_BASE_URL}/user/authneticateDevice`, data);
};

export const getUserKycFile = (data) => {
  return fetch("post", `${USERS_BASE_URL}/file/getFileAdmin`, data);
};

export const getUsersApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/user/list`, data, options);
};

export const searchUsersApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/user/list/search`,
    data,
    options
  );
};

export const getSubadminApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/subadmin/list`, data, options);
};

export const getActiveUsersApi = (options) => {
  return fetch("get", `${TRADING_BASE_URL}/getActiveUsers`, {}, options);
};

export const getFileUpload = (data, options) => {
  // console.log("sdsd", data);
  var formData = new FormData();
  formData.append("upload_file", data, data.name);

  return fetch("post", `${USERS_BASE_URL}/admin/upload`, formData, options);
};

export const userActionApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/user/user-action`,
    data,
    options
  );
};

export const sendAuthKeyApi = (user_id, options) => {
  return fetch(
    "get",
    `${USERS_BASE_URL}/admin/user/send-auth-key/${user_id}`,
    {},
    options
  );
};

export const singleTraderInfoApi = (traderId, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/kyc/view/${traderId}`,
    {},
    options
  );
};

export const usersWithdrawTransApi = (data, options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/${data.currency}/admin/users_withdraw_transactions/${data.page}/${data.traderID}`,
    {},
    options
  );
};

export const usersDepositTransApi = (data, options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/${data.currency}/admin/users_deposits_transactions/${data.page}/${data.traderID}`,
    {},
    options
  );
};

export const downlineApi = (user_id, options) => {
  return fetch(
    "get",
    `${USERS_BASE_URL}/admin/refferal/downline/${user_id}`,
    {},
    options
  );
};

export const statisticsApi = (user_id, options) => {
  return fetch(
    "get",
    `${USERS_BASE_URL}/admin/refferal/get_statistics/${user_id}`,
    {},
    options
  );
};

export const userBalanceApi = (coin, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/${coin}/admin/check_user_balance`,
    data,
    options
  );
};

export const filterUsersApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/user/list/search`,
    data,
    options
  );
};

export const addNotesApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/user/notes/add`, data, options);
};

export const submittedKycApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/kyc/list`, data, options);
};

export const singleKycDataApi = (userId, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/kyc/view/${userId}`,
    {},
    options
  );
};

export const kycActionApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/kyc/action`, data, options);
};

export const getKycCountApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/kyc/getCount`, data, options);
};

export const getKycFileApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/file/getFileAdmin`, data, options);
};

export const updateUserDetailsApi = (data, options) => {
  return fetch(
    "put",
    `${USERS_BASE_URL}/admin/kyc/update/${data.users_id}
  `,
    data,
    options
  );
};

export const deleteApprovedKycApi = (userId, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/kyc/delete/${userId}`,
    {},
    options
  );
};

/* export const dashboardApi = (data, options) => {
  return fetch("get", `${BANKING_BASE_URL}/admin/dashboardDataBanking`, data, options);
};
 */
