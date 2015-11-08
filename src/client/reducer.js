import { fromJS } from "immutable";

function vote(state, entry) {
  const currentPair = state.getIn(["vote", "pair"]);
  if (currentPair && currentPair.includes(entry)) {
    return state.set("votedFor", entry);
  } else {
    return state;
  }
}

function resetVote(state) {
  const votedFor = state.get("votedFor");
  const currentPair = state.getIn(["vote", "pair"], fromJS([]));
  if (votedFor && !currentPair.includes(votedFor)) {
    return state.remove("votedFor");
  } else {
    return state;
  }
}

export default function reducer (state=fromJS({}), action) {
  switch (action.type) {
    case "SET_STATE":
      return resetVote(state.merge(action.state));
    case "VOTE":
      return vote(state, action.entry);
  }

  return state;
}
