import * as userService from "../../../Services/API/dashboard.service";
import { toast } from "../../../Components/Toast/toast.component";
import * as types from "../../../Constants/_Types/types.reduxStore";
import { startLoader, stopLoader } from "../Loader/loader.action";
import { BASEURL, SUCCESS_MESSAGE } from "../../../Constants/constant";
//import { reset } from 'redux-form';

const getDashboardCounts = (dashboardCounts) => {
  return {
    type: types.DASHBOARD_COUNTS,
    payload: {
      dashboardCounts: dashboardCounts,
    },
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

const getUser = (getUser, totalRecords) => {
  return {
    type: types.GET_USER,
    payload: {
      getUser: getUser,
      totalRecords: totalRecords,
    },
  };
};

const getActiveUser = (getActiveUser) => {
  return {
    type: types.GET_ACTIVE_USER,
    payload: {
      getActiveUser: getActiveUser,
    },
  };
};

const tradeVolume = (tradeVolume) => {
  return {
    type: types.TRADE_VOLUME,
    payload: {
      tradeVolume: tradeVolume,
    },
  };
};

const tradeByMonth = (tradeByMonth) => {
  return {
    type: types.TRADE_BY_MONTH,
    payload: {
      tradeByMonth: tradeByMonth,
    },
  };
};

const activeCoins = (activeCoins) => {
  return {
    type: types.ACTIVE_COINS,
    payload: {
      activeCoins: activeCoins,
    },
  };
};

export function getDashboardCountsFn(history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getDashboardCountsApi(options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(getDashboardCounts(res.data?.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function getDashboardCryptoCountsFn(history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getDashboardCryptoCountsApi(options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(getDashboardCounts(res.data?.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}
export function getDashboardFiatCountsFn(history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .getDashboardFiatCountsApi(options)
        .then((res) => {
          resolve(res.data?.data);
          dispatch(getDashboardCounts(res.data?.data));
          dispatch(stopLoader());
        })
        .catch((error) => {
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function getUsersFn(data, history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    let page = { page: 1 };
    dispatch(startLoader());
    return userService

      .getUsersApi(page, options)
      .then((res) => {
        dispatch(getUser(res.data.data.listing, res.data.data.totalRecords));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

// export function getActiveUsersFn(history) {
//   return (dispatch, getState) => {
//     let options = {
//       "api-access-token": getState().auth.tokens,
//     };
//     dispatch(startLoader());
//     return userService
//       .getActiveUsersApi(options)
//       .then((res) => {
//         dispatch(activeUsers(res.data?.data[0]?.activeUser));
//         dispatch(stopLoader());
//       })
//       .catch((error) => {
//         toast.error(error?.data?.message);
//         dispatch(stopLoader());
//       });
//   };
// }

export function getActiveUsersFn(history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .getActiveUsersApi(options)
      .then((res) => {
        dispatch(getActiveUser(res.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function tradeVolumeFn(history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .tradeVolumeApi(options)
      .then((res) => {
        dispatch(tradeVolume(res.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function tradeByMonthFn(history) {
  return (dispatch, getState) => {
    let options = {
      "api-access-token": getState().auth.tokens,
    };
    dispatch(startLoader());
    return userService
      .tradeByMonthApi(options)
      .then((res) => {
        dispatch(tradeByMonth(res.data));
        dispatch(stopLoader());
      })
      .catch((error) => {
        toast.error(error?.data?.message);
        dispatch(stopLoader());
      });
  };
}

export function activeCoinsFn(history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .activeCoinsApi(options)
        .then((res) => {
          resolve(res.data?.coins);
          dispatch(activeCoins(res.data?.coins));
          dispatch(stopLoader());
          return res.data?.coins;
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function activeAllCoinsFn() {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      dispatch(startLoader());
      return userService
        .activeAllCoinsApi(options)
        .then((res) => {
          resolve(res.data?.coins);
          dispatch(activeCoins(res.data?.coins));
          dispatch(stopLoader());
          return res.data?.coins;
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          dispatch(stopLoader());
        });
    });
}

export function activeFiatCoinsFn(history) {
  return (dispatch, getState) =>
    new Promise((resolve, reject) => {
      let options = {
        "api-access-token": getState().auth.tokens,
      };
      // dispatch(startLoader());
      return userService
        .fiatCoinsApi(options)
        .then((res) => {
          resolve(res.data?.coins);
          dispatch(activeCoins(res.data?.coins));
          // dispatch(stopLoader());
          return res.data?.coins;
        })
        .catch((error) => {
          reject(error);
          toast.error(error?.data?.message);
          // dispatch(stopLoader());
        });
    });
}
