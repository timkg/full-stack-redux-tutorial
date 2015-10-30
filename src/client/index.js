import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from "react-router";
import App from "./app";
import { VotingContainer } from "./voting";
import { ResultsContainer } from "./results";
import { createStore } from "redux";
import reducer from "./reducer";
import { Provider } from "react-redux";

const store = createStore(reducer);
store.dispatch({
  type: "SET_STATE",
  state: {
    vote: {
      pair: ["Trainspotting", "Pulp Fiction 2"],
      tally: { "Trainspotting": 2 }
    }
  }
});

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
