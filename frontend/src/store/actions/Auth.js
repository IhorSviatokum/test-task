import * as actionTypes from "./ActionTypes";

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT
  };
};

export const authCancel = () => {
  return {
    type: actionTypes.AUTH_CANCEL
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = (login, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = JSON.stringify({
      login: login,
      password: password
    });
    let url = "http://localhost:8080/auth/signup";
    if (!isSignup) {
      url = "http://localhost:8080/auth/login";
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: authData
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        const expirationDate = new Date(data.expirationDate);
        localStorage.setItem("token", data.token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", data.userId);
        dispatch(authSuccess(data.token, data.userId));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
      }
    }
  };
};
