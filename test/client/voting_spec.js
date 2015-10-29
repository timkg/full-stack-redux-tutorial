import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import Voting from "../../src/client/voting";
import { expect } from "chai";

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = ReactTestUtils;

const pair = ["Trainspotting", "Pulp Fiction"];

describe("Voting", () => {
  it("renders a pair of buttons", () => {
    const component = renderIntoDocument(
      <Voting pair={pair} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, "button");
    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal(pair[0]);
    expect(buttons[1].textContent).to.equal(pair[1]);
  });
});
