import * as types from '../../../Constants/_Types/types.reduxStore';

const initialState = {
  AdminCurrencyData: [],
  signleCurrency: {},
};

export default function Withdraw(state = initialState, action) {
  switch (action.type) {
    case types.ADMIN_CURRENCY:
      return { ...state, AdminCurrencyData: action.payload.currencyData };
    case types.SINGLE_CURRENCY:
      return { ...state, signleCurrency: action.payload.signleCurrency };
    default:
      return state;
  }
}
