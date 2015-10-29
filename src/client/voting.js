import React, { Component } from "react";

class VotingComponent extends Component {
  render() {
    return (
      <div className="voting">
        {this.props.pair.map(entry => {
          return (
            <button key={entry} onClick={() => this.props.vote(entry)}>
              <h1>{entry}</h1>
            </button>
          );
        })}
      </div>
    );
  }
}

VotingComponent.defaultProps = { pair: [] };

export default VotingComponent
