import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from "react-router";
import App from "./app";
import { VotingContainer } from "./voting";
import { ResultsContainer } from "./results";
import { createStore, applyMiddleware } from "redux";
import remoteActionMiddleware from "./remoteActionMiddleware";
import reducer from "./reducer";
import { setState } from "./actionCreators";
import { Provider } from "react-redux";
import io from "socket.io-client";

const socket = io(`${location.protocol}//${location.hostname}:8090`)
socket.on("state", (state) => {
  store.dispatch(setState(state));
});

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App}>
        <Route path="/" component={VotingContainer} />
        <Route path="/results" component={ResultsContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
