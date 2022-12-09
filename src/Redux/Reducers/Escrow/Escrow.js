import * as types from '../../../Constants/_Types/types.reduxStore';
const initialState = {
  EscrowBalanceData: [],
  totalRecords: 0,
};

export default function Withdraw(state = initialState, action) {
  switch (action.type) {
    case types.ESCROW_BALANCE:
      return {
        ...state,
        EscrowBalanceData: action.payload.balanceData,
        totalRecords: action.payload.totalRecords,
      };
    default:
      return state;
  }
}
