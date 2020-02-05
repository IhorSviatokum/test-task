import * as actionTypes from "./ActionTypes";

const setEvents = events => {
  return {
    type: actionTypes.SET_EVENTS,
    events: events
  };
};

const fetchEventsFailed = error => {
  return {
    type: actionTypes.FETCH_EVENTS_FAILED,
    error: error
  };
};

export const initCalendar = token => {
  return dispatch => {
    fetch("http://localhost:8080/events", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        dispatch(setEvents(data.events));
      })
      .catch(error => {
        dispatch(fetchEventsFailed(error));
      });
  };
};

const fetchEventInit = () => {
  return {
    type: actionTypes.FETCH_EVENT_INIT
  };
};

const fetchedEvent = event => {
  return {
    type: actionTypes.FETCHED_EVENT,
    currentEvent: event
  };
};

const fetchEventFailed = error => {
  return {
    type: actionTypes.FETCH_EVENT_FAILED,
    error: error
  };
};

export const fetchEvent = (eventId, token) => {
  return dispatch => {
    dispatch(fetchEventInit);
    fetch("http://localhost:8080/event/" + eventId, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        dispatch(fetchedEvent(data.event));
        dispatch(editingStart(eventId));
      })
      .catch(err => {
        dispatch(fetchEventFailed(err));
      });
  };
};

const addEventInit = () => {
  return {
    type: actionTypes.ADD_EVENT_INIT
  };
};

const addEventFailed = error => {
  return {
    type: actionTypes.ADD_EVENT_FAILED,
    error: error
  };
};

const addEventSuccess = () => {
  return {
    type: actionTypes.ADD_EVENT_SUCCESS
  };
};

export const addEvent = (body, token) => {
  return dispatch => {
    dispatch(addEventInit());
    fetch("http://localhost:8080/event", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/JSON",
        Authorization: "Bearer " + token
      }
    })
      .then(() => {
        dispatch(addEventSuccess());
        dispatch(initCalendar(token));
      })
      .catch(err => {
        dispatch(addEventFailed);
      });
  };
};

const editEventInit = () => {
  return {
    type: actionTypes.EDIT_EVENT_INIT
  };
};

const editEventFailed = error => {
  return {
    type: actionTypes.EDIT_EVENT_FAILED,
    error: error
  };
};

const editEventSuccess = () => {
  return {
    type: actionTypes.EDIT_EVENT_SUCCESS
  };
};

export const editEvent = (eventId, body, token) => {
  return dispatch => {
    dispatch(editEventInit());
    fetch("http://localhost:8080/event/" + eventId, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/JSON",
        Authorization: "Bearer " + token
      }
    })
      .then(() => {
        dispatch(editEventSuccess());
        dispatch(initCalendar(token));
      })
      .catch(err => {
        dispatch(editEventFailed);
      });
  };
};

const deleteEventInit = () => {
  return {
    type: actionTypes.DELETE_EVENT_INIT
  };
};

const deleteEventFailed = error => {
  return {
    type: actionTypes.DELETE_EVENT_FAILED,
    error: error
  };
};

const deleteEventSuccess = () => {
  return {
    type: actionTypes.DELETE_EVENT_SUCCESS
  };
};

export const deleteEvent = (eventId, token) => {
  return dispatch => {
    dispatch(deleteEventInit());
    fetch("http://localhost:8080/event/" + eventId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(() => {
        dispatch(deleteEventSuccess());
        dispatch(initCalendar(token));
      })
      .catch(err => {
        dispatch(deleteEventFailed);
      });
  };
};

export const selectTimeStart = id => {
  return {
    type: actionTypes.SELECT_TIME_START,
    start: id
  };
};

export const selectTimeFinish = id => {
  return {
    type: actionTypes.SELECT_TIME_FINISH,
    finish: id
  };
};

export const addingStart = () => {
  return {
    type: actionTypes.ADDING_START
  };
};

export const addingFinish = () => {
  return {
    type: actionTypes.ADDING_FINISH
  };
};

export const editingStart = id => {
  return {
    type: actionTypes.EDITING_START,
    eventId: id
  };
};

export const editingFinish = () => {
  return {
    type: actionTypes.EDITING_FINISH
  };
};
