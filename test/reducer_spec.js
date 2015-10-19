import { fromJS } from "immutable";
import { expect } from "chai";

import reducer from "../src/reducer";
import { INITIAL_STATE } from "../src/core";

describe("reducer", () => {
  it("handles SET_ENTRIES", () => {
    const state = fromJS({});
    const action = { type: "SET_ENTRIES", entries: ["Trainspotting", "Sunshine"] };

    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      entries: ["Trainspotting", "Sunshine"]
    }));
  });

  it("handles NEXT", () => {
    const state = fromJS({
      entries: ["Trainspotting", "Sunshine"]
    });
    const action = { type: "NEXT" };

    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      entries: [],
      vote: {
        pair: ["Trainspotting", "Sunshine"]
      }
    }));
  });

  it("handles VOTE", () => {
    const state = fromJS({
      entries: [],
      vote: {
        pair: ["Trainspotting", "Sunshine"]
      }
    });
    const action = { type: "VOTE", entry: "Trainspotting" };

    const nextState = reducer(state, action);
    expect(nextState).to.equal(fromJS({
      entries: [],
      vote: {
        pair: ["Trainspotting", "Sunshine"],
        count: {
          "Trainspotting": 1
        }
      }
    }));
  });

  it("has an initial state", () => {
    const action = { type: "SET_ENTRIES", entries: ["Trainspotting"] };

    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ["Trainspotting"]
    }));
  });

  it("can be used to reduce a collection of actions to state", () => {
    const actions = [
      { type: "SET_ENTRIES", entries: ["Trainspotting", "Sunshine"] },
      { type: "NEXT" },
      { type: "VOTE", entry: "Trainspotting" },
      { type: "VOTE", entry: "Sunshine" },
      { type: "VOTE", entry: "Trainspotting" },
      { type: "NEXT" }
    ];
    const finalState = actions.reduce(reducer, INITIAL_STATE);
    expect(finalState).to.equal(fromJS({
      winner: "Trainspotting"
    }));
  });
});
