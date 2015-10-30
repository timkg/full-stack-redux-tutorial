import React, { Component } from "react";
import { fromJS } from "immutable"

class Results extends Component {
  getVotes(entry) {
    if (this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }

    return 0;
  }

  render() {
    return (
      <div className="results">
        {this.props.pair.map(entry =>
          <div key={entry} className="entry">
            <h2>{entry}</h2>
            <div className="voteCount">
              {this.getVotes(entry)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Results.defaultProps = {
  pair: fromJS([]),
  tally: fromJS({})
};

export default Results
