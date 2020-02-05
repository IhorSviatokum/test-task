import * as actionTypes from "../actions/ActionTypes";

const initialState = {
  events: [],
  currentEvent: {},
  selecting: false,
  start: 0,
  finish: 0,
  adding: false,
  editing: false,
  error: null,
  loading: false
};

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EVENTS: {
      return {
        ...state,
        error: null,
        events: action.events
      };
    }
    case actionTypes.FETCH_EVENTS_FAILED: {
      return {
        ...state,
        error: action.error
      };
    }
    case actionTypes.FETCH_EVENT_INIT:
      return {
        ...state,
        error: null,
        loading: true
      };
    case actionTypes.FETCHED_EVENT:
      return {
        ...state,
        loading: false,
        currentEvent: action.currentEvent
      };
    case actionTypes.FETCH_EVENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.SELECT_TIME_START:
      return {
        ...state,
        error: null,
        selecting: true,
        start: action.start
      };
    case actionTypes.SELECT_TIME_FINISH:
      return {
        ...state,
        selecting: false,
        finish: action.finish
      };
    case actionTypes.ADDING_START:
      return {
        ...state,
        error: null,
        adding: true
      };
    case actionTypes.ADDING_FINISH:
      return {
        ...state,
        adding: false,
        start: 0,
        finish: 0
      };
    case actionTypes.ADD_EVENT_INIT:
      return {
        ...state,
        error: null,
        adding: false,
        loading: true,
        start: 0,
        finish: 0
      };
    case actionTypes.ADD_EVENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.ADD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.EDITING_START:
      return {
        ...state,
        error: null,
        editing: true
      };
    case actionTypes.EDITING_FINISH:
      return {
        ...state,
        editing: false
      };
    case actionTypes.EDIT_EVENT_INIT:
      return {
        ...state,
        error: null,
        editing: false,
        loading: true
      };
    case actionTypes.EDIT_EVENT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.EDIT_EVENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.DELETE_EVENT_INIT:
      return {
        ...state,
        error: null,
        editing: false,
        loading: true
      };
    case actionTypes.DELETE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.DELETE_EVENT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
