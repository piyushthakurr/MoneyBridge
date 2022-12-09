import { toast } from "../../../Components/Toast/toast.component";
import * as userService from "../../../Services/API/agencyManagement.service";
import { startLoader, stopLoader } from "../Loader/loader.action";

export function getAgencycodeFn(page) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getAgencyCodeListApi(page, options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          // toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}
export function updateAgencycodeFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .updateAgencyCodeApi(data, options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(stopLoader());
          toast.success(res?.data?.message);
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}
export function deleteAgencycodeFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .deletAgencycodeApi(data, options)
        .then((res) => {
          resolve(res.data?.data);
          toast.success(res?.data?.message);

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.error?.message);
          dispatch(stopLoader());
        });
    });
}
