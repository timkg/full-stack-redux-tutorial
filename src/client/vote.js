import React, { Component } from "react";
import Winner from "./winner";

class Vote extends Component {
  isDisabled() {
    return !!this.props.votedFor;
  }

  hasVotedFor(entry) {
    return this.props.votedFor === entry;
  }

  render() {
    return (
      <div className="voting">
        {this.props.pair.map(entry => {
          return (
            <button key={entry}
                    onClick={() => this.props.vote(entry)}
                    disabled={this.isDisabled()}
            >
              <h1>{entry}</h1>
              {this.hasVotedFor(entry) ?
                <div>Voted</div> :
                null}
            </button>
          );
        })}
      </div>
    );
  }
}

Vote.defaultProps = {
  pair: [],
  vote: (entry) => { console.log(entry) }
};

export default Vote
