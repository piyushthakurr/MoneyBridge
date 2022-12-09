import { fetch } from '../axios.service';
import { P2P_BASE_URL } from '../../Constants/constant';

export const getofferListdata = (page, limit, ordertype, options) => {
    return fetch(
      'get',
      `${P2P_BASE_URL}/admin/offer/all?page=${page}&limit=${limit}&order_type=${ordertype}`,
      {},
      options
    );
  };


  export const getSingleOffer = (offerId, options) => {
    return fetch(
      'get',
      `${P2P_BASE_URL}/admin/offer/${offerId}`,
      {},
      options
    );
  };