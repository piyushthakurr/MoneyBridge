import { fetch } from "../axios.service";
import {
  USERS_BASE_URL,
  TRADING_BASE_URL,
  WALLET_BASE_URL,
} from "../../Constants/constant";

export const getSubadminListApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/subadmin/list`, data, options);
};

export const deleteSubadmin = (options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/deleteSubAdminUser`,
    {},
    options
  );
};

export const getSingleSubadmin = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/subadmin/getUser`,
    data,
    options
  );
};

export const updateSubadminApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/subadmin/update`,
    data,
    options
  );
};

export const addSubadminApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/subadmin/add`, data, options);
};
