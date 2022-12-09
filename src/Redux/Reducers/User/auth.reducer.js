import * as types from "../../../Constants/_Types/types.reduxStore";

const initialState = {
  isSignedIn: false,
  tokens: null,
  userInfo: { user_role: null, user_id: null },
  users: [],
  tempTokens : null
};

export default function User(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        tokens: action.payload.tokens,
        userInfo: { ...action.payload.userInfo },
      };

    case types.TEMP_SIGN_IN:
      return {
        ...state,
        isSignedIn: false,
        tempTokens: action.payload.tokens,
        userInfo: { ...action.payload.userInfo },
      };

    case types.DEVICE_AUTHENTICATE:
      return {
        ...state,
        deviceVerification:false
      };

    case types.SIGN_OUT:
      return { ...state, isSignedIn: false, tokens: null, userInfo: null };

    default:
      return state;
  }
}
