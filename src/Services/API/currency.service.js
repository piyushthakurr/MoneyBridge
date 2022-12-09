import { fetch } from '../axios.service';
import { WALLET_BASE_URL, TRADING_BASE_URL } from '../../Constants/constant';

/* export const getPairListApi = ( options) => {
  return fetch("get", `${WALLET_BASE_URL}/trade/pair-list-admin`, {}, options);
};

 */
export const currencyApi = (coin, options) => {
  return fetch(
    'get',
    `${WALLET_BASE_URL}/${coin}/admin/currency_detials`,
    {},
    options
  );
};

export const currencyPairApi = (coin, options) => {
  return fetch('get', `${TRADING_BASE_URL}/trade/pair-list-admin`, {}, options);
};
export const EditFeeApi = (data, options) => {
  return fetch('post', `${TRADING_BASE_URL}/trade/updatePair`, data, options);
};
export const EditFeeApiCurrency = (data, options) => {
  return fetch(
    'post',
    `${WALLET_BASE_URL}/${data.coin}/admin/update_currency`,
    data,
    options
  );
};
