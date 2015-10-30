import { fromJS } from "immutable";

export default function reducer (state=fromJS({}), action) {
  switch (action.type) {
    case "SET_STATE":
      return state.merge(action.state);
  }

  return state;
}
