import { fetch } from '../axios.service';
import { limit, P2P_BASE_URL } from '../../Constants/constant';

export const adminDisputeList = (options) => {
  return fetch('get', `${P2P_BASE_URL}/admin/dispute`, {}, options);
};
export const approveSellerRequest = (data, options) => {
  return fetch('post', `${P2P_BASE_URL}/admin/trades/sell-approve`, data, options);
};
export const getSingleDisputeApi = (id, options) => {
  return fetch('get', `${P2P_BASE_URL}/admin/dispute/detail/${id}`, {}, options);
};
