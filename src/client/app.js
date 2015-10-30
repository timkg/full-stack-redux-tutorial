import React, { Component } from "react";
import { fromJS } from 'immutable';

const pair = fromJS(['Trainspotting', '28 Days Later']);
const tally = fromJS({'Trainspotting': 5, '28 Days Later': 4});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    const vote = (entry) => { this.setState({votedFor: entry}) };

    return React.cloneElement(this.props.children, {
      pair: pair,
      tally: tally,
      vote: vote,
      votedFor: this.state.votedFor
    });
  }
}

export default App
