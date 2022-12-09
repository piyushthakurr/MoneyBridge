import * as types from "../../../Constants/_Types/types.reduxStore";

const initialState = {
  getAllSubadmin: [],
  singleSubadminData:{}
};

export default function Subadmin(state = initialState, action) {
  switch (action.type) {

    case types.SUBADMIN_LIST:
      return { ...state, getAllSubadmin: action.payload.getAllSubadmin };

    case types.SINGLE_SUBADMIN_DATA:
      return { ...state, singleSubadminData: action.payload.singleSubadminData };

    default:
      return state;
  }
}
