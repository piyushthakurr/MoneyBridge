import * as userService from "../../../Services/API/subadmin.service";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";
import { BASEURL, SUCCESS_MESSAGE } from "../../../Constants/constant";
//import { reset } from 'redux-form';

const getAllSubadmin = (getAllSubadmin) => {
  return {
    type: types.SUBADMIN_LIST,
    payload: {
      getAllSubadmin: getAllSubadmin,
    },
  };
};

const getSingleSubadmin = (singleSubadminData) => {
  return {
    type: types.SINGLE_SUBADMIN_DATA,
    payload: {
      singleSubadminData: singleSubadminData,
    },
  };
};

export function addSubadminFn(data, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .addSubadminApi(data, options)
        .then((res) => {
          dispatch(stopLoader());
          resolve(res.data?.data);
          history.push("/auth/sub-admin-management/sub-admin-users");
          toast.success(res.data.message);
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function updateSubadminFn(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .updateSubadminApi(data, options)
      .then((res) => {
        dispatch(stopLoader());
        toast.success(res.data.message);
        history.push("/auth/sub-admin-management/sub-admin-users");
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function getSubadminListFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getSubadminListApi(data, options)
        .then((res) => {
          resolve(res.data);
          dispatch(getAllSubadmin(res.data?.data?.listing));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function deleteSubadminFn(coin, data) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .deleteSubadmin(options)
      .then((res) => {
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function getSingleSubadminFn(data) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .getSingleSubadmin(data, options)
      .then((res) => {
        dispatch(getSingleSubadmin(res.data.data.listing[0]));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

/* export function getAllDepositesFn(history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .getAllDepositesApi(options)
      .then((res) => {
        dispatch(getAllDeposites(res.data?.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}
 */
