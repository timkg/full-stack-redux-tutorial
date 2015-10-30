import React, { Component } from "react";
import Winner from "./winner";
import Vote from "./vote";

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
        {this.props.winner ?
          <Winner ref="winner" winner={this.props.winner} /> :
          <Vote {...this.props} />}
      </div>
    );
  }
}

Voting.defaultProps = {
  pair: [],
  vote: (entry) => { console.log(entry) }
};

export default Voting
