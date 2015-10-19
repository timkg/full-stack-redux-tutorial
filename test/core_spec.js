import { List, Map } from "immutable";
import { expect } from "chai";

import { setEntries, next, vote } from "../src/core";

describe("application logic", () => {
  describe("setEntries", () => {
    it("adds the entries to the state", () => {
      const state = Map();
      const entries = List.of("Trainspotting", "Pulp Fiction");
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of("Trainspotting", "Pulp Fiction")
      }));
    });

    it("converts provided entries to an immutable list", () => {
      const state = Map();
      const entries = ["Trainspotting", "Pulp Fiction"];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of("Trainspotting", "Pulp Fiction")
      }));
    });
  });

  describe("next", () => {
    it("takes the next two entries and stores them under 'vote'", () => {
      const state = Map({
        entries: List.of("Trainspotting", "Pulp Fiction", "Sunshine")
      });

      const nextState = next(state);

      expect(nextState).to.equal(Map({
        entries: List.of("Sunshine"),
        vote: Map({
          pair: List.of("Trainspotting", "Pulp Fiction")
        })
      }));
    });

    it("puts winner of current vote back to entries", () => {
      const state = Map({
        entries: List.of("Sunshine", "Millions", "127 Hourse"),
        vote: Map({
          pair: List.of("Trainspotting", "Pulp Fiction"),
          count: Map({
            "Trainspotting": 4,
            "Pulp Fiction": 2
          })
        })
      });

      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of("127 Hourse", "Trainspotting"),
        vote: Map({
          pair: List.of("Sunshine", "Millions")
        })
      }));
    });

    it("puts both from tied vote back to entries", () => {
      const state = Map({
        entries: List.of("Sunshine", "Millions", "127 Hourse"),
        vote: Map({
          pair: List.of("Trainspotting", "Pulp Fiction"),
          count: Map({
            "Trainspotting": 4,
            "Pulp Fiction": 4
          })
        })
      });

      const nextState = next(state);
      expect(nextState).to.equal(Map({
        entries: List.of("127 Hourse", "Trainspotting", "Pulp Fiction"),
        vote: Map({
          pair: List.of("Sunshine", "Millions")
        })
      }));
    });

    it("marks winner when just one entry left", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "Pulp Fiction"),
          count: Map({
            "Trainspotting": 3,
            "Pulp Fiction": 2
          })
        }),
        entries: List()
      });

      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: "Trainspotting"
      }));
    });
  });

  describe("vote", () => {
    it("creates a vote count for the voted entry", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "Pulp Fiction")
        }),
        entries: List()
      });
      const nextState = vote(state, "Trainspotting");

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of("Trainspotting", "Pulp Fiction"),
          count: Map({
            "Trainspotting": 1
          })
        }),
        entries: List()
      }));
    });

    it("adds to existing count for the voted entry", () => {
      const state = Map({
        vote: Map({
          pair: List.of("Trainspotting", "Pulp Fiction"),
          count: Map({
            "Trainspotting": 1,
            "Pulp Fiction": 2
          })
        }),
        entries: List()
      });

      const nextState = vote(state, "Trainspotting");
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of("Trainspotting", "Pulp Fiction"),
          count: Map({
            "Trainspotting": 2,
            "Pulp Fiction": 2
          })
        }),
        entries: List()
      }));
    });
  });
});
