import * as types from '../../../Constants/_Types/types.reduxStore';

const initialState = {
  loading: false
};

export default function Loader(state = initialState, action = {}) {
  switch (action.type) {

    case types.START_LOADER:
      return { ...state, loading: true };

    case types.STOP_LOADER:
      return { ...state, loading: false }

    default:
      return state;
  }
}

