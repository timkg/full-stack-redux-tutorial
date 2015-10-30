import React, { Component } from "react";
import Winner from "./winner";
import Vote from "./vote";
import { fromJS } from "immutable";
import Router, { Link } from "react-router";
import { connect } from "react-redux";

export class Voting extends Component {
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
  vote: (entry) => { console.log(entry) }
};

function mapStateToProps(state) {
  return {
    pair: state.getIn(["vote", "pair"]),
    winner: state.get("winner")
  };
}

export const VotingContainer = connect(mapStateToProps)(Voting);
