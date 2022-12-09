import * as types from '../../../Constants/_Types/types.reduxStore';

const initialState = {
  currencyPair: [],
  singlePairData: {},
};

export default function Withdraw(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_CURRECNCY_PAIR:
      return { ...state, currencyPair: action.payload.currencypairData };
    case types.GET_SINGLE_PAIR_DATA:
      return { ...state, singlePairData: action.payload.singlepairData };
    default:
      return state;
  }
}
