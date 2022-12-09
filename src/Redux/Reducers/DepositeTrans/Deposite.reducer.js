import * as types from '../../../Constants/_Types/types.reduxStore';

const initialState = {
  allDeposites: [],
  totalRecords: 0,
};

export default function Deposite(state = initialState, action) {
  switch (action.type) {
    case types.DEPOSITE_TRANS:
      return {
        ...state,
        allDeposites: action.payload.getAllDeposites,
        totalRecords: action.payload.totalRecords,
      };

    default:
      return state;
  }
}
