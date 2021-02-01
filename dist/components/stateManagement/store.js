import { createStore } from "redux";
import rotateReducer from "./reducers/rotateReducer";
const initialState = {
  fetchingMessage: false,
  conversationContinue: false,
  whattocall: "",
  askQuestionType: false,
  answerSatisfaction: false,
  knowMore: false,
  contentEditable: false
};

function configureStore(state = { ...initialState
}) {
  return createStore(rotateReducer, state);
}

export default configureStore;