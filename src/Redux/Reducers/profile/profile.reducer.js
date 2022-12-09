import * as types from "../../../Constants/_Types/types.reduxStore";

const initialState = {
  twoFastatusData: {},
  enableGoogleAuthData: {},
  twoFaDetails: {},
};

export default function Profile(state = initialState, action) {
  switch (action.type) {
    case types.TWO_FASTATUS:
      return { ...state, twoFastatusData: action.payload.twoFastatusData };
    case types.TWOFA_SATATUS_DETAILS:
      return { ...state, twoFaDetails: action.payload.twoFaDetails };

    case types.GOOGLE_AUTH_DATA:
      return {
        ...state,
        enableGoogleAuthData: action.payload.enableGoogleAuthData,
      };

    default:
      return state;
  }
}
