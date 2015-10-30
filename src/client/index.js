import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from "react-router";
import App from "./app";
import Voting from "./voting";
import Results from "./results";

ReactDOM.render(
  <Router>
    <Route component={App}>
      <Route path="/" component={Voting} />
      <Route path="/results" component={Results} />
    </Route>
  </Router>,
  document.getElementById('app')
);
