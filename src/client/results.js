import React, { Component } from "react";
import { fromJS } from "immutable"
import Router, { Link } from "react-router";
import Winner from "./winner";
import { connect } from "react-redux";
import * as actionCreators from "./actionCreators";

export class Results extends Component {
  getVotes(entry) {
    if (this.props.count.has(entry)) {
      return this.props.count.get(entry);
    }

    return 0;
  }

  render() {
    return (
      this.props.winner ?
        <Winner ref="winner" winner={this.props.winner} /> :
        <div className="results">
          <Link to="/">voting</Link>
          <div className="tally">
          {this.props.pair.map(entry =>
            <div key={entry} className="entry">
              <h2>{entry}</h2>
              <div className="voteCount">
                {this.getVotes(entry)}
              </div>
            </div>
          )}
          </div>
          <div className="management">
            <button ref="next"
                    className="next"
                    onClick={this.props.next}>
              Next
            </button>
          </div>
        </div>
    );
  }
}

Results.defaultProps = {
  pair: fromJS([]),
  count: fromJS({})
};

function mapStateToProps (state) {
  return {
    pair: state.getIn(["vote", "pair"]),
    count: state.getIn(["vote", "count"]),
    winner: state.get("winner")
  };
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);
