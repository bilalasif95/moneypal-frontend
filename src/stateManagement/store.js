import { createStore } from "redux";
import rotateReducer from "./reducers/rotateReducer";

const initialState = {
  fetchingMessage: false,
  conversationContinue: false,
  conversationNameGet: false,
  conversationEmailGet: false,
  selectedQueryType: "",
  savedName: "",
  settedUserNameError: "",
  settedUserName: "",
};
function configureStore(state = { ...initialState }) {
  return createStore(rotateReducer, state);
}

export default configureStore;
