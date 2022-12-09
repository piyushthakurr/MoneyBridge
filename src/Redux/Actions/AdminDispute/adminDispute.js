import * as adminDisputeServices from '../../../Services/API/adminDisputeList.services';
import { toast } from '../../../Components/Toast/toast.component';
import * as types from '../../../Constants/_Types/types.reduxStore';
import { startLoader, stopLoader } from '../Loader/loader.action';

const AdminDisputeData = (disputelist) => {
  return {
    type: types.GET_ADMIN_DISPUTE_LIST,
    payload: {
      disputelist: disputelist,
    },
  };
};

const setSingleDispute = (disputeData) => {
  return {
    type: types.GET_SINGLE_DISPUTE,
    payload: {
      disputeSingleData: disputeData,
    },
  };
};

// const EscrowBalance = (balance, totalRecords) => {
//   return {
//     type: types.ESCROW_BALANCE,
//     payload: {
//       balanceData: balance,
//       totalRecords,
//     },
//   };
// };
// const getCurrencyByCode = (code) => {
//   return {
//     type: types.SINGLE_CURRENCY,
//     payload: {
//       signleCurrency: code,
//     },
//   };
// };
export function AdminDisputeListFn() {
  return (dispatch, getState) => {
    let options = {
      'api-access-token': getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminDisputeServices
      .adminDisputeList(options)
      .then((res) => {
        dispatch(AdminDisputeData(res.data.data.data.list));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function approveSellerTrade(data) {
  return (dispatch, getState) => {
    let options = {
      'api-access-token': getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminDisputeServices
      .approveSellerRequest(data, options)
      .then((res) => {
        toast.success(res?.data?.message);
        //history.push('/auth/admin-dashboard-section/dispute-list');
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function getSingleDispute(id) {
  return (dispatch, getState) => {
    let options = {
      'api-access-token': getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminDisputeServices
      .getSingleDisputeApi(id, options)
      .then((res) => {
        dispatch(setSingleDispute(res.data?.data.dispute[0]));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
