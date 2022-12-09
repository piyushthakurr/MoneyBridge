import { WALLET_BASE_URL } from "../../Constants/constant";
import { fetch } from "../axios.service";

export const getVisaCardApi = (page, type, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/admin/card/get/${page}`,
    type,
    options
  );
};

export const addVisaCardApi = (data, options) => {
  return fetch("post", `${WALLET_BASE_URL}/admin/card/add`, data, options);
};

export const updateVisaCardApi = (data, id, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/admin/card/update/${id}`,
    data,
    options
  );
};

export const deleteCardDetailsApi = (id, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/admin/card/delete/${id}`,
    {},
    options
  );
};

export const getUserCardReqApi = (page, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/admin/card/requests/list/${page}`,
    {},
    options
  );
};
export const assignCardToUserApi = (data, options) => {
  return fetch("post", `${WALLET_BASE_URL}/admin/card/assign`, data, options);
};
