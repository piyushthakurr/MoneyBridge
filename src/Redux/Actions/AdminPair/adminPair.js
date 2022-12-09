import * as adminPairServices from "../../../Services/API/admin.par.services";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";

const currencyPairData = (currencyData) => {
  return {
    type: types.GET_ALL_CURRECNCY_PAIR,
    payload: {
      currencypairData: currencyData,
    },
  };
};
const singlePairData = (signledata) => {
  return {
    type: types.GET_SINGLE_PAIR_DATA,
    payload: {
      singlepairData: signledata,
    },
  };
};
export function getCurrencyPairListfn() {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminPairServices
      .pairList(options)
      .then((res) => {
        dispatch(currencyPairData(res.data?.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function AddPair(data, history) {
  let dataRecievce = {
    base_currency: data.base_currency,
    name: data.name,
    other_currency: data.other_currency,
    status: Number(data.status),
  };
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminPairServices
      .addPair(dataRecievce, options)
      .then((res) => {
        toast.success(res?.data?.message);
        history.push("/auth/admin-dashboard-section/pair");
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function EditPair(status, pair_id) {
  let data = {
    status: Number(status),
    pair_id: pair_id,
  };
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminPairServices
      .EditPair(data, options)
      .then((res) => {
        toast.success(res?.data?.message);
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function singlePiarNameApi(pair_name) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminPairServices
      .singlePairName(pair_name, options)
      .then((res) => {
        dispatch(singlePairData(res?.data?.data[0]));
        toast.success(res?.data?.message);
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
