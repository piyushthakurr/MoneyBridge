import { fetch } from "../axios.service";
import { USERS_BASE_URL, TRADING_BASE_URL, WALLET_BASE_URL } from "../../Constants/constant";


export const getPairListApi = ( options) => {
  return fetch("get", `${TRADING_BASE_URL}/trade/pair-list-admin`, {}, options);
};


export const tradeSummaryApi = (type, options) => {
  return fetch("get", `${TRADING_BASE_URL}/tradeSummary/${type}`, {}, options);
};
export const getorderListPair=(filterseletedData,options)=>{
  return fetch("post", `${TRADING_BASE_URL}/admin/getOrders`, filterseletedData, options);
}