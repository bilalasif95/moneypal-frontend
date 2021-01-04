import { createStore } from "redux";
import rotateReducer from "./reducers/rotateReducer";

const initialState = {
  fetchingMessage: false,
};
function configureStore(state = { ...initialState }) {
  return createStore(rotateReducer, state);
}

export default configureStore;
