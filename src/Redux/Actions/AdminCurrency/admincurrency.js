import * as adminCurrencyServices from "../../../Services/API/admincurrency.service";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";

const AdmincurrencyData = (currencyData) => {
  return {
    type: types.ADMIN_CURRENCY,
    payload: {
      currencyData: currencyData,
    },
  };
};
const EscrowBalance = (balance, totalRecords) => {
  return {
    type: types.ESCROW_BALANCE,
    payload: {
      balanceData: balance,
      totalRecords,
    },
  };
};
const getCurrencyByCode = (code) => {
  return {
    type: types.SINGLE_CURRENCY,
    payload: {
      signleCurrency: code,
    },
  };
};
export function AdmincurrencyListFn() {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminCurrencyServices
      .admincurrencyApi(options)
      .then((res) => {
        dispatch(AdmincurrencyData(res.data?.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function AddCurrencyList(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminCurrencyServices
      .addcurrencyApi(data, options)
      .then((res) => {
        toast.success(res?.data?.message);
        history.push("/auth/admin-dashboard-section/admincurrencylist");
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function getSingleCurrency(code) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminCurrencyServices
      .getSngleCurrencyCode(code, options)
      .then((res) => {
        dispatch(getCurrencyByCode(res.data?.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function deleteCurrency(name) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminCurrencyServices
      .deletecurrencyApi(name, options)
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
export function AdminAdddetails(data) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminCurrencyServices
      .AdminAddDetail(data, options)
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
export function editCurrency(data, history) {
  let editCoinData = {
    code: data.code,
    name: data.name,
    status: Number(data.status),
    type: Number(data.type),
  };
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminCurrencyServices
      .editCurrencyApi(editCoinData, options)
      .then((res) => {
        toast.success(res?.data?.message);
        history.push("/auth/admin-dashboard-section/admincurrencylist");
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
export function escrowBalance(page, limit) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return adminCurrencyServices
      .EscrowDetail(page, limit, options)
      .then((res) => {
        dispatch(EscrowBalance(res.data?.data, res.data?.total));
        toast.success(res?.data?.message);
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
