import { Map, List } from "immutable";

export function setEntries (state, entries) {
  return state.set("entries", List(entries));
}

function getWinners(vote) {
  if (!vote) { return []; }
  const [a, b] = vote.get("pair");
  const aVotes = vote.getIn(["count", a], 0);
  const bVotes = vote.getIn(["count", b], 0);

  if (aVotes > bVotes) {
    return [a];
  } else if (bVotes > aVotes) {
    return [b];
  } else {
    return [a, b];
  }
}

export function next(state) {
  const entries = state.get("entries").concat(getWinners(state.get("vote")));

  if (entries.size === 1) {
    return state.remove("vote")
                .remove("entries")
                .set("winner", entries.first());
  }

  return state.merge({
    entries: entries.skip(2),
    vote: Map({
      pair: entries.take(2)
    })
  });
}

export function vote(state, entry) {
  return state.updateIn(["vote", "count", entry], 0, count => count + 1);
}
