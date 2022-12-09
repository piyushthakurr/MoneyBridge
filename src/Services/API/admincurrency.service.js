import { fetch } from '../axios.service';
import { limit, P2P_BASE_URL } from '../../Constants/constant';

export const admincurrencyApi = (options) => {
  return fetch('get', `${P2P_BASE_URL}/admin/currency/list`, {}, options);
};
export const addcurrencyApi = (data, options) => {
  return fetch('post', `${P2P_BASE_URL}/admin/currency/add`, data, options);
};
export const getSngleCurrencyCode = (coin, options) => {
  return fetch('get', `${P2P_BASE_URL}/admin/currency/${coin}`, {}, options);
};

export const deletecurrencyApi = (coin_name, options) => {
  return fetch(
    'delete',
    `${P2P_BASE_URL}/admin/currency/delete/${coin_name}`,
    {},
    options
  );
};
export const AdminAddDetail = (data, options) => {
  return fetch(
    'post',
    `${P2P_BASE_URL}/admin/dispute/add-details`,
    data,
    options
  );
};
export const editCurrencyApi = (data, options) => {
  return fetch('post', `${P2P_BASE_URL}/admin/currency/update`, data, options);
};
export const EscrowDetail = (page, limit, options) => {
  return fetch(
    'get',
    `${P2P_BASE_URL}/admin/escrow_balance/all?page=${page}&limit=${limit}`,
    {},
    options
  );
};
