import { fetch } from '../axios.service';
import { P2P_BASE_URL } from '../../Constants/constant';

export const getTradeList = (page, limit, options) => {
  return fetch(
    'get',
    `${P2P_BASE_URL}/admin/trades?page=${page}&limit=${limit}`,
    {},
    options
  );
};

export const getTradeListBYTradeId = (tradeid, options) => {
  return fetch('get', `${P2P_BASE_URL}/admin/trades/${tradeid}`, {}, options);
};
export const getSellerRelease = (tradeid, options) => {
  return fetch(
    'get',
    `${P2P_BASE_URL}/admin/trades/${tradeid}/seller/release`,
    {},
    options
  );
};
export const getSingleOffer = (tradeid, options) => {
  return fetch(
    'get',
    `${P2P_BASE_URL}/admin/trades/offer/${tradeid}`,
    {},
    options
  );
};
export const getofferListdata = (page, limit, ordertype, options) => {
  return fetch(
    'get',
    `${P2P_BASE_URL}/admin/offer/all?page=${page}&limit=${limit}&order_type=${ordertype}`,
    {},
    options
  );
};
