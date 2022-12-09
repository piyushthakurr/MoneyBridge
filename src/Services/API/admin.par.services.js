import { fetch } from '../axios.service';
import { P2P_BASE_URL } from '../../Constants/constant';

export const pairList = (options) => {
  return fetch('get', `${P2P_BASE_URL}/admin/pair/list`, {}, options);
};
export const addPair = (data, options) => {
  return fetch('post', `${P2P_BASE_URL}/admin/pair/add`, data, options);
};
export const EditPair = (data, options) => {
  return fetch('put', `${P2P_BASE_URL}/admin/pair/update`, data, options);
};
export const singlePairName = (pair_name, options) => {
  return fetch(
    'get',
    `${P2P_BASE_URL}/admin/pair/info/${pair_name}`,
    {},
    options
  );
};
