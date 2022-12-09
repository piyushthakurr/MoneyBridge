import { fetch } from "../axios.service";
import {
  USERS_BASE_URL,
  TRADING_BASE_URL,
  WALLET_BASE_URL,
} from "../../Constants/constant";

export const get2fastatusApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/get2fastatus`, {}, options);
};

export const changePasswordApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/resetPassword`, data, options);
};

export const enableGoogleAuthApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/google2fa`, data, options);
};

export const enableGoogleValidateApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/google2faValidate`,
    data,
    options
  );
};

export const disableGoogleValidateApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/google2faDisable`,
    data,
    options
  );
};

export const updateProfileImage = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/image/update`, data, options);
};
