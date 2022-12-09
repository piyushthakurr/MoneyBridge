import { BUYSELL_BASE_URL } from "../../Constants/constant";
import { fetch } from "../axios.service";

export const getActiveCoinsFiatApi = (options) => {
  return fetch(
    "get",
    `${BUYSELL_BASE_URL}/admin/getactivefiatcoins`,
    {},
    options
  );
};

export const getActiveCoinsTradingApi = (options) => {
  return fetch(
    "get",
    `${BUYSELL_BASE_URL}/trading/getactivecoins`,
    {},
    options
  );
};

export const getActivefiatCoinsApi = (options) => {
  return fetch(
    "get",
    `${BUYSELL_BASE_URL}/admin/getactivefiatcoins`,
    {},
    options
  );
};

export const updateActivefiatCoinsApi = (id, data, options) => {
  return fetch(
    "post",
    `${BUYSELL_BASE_URL}/admin/getactivefiatcoins/update/` + id,
    data,
    options
  );
};

export const getMarketPairsListApi = (coin, options) => {
  if (coin != undefined && coin != "") {
    return fetch(
      "get",
      `${BUYSELL_BASE_URL}/admin/marketPairsList/${coin}`,
      {},
      options
    );
  } else {
    return fetch(
      "get",
      `${BUYSELL_BASE_URL}/admin/marketPairsList`,
      {},
      options
    );
  }
};

export const updateMarkupMarkdownApi = (data, options) => {
  return fetch(
    "post",
    `${BUYSELL_BASE_URL}/admin/updateMarkupMarkdown`,
    data,
    options
  );
};

export const getPairsListWithFeeApi = (options) => {
  return fetch(
    "get",
    `${BUYSELL_BASE_URL}/admin/getPairsListWithFee`,
    {},
    options
  );
};

export const updatePairListWithFeeApi = (data, options) => {
  return fetch(
    "post",
    `${BUYSELL_BASE_URL}/admin/updatePairAttributes`,
    data,
    options
  );
};

export const getBuySellLimitApi = (options) => {
  return fetch(
    "get",
    `${BUYSELL_BASE_URL}/admin/buysell_limit/settings`,
    {},
    options
  );
};

export const updateBuySellLimitApi = (data, id, options) => {
  return fetch(
    "post",
    `${BUYSELL_BASE_URL}/admin/buysell_limit/setting/update/` + id,
    data,
    options
  );
};

export const liquidityBuySellOrderApi = (data, options) => {
  return fetch(
    "post",
    `${BUYSELL_BASE_URL}/admin/orders/getList`,
    data,
    options
  );
};

export const liquidityBuyWithdrawOrderApi = (data, options) => {
  return fetch(
    "post",
    `${BUYSELL_BASE_URL}/admin/withdraws/getList`,
    data,
    options
  );
};

export const buySellOrdersApi = (data, page, options) => {
  return fetch(
    "post",
    `${BUYSELL_BASE_URL}/admin/buySellOrdersHistory/` + page,
    data,
    options
  );
};

export const buySellTokenListingApi = (data, page, options) => {
  return fetch("post", `${BUYSELL_BASE_URL}/tokens/get/` + page, data, options);
};
export const buySellFeeListingApi = (data, page, options) => {
  return fetch("get", `${BUYSELL_BASE_URL}/buysellfee/` + page, data, options);
};

export const buySellFeeListingByIdApi = (data, page, id, options) => {
  console.log("ye hai data", data);
  return fetch("put", `${BUYSELL_BASE_URL}/buysellfee/` + id, data, options);
};

export const buySellFeeListingDeleteById = (data, page, id, options) => {
  console.log("ye hai data", data);
  return fetch(
    "delete",
    `${BUYSELL_BASE_URL}/buysellfee/id` + id,
    data,
    options
  );
};
