import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Voting from "./voting";

const pair = ["Trainspotting", "Pulp Fiction"];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Voting
        pair={this.props.pair}
        vote={(entry) => {
          this.setState({votedFor: entry})
        }}
        votedFor={this.state.votedFor}
      />
    );
  }
}

const app = ReactDOM.render(
  <App pair={pair}/>,
  document.getElementById('app')
);
