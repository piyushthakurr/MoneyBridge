import * as types from "../../../Constants/_Types/types.reduxStore";

const initialState = {
  pairListData: [],
  tradeSummaryData: [],
  orderListData:[]
};
export default function Deposite(state = initialState, action) {
  switch (action.type) {
    case types.PAIR_LIST:
    
      return { ...state, pairListData: action.payload.pairListData };

    case types.TRADE_SUMMARY:
       let tradeSummaryData = [...state.tradeSummaryData];
       tradeSummaryData.push(action.payload.tradeSummaryData)
      //let tradeSummaryData = [...state.tradeSummaryData,...action.payload.tradeSummaryData];

      return { ...state, tradeSummaryData };
      case types.ORDER_LISTING:
    
        return { ...state, orderListData: action.payload.orderListData };

    default:
      return state;
  }

}
