import * as types from '../../../Constants/_Types/types.reduxStore';

const initialState = {
  singleofferLIst: {},
  offerData: [],
};
export default function offerList(state = initialState, action) {
  switch (action.type) {

    case types.GET_SINGLE_OFFER:
      return {
        ...state,
        singleOfferList: action.payload.singlesellleroffer,
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
