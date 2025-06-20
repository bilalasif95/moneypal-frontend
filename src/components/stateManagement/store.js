import { createStore } from "redux";
import rotateReducer from "./reducers/rotateReducer";

const initialState = {
  fetchingMessage: false,
  conversationContinue: false,
  whattocall: "",
  askQuestionType: false,
  askCategoryType: false,
  selectedCategoryType: "",
  confirmQuestionType: false,
  numberOfTimesQuestionAsked: 1,
  userName: "",
  askedQuestion: "",
  delayedMessage: "",
  time: "min",
  dualMessage: false,
  answerSatisfaction: false,
  knowMore: false,
  answer: "",
  contentEditable: false,
  buttons: [],
};
function configureStore(state = { ...initialState }) {
  return createStore(rotateReducer, state);
}

export default configureStore;
