import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../Reducers/rootReducer";
import thunk from "redux-thunk";

const logger = (Store) => (next) => (action) => {
  // console.log("dispatching: ", action);
  let result = next(action);
  // console.log("next state: ", Store.getState());
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(
  rootReducer /* preloadedState, */,
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default Store;
