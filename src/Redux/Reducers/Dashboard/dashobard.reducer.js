import * as types from "../../../Constants/_Types/types.reduxStore";

const initialState = {
  dashboardCounts: [],
  getUser: [],
  totalRecords:0,
  getActiveUser: [],
  tradeVolume: [],
  tradeByMonth: [],
  activeCoins: []
};

export default function Dashboard(state = initialState, action) {
  switch (action.type) {
    case types.DASHBOARD_COUNTS:
      return { ...state, dashboardCounts: action.payload.dashboardCounts };

      case types.GET_USER:
        return { ...state, getUser: action.payload.getUser,
                           totalRecords:action.payload.totalRecords };

    case types.GET_ACTIVE_USER:
      return { ...state, getActiveUser: action.payload.getActiveUser };

    case types.TRADE_VOLUME:
      return { ...state, tradeVolume: action.payload.tradeVolume };

    case types.TRADE_BY_MONTH:
      return { ...state, tradeByMonth: action.payload.tradeByMonth };

    case types.ACTIVE_COINS:
      return { ...state, activeCoins: action.payload.activeCoins };

    default:
      return state;
  }
}
