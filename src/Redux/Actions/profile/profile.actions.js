import * as userService from "../../../Services/API/profile.service";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";
import { BASEURL, SUCCESS_MESSAGE } from "../../../Constants/constant";
//import { reset } from 'redux-form';

const get2fastatus = (twoFastatusData) => {
  return {
    type: types.TWO_FASTATUS,
    payload: {
      twoFastatusData: twoFastatusData,
    },
  };
};

const get2faDetails = (twoFaDetails) => {
  return {
    type: types.TWOFA_SATATUS_DETAILS,
    payload: {
      twoFaDetails: twoFaDetails,
    },
  };
};

const enableGoogleAuth = (enableGoogleAuthData) => {
  return {
    type: types.GOOGLE_AUTH_DATA,
    payload: {
      enableGoogleAuthData: enableGoogleAuthData,
    },
  };
};

export function disableGoogleValidateFn(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .disableGoogleValidateApi(data, options)
      .then((res) => {
        /* 
        dispatch(enableGoogleAuth(res.data.data)) */
        history.push("/auth/admin-dashboard-section/admin-profile");
        dispatch(stopLoader());
        toast.success(res?.message);
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function enableGoogleValidateFn(data, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .enableGoogleValidateApi(data, options)
        .then((res) => {
          resolve(res?.data.data);
          /* 
      dispatch(enableGoogleAuth(res.data.data)) */
          history.push("/auth/admin-dashboard-section/admin-profile");
          dispatch(stopLoader());
          toast.success(res?.message);
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function enableGoogleAuthFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .enableGoogleAuthApi(data, options)
        .then((res) => {
          resolve(res.data.data);
          dispatch(enableGoogleAuth(res.data.data));
          dispatch(stopLoader());
          toast.success(res?.message);
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function changePasswordFn(data) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .changePasswordApi(data, options)
      .then((res) => {
        dispatch(stopLoader());
        toast.success(res.data.message);
        window.localStorage.clear();
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function get2fastatusFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .get2fastatusApi(data, options)
        .then((res) => {
          resolve(res?.data);
          dispatch(get2fastatus(res.data.data));
          dispatch(get2faDetails(res.data.detail));

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function updateProfileImageFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .updateProfileImage(data, options)
        .then((res) => {
          resolve(res?.data);
          dispatch(get2fastatus(res.data.data));

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}
