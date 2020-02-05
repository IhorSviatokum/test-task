import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { eventsReducer } from "./store/reducers/Events";
import { authReducer } from "./store/reducers/Auth";

import App from "./App";

const rootReducer = combineReducers({
  events: eventsReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
const rootElement = document.getElementById("root");
ReactDOM.render(app, rootElement);
