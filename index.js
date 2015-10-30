import makeStore from "./src/server/store";
import startServer from "./src/server/server";

export const store = makeStore();
startServer(store);

store.dispatch({
  type: "SET_ENTRIES",
  entries: require("./entries.json")
});
store.dispatch({ type: "NEXT" });
