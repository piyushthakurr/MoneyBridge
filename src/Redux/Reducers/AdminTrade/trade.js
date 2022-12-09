import * as types from '../../../Constants/_Types/types.reduxStore';

const initialState = {
  tradeList: [],
  singleTradeLIst: {},
  totalRecords: 0,
  singlesellerRelease: {},
  singleofferLIst: {},
  offerData: [],
  singleTradeoffer: {},
};
export default function tradeLIst(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_TRADE_LIST:
      return {
        ...state,
        tradeList: action.payload.tradeData,
        totalRecords: action.payload.totalrecords,
      };
    case types.GET_SINGLE_TRADE_LIST:
      return {
        ...state,
        singleTradeLIst: action.payload.singletradeData,
      };
    case types.GET_SINGLE_SELLER_RELEASE:
      return {
        ...state,
        singlesellerRelease: action.payload.singleselller,
      };

    case types.GET_SINGLE_OFFER:
      return {
        ...state,
        singleofferLIst: action.payload.singlesellleroffer,
        singleTradeoffer: action.payload.tradeoffer,
      };

    case types.GET_ALL_OFFER:
      return {
        ...state,
        offerData: action.payload.offerData,
        totalRecords: action.payload.totalrecords,
      };
    default:
      return state;
  }
}
