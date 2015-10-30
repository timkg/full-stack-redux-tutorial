import React, { Component } from "react";
import Winner from "./winner";
import Vote from "./vote";
import { fromJS } from "immutable";
import Router, { Link } from "react-router";

class Voting extends Component {
  isDisabled() {
    return !!this.props.votedFor;
  }

  hasVotedFor(entry) {
    return this.props.votedFor === entry;
  }

  render() {
    return (
      <div className="voting">
        <Link to="/results">results</Link>
        <p>Hello from voting</p>
        {this.props.winner ?
          <Winner ref="winner" winner={this.props.winner} /> :
          <Vote pair={this.props.pair}
                votedFor={this.props.votedFor}
                vote={this.props.vote}
          />}
      </div>
    );
  }
}

Voting.defaultProps = {
  pair: fromJS([]),
  votedFor: null,
  winner: null,
  vote: (entry) => { console.error(entry) }
};

export default Voting
