import { expect } from "chai";
import { List, Map } from "immutable";

describe("imutability", () => {
  describe("a number", () => {
    function increment (currentState) {
      return currentState + 1;
    }

    it("is immutable", () => {
      const state = 42;
      const nextState = increment(state);
      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe("an array", () => {
    function addMovie (currentState, movie) {
      return currentState.push(movie);
    }

    it("is not immutable", () => {
      const state = ["Trainspotting", "Pulp Fiction"];
      const nextState = addMovie(state, "Sunshine");

      expect(state).to.have.members([
        "Trainspotting",
        "Pulp Fiction",
        "Sunshine"
      ]);
    });
  });

  describe("a list", () => {
    function addMovie (currentState, movie) {
      return currentState.push(movie);
    }

    it("is immutable", () => {
      const state = List.of("Trainspotting", "Pulp Fiction");
      const nextState = addMovie(state, "Sunshine");

      expect(state).to.equal(List.of(
        "Trainspotting",
        "Pulp Fiction"
      ));

      expect(nextState).to.equal(List.of(
        "Trainspotting",
        "Pulp Fiction",
        "Sunshine"
      ));
    });
  });

  describe("a tree", () => {
    function addMovie (currentState, movie) {
      return currentState.update("movies", (movies) => movies.push(movie));
    }

    it("is immutable", () => {
      const state = Map({
        movies: List.of("Trainspotting", "Pulp Fiction")
      });
      const nextState = addMovie(state, "Sunshine");

      expect(nextState).to.equal(Map({
        movies: List.of(
          "Trainspotting",
          "Pulp Fiction",
          "Sunshine"
        )
      }));

      expect(state).to.equal(Map({
        movies: List.of(
          "Trainspotting",
          "Pulp Fiction"
        )
      }));
    });
  });
});
