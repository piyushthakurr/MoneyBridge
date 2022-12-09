import * as types from "../../../Constants/_Types/types.reduxStore";
export const USER_STATUS_UPDATE = "/USER_STATUS_UPDATE";
export const ALL_USERS = "[USERS] ALL_USERS";

const initialState = {
  usersList: [],
  activeUsers: 0,
  dashboardCounts: [],
  statisticsData: [],
  downlineData: [],
  singleTraderData: {},
  usersWithdrawData: [],
  fxtBalance: {},
  ethBalance: {},
  btcBalance: {},
  usdtBalance: {},
  bchBalance: {},
  totalRecords: 0,
  submittedKycData: [],
  singleKycData: {},
  kycCount: 0,
  userAllBalance: [],
  visible: false,
  saveUserHistory: [],
  profileData: [],
};

export default function User(state = initialState, action) {
  switch (action.type) {
    case types.USERS_LIST:
      return {
        ...state,
        usersList: action.payload.usersList,
        totalRecords: action.payload.totalRecords,
      };

    case types.ACTIVE_USERS:
      return { ...state, activeUsers: action.payload.activeUsers };

    case types.STATISTICS_DATA:
      return { ...state, statisticsData: action.payload.statisticsData };

    case types.DOWNLINE:
      return { ...state, downlineData: action.payload.downlineData };

    case types.SINGLE_TRADER_DATA:
      return { ...state, singleTraderData: action.payload.singleTraderData };

    case types.USER_WITHDRAD_TRANS:
      return { ...state, usersWithdrawData: action.payload.usersWithdrawData };

    case types.ETH_BALANCE:
      return { ...state, ethBalance: action.payload.ethBalance };

    case types.SAVE_USER_BALANCE:
      return {
        ...state,
        saveUserHistory: [...state.saveUserHistory, action.payload],
      };

    case types.EMPTY_USER_BAL:
      return {
        ...state,
        saveUserHistory: [],
      };

    case types.BTC_BALANCE:
      return { ...state, btcBalance: action.payload.btcBalance };

    case types.USDT_BALANCE:
      return { ...state, usdtBalance: action.payload.usdtBalance };

    case types.BCH_BALANCE:
      return { ...state, bchBalance: action.payload.bchBalance };

    case types.FXT_BALANCE:
      return { ...state, fxtBalance: action.payload.fxtBalance };

    case types.SUBMITTED_KYC_DATA:
      return { ...state, submittedKycData: action.payload.submittedKycData };

    case types.SINGLE_USER_KYC:
      return { ...state, singleKycData: action.payload.singleKycData };

    case types.KYC_COUNT:
      return { ...state, kycCount: action.payload.kycCount };
    case types.USER_GET_BALANCE:
      return {
        ...state,
        userAllBalance: action.payload.userBalance,
      };
    case types.SHOW_SIDEBAR:
      return {
        ...state,
        userAllBalance: action.payload.userBalance,
      };

    case types.ADMIN_PROFILE_IMAGE:
      return {
        ...state,
        profileData: action?.payload?.profileImage?.data,
      };
    default:
      return state;
  }
}
