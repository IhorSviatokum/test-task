import * as actionTypes from "../actions/ActionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  loggingin: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      return {
        ...state,
        error: null,
        loggingin: true
      };
    case actionTypes.AUTH_CANCEL:
      return {
        ...state,
        error: null,
        loggingin: false
      };

    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        loggingin: false
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        loggingin: false
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null
      };

    default: {
      return state;
    }
  }
};
