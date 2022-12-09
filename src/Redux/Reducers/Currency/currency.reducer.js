import * as types from "../../../Constants/_Types/types.reduxStore";

const initialState = {
  currencyPairData: [],
  currencyAuth: false,
  currencyPairAuth: false,
};

export default function Dashboard(state = initialState, action) {
  switch (action.type) {
    case types.CURRENCY_PAIR_DATA:
      return { ...state, currencyPairData: action.payload.currencyPairData };

    case types.CURRENCY_AUTH:
      return { ...state, currencyAuth: action.payload.currencyAuth };

    case types.CURRENCY_PAIR_AUTH:
      return { ...state, currencyPairAuth: action.payload.currencyPairAuth };

    default:
      return state;
  }
}
