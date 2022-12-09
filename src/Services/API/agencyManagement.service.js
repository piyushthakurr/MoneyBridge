import { USERS_BASE_URL, WALLET_BASE_URL } from "../../Constants/constant";
import { fetch } from "../axios.service";

export const getAgencyCodeListApi = (page, options) => {
  return fetch(
    "get",
    `${USERS_BASE_URL}/admin/agency-code/${page}`,
    {},
    options
  );
};
export const deletAgencycodeApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/delete-agency-code`,
    data,
    options
  );
};
export const updateAgencyCodeApi = (data, options) => {
  return fetch("post", `${USERS_BASE_URL}/admin/agency-code`, data, options);
};

// merchant commission management apis

export const getMerchantlistApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/user/list/merchant`,
    data,
    options
  );
};

export const approveDisapproveMerchantApi = (id, status, options) => {
  return fetch(
    "get",
    `${USERS_BASE_URL}/admin/approve/${id}/${status}`,
    {},
    options
  );
};

export const getMerchantCommissionListApi = (options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/merchant/admin/commission/list`,
    {},
    options
  );
};

export const updatecommisionFeeApi = (data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/merchant/admin/commission/update`,
    data,
    options
  );
};

export const cryptoFiatTransHistoryApi = (page, type, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/merchant/admin/transaction/list/${page}/${type}`,
    data,
    options
  );
};

export const updateMerchantPaymentLimit = (id, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/merchant/admin/setting/update/${id}`,
    data,
    options
  );
};

// agent management apis

export const getAgentlistApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/admin/user/list/agent`,
    data,
    options
  );
};

export const approveDisapproveAgentApi = (id, status, options) => {
  return fetch(
    "get",
    `${USERS_BASE_URL}/admin/user/approve/agent/${id}/${status}`,
    {},
    options
  );
};

export const getAgentFeeListApi = (options) => {
  return fetch("post", `${WALLET_BASE_URL}/agent_fee/admin`, {}, options);
};

export const updateAgentFeeApi = (data, id, options) => {
  return fetch(
    "put",
    `${WALLET_BASE_URL}/agent_fee/admin/${id}`,
    data,
    options
  );
};

export const getAgentCommissionListApi = (options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/agent/admin/commission/list`,
    {},
    options
  );
};

export const updateAgentCommisionFeeApi = (data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/update/agent/admin/commission`,
    data,
    options
  );
};

export const agentTicketsApi = (data, options) => {
  return fetch(
    "post",
    `${USERS_BASE_URL}/user/ticketListByAdmin`,
    data,
    options
  );
};

export const ticketTransactionsApi = (data, page, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/admin/get_ticket_transactions/${page}`,
    data,
    options
  );
};

export const agentCommissionCoinWiseApi = (coin, options) => {
  return fetch(
    "get",
    `${WALLET_BASE_URL}/admin/commission/${coin}`,
    {},
    options
  );
};

export const agentWithdrawTxnsApi = (coin, page, data, options) => {
  return fetch(
    "post",
    `${WALLET_BASE_URL}/admin/agent/withdraw_transactions/${coin}/${page}`,
    data,
    options
  );
};
