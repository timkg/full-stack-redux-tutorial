import React, { Component } from "react";

class Winner extends Component {
  render() {
    return (
      <div ref="winner">Winner is {this.props.winner}</div>
    );
  }
}

export default Winner
