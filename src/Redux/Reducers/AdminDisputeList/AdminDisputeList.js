import * as types from '../../../Constants/_Types/types.reduxStore';

const initialState = {
  AdminDisputeListData: [],
  signleDisputedata: {},
};

export default function DisputeList(state = initialState, action) {
  switch (action.type) {
    case types.GET_ADMIN_DISPUTE_LIST:
      return { ...state, AdminDisputeListData: action.payload.disputelist };
    case types.GET_SINGLE_DISPUTE:
      return { ...state, signleDisputedata: action.payload.disputeSingleData };
    default:
      return state;
  }
}
