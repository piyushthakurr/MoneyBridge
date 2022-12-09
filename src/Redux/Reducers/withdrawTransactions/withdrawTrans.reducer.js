import * as types from "../../../Constants/_Types/types.reduxStore";

const initialState = {
  withdrawListData: [],
  withdrawAuth: false,
  balanceReports: [],
};

export default function Withdraw(state = initialState, action) {
  switch (action.type) {
    case types.WITHDRAW_LIST:
      return { ...state, withdrawListData: action.payload.withdrawListData };

    case types.WITHDRAW_AUTH:
      return { ...state, withdrawAuth: action.payload.withdrawAuth };

    case types.BALANCE_REPORTS:
      return {
        ...state,
        balanceReports: [...state.balanceReports, action.payload.data],
      };
    case types.EMPTY_REPORTS:
      return {
        ...state,
        balanceReports: [],
      };

    default:
      return state;
  }
}
