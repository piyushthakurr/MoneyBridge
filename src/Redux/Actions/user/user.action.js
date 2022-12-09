import * as userService from "../../../Services/API/api.service";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";
import { BASEURL, SUCCESS_MESSAGE } from "../../../Constants/constant";
import editSubadmin from "../../../Components/pages/subAdmin/editSubadmin";
//import { reset } from 'redux-form';

const tempSignInDetails = (token, data) => {
  return {
    type: types.TEMP_SIGN_IN,
    payload: {
      tokens: token,
      userInfo: data,
    },
  };
};

const signInDetails = (token, data) => {
  return {
    type: types.SIGN_IN,
    payload: {
      tokens: token,
      userInfo: data,
    },
  };
};

const deviceAuthenticate = (id) => {
  return {
    type: types.DEVICE_AUTHENTICATE,
    payload: {
      deviceVerification: id,
    },
  };
};

const get2fastatus = (twoFastatusData) => {
  return {
    type: types.TWO_FASTATUS,
    payload: {
      twoFastatusData: twoFastatusData,
    },
  };
};

const google2faAuthenticate = (token) => {
  return {
    type: types.TWO_FA_AUTHENTICATE,
    payload: {
      token: token,
    },
  };
};

const logout = () => {
  return {
    type: types.SIGN_OUT,
  };
};

const usersList = (usersList, totalRecords) => {
  return {
    type: types.USERS_LIST,
    payload: {
      usersList: usersList,
      totalRecords: totalRecords,
    },
  };
};

const activeUsers = (activeUsers) => {
  return {
    type: types.ACTIVE_USERS,
    payload: {
      activeUsers: activeUsers,
    },
  };
};

const statisticsData = (statisticsData) => {
  return {
    type: types.STATISTICS_DATA,
    payload: {
      statisticsData: statisticsData,
    },
  };
};

const downlineData = (downlineData) => {
  return {
    type: types.DOWNLINE,
    payload: {
      downlineData: downlineData,
    },
  };
};

const singleTraderData = (singleTraderData) => {
  return {
    type: types.SINGLE_TRADER_DATA,
    payload: {
      singleTraderData: singleTraderData,
    },
  };
};

const usersWithdrawData = (usersWithdrawData) => {
  return {
    type: types.USER_WITHDRAD_TRANS,
    payload: {
      usersWithdrawData: usersWithdrawData,
    },
  };
};

const saveUserHistory = (data) => {
  return {
    type: types.SAVE_USER_BALANCE,
    payload: data,
  };
};

const getuserBalance = (balance) => {
  return {
    type: types.USER_GET_BALANCE,
    payload: {
      userBalance: balance,
    },
  };
};

const submittedKyc = (submittedKycData) => {
  return {
    type: types.SUBMITTED_KYC_DATA,
    payload: {
      submittedKycData: submittedKycData,
    },
  };
};

const singleKycData = (singleKycData) => {
  return {
    type: types.SINGLE_USER_KYC,
    payload: {
      singleKycData: singleKycData,
    },
  };
};

const profileData = (singleKycData) => {
  return {
    type: types.ADMIN_PROFILE_IMAGE,
    payload: {
      profileImage: singleKycData,
    },
  };
};

const getKycCount = (kycCount) => {
  return {
    type: types.KYC_COUNT,
    payload: {
      kycCount: kycCount,
    },
  };
};

export function signInFn(data, history) {
  return (dispatch, getState) => {
    return userService
      .login(data)
      .then((res) => {
        toast.success(res.data.message);
        let options = {
          "api-access-token": res.data.JwtToken,
        };
        dispatch(stopLoader());
        // dispatch(startLoader());
        if (res.data.JwtToken) {
          return userService.get2fastatusApi(options).then((data) => {
            if (data.data.data.is_google_2fa_active == 1) {
              dispatch(tempSignInDetails(res.data.JwtToken, res.config.data));
              window.location.href = `/admin/google-authentication`;
              toast.success("Google Authentication required");
            } else {
              dispatch(signInDetails(res.data.JwtToken, res.config.data));

              // window.location.href = `/auth/dashboard`;
            }
            // dispatch(stopLoader());
          });
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

const get2fastatusFn = (data) => {
  // return (dispatch, getState) => {
  let options = {
    "api-access-token": data,
  };
  // dispatch(startLoader());
  userService
    .get2fastatusApi(data, options)
    .then((res) => {
      // dispatch(get2fastatus(res.data.data))
      return res.data.data;
      // dispatch(stopLoader());
    })
    .catch((error) => {
      toast.error(error?.data?.message);
      // dispatch(stopLoader());
      return false;
    });
  // };
};

// verify 2fa
export function google2faAuthenticateFn(data) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tempTokens,
    };

    dispatch(startLoader());
    return userService
      .google2faAuthenticateApi(data, options)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(
          signInDetails(getState().auth.tempTokens, getState().auth.userinfo)
        );
        // window.location.href = `/auth/dashboard`;
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

// verify device
export function deviceAuthenticateFn(data) {
  // debugger;
  return (dispatch, getState) => {
    dispatch(startLoader());
    return userService
      .deviceAuthenticateApi(data)
      .then((res) => {
        toast.success(res.data.message);
        dispatch(deviceAuthenticate(getState()));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

/* User Start */
export function deleteApprovedKycFn(userId, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .deleteApprovedKycApi(userId, options)
      .then((res) => {
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function updateUserDetailsFn(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .updateUserDetailsApi(data, options)
      .then((res) => {
        history.push("/auth/user-management/approvedKyc");
        toast.success(res?.data?.data?.message);

        /* dispatch(getKycCount(res.data.data.file)) */
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function getKycFileFn(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .getKycFileApi(data, options)
      .then((res) => {
        //  history.push('/auth/submittedKyc')
        dispatch(getKycCount(res.data.data.file));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function getKycCountFn(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .getKycCountApi(data, options)
      .then((res) => {
        //  history.push('/auth/submittedKyc')
        dispatch(getKycCount(res.data.data.listing[0].totalRecords));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function kycActionFn(data, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .kycActionApi(data, options)
        .then((res) => {
          resolve(res?.data.message);
          // history.push("/auth/user-management/submittedKyc");
          toast.success(res?.data?.message);
          //  dispatch(singleKycData(res.data.data))
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function singleKycDataFn(userId, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .singleKycDataApi(userId, options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(singleKycData(res.data.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function getSubmittedFileAdmin(userId, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getUserKycFile(userId, options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(profileData(res?.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function submittedKycFn(data, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .submittedKycApi(data, options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(submittedKyc(res.data.data.listing));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function addNotesFn(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .addNotesApi(data, options)
      .then((res) => {
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function filterUsersFn(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .filterUsersApi(data, options)
      .then((res) => {
        dispatch(usersList(res.data.data.listing));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function userBalanceFn(coin, id) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      let balanceData = {
        coin: coin,
        user_id: id,
      };
      return userService
        .userBalanceApi(coin, balanceData, options)
        .then((res) => {
          let item = {
            data: res.data,
            coin: coin,
          };
          dispatch(saveUserHistory(item));
          dispatch(getuserBalance(res.data.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          // toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function statisticsFn(id) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .statisticsApi(id, options)
        .then((res) => {
          resolve(res?.data);
          // toast.success(res.data?.error);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function downlineFn(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService

      .downlineApi(data, options)
      .then((res) => {
        toast.success(res.data?.error);
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function singleTraderInfoFn(data, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService

        .singleTraderInfoApi(data, options)
        .then((res) => {
          resolve(res?.data);
          dispatch(singleTraderData(res.data.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function usersWithdrawTransFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .usersWithdrawTransApi(data, options)
        .then((res) => {
          resolve(res?.data);
          dispatch(usersWithdrawData(res.data.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function usersDepositTransFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService

        .usersDepositTransApi(data, options)
        .then((res) => {
          resolve(res?.data);
          // dispatch(usersWithdrawData(res.data.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function sendAuthKeyFn(data, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService

        .sendAuthKeyApi(data, options)
        .then((res) => {
          resolve(res?.data);
          toast.success(res?.message);
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function userActionFn(data, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService

        .userActionApi(data, options)
        .then((res) => {
          resolve(res?.data);
          toast.success(res?.message);

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function getUsersFn(data, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService

        .getUsersApi(data, options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(
            usersList(res.data.data.listing, res.data.data.totalRecords)
          );
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function searchUsersFn(data, history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService

        .searchUsersApi(data, options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(
            usersList(res.data.data.listing, res.data.data.totalRecords)
          );
          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function getActiveUsersFn(history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .getActiveUsersApi(options)
      .then((res) => {
        dispatch(activeUsers(res.data?.data[0]?.activeUser));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function fileUploadFn(data) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());

      return userService
        .getFileUpload(data, options)
        .then((res) => {
          resolve(res?.data);
          toast.success(res?.data?.message);

          dispatch(stopLoader());
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

/* User End */

export function logoutUser() {
  return (dispatch, getState) => {
    toast.success("Logout successfully");
    dispatch(startLoader());
    dispatch(logout());
    localStorage.clear();
    dispatch(stopLoader());
  };
}
