import React from 'react';
import ReactDOM from 'react-dom';
import Voting from "./voting";

const pair = ["Trainspotting", "Pulp Fiction"];

ReactDOM.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
