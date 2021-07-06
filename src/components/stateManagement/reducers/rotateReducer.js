export default (state, action) => {
  switch (action.type) {
    case "fetchingMessage":
      return {
        ...state,
        fetchingMessage: action.payload,
      };
    case "conversationContinue":
      return {
        ...state,
        conversationContinue: action.payload,
      };
    case "whattocall":
      return {
        ...state,
        whattocall: action.payload,
      };
    case "askQuestionType":
      return {
        ...state,
        askQuestionType: action.payload,
      };
    case "askCategoryType":
      return {
        ...state,
        askCategoryType: action.payload,
      };
    case "selectedCategoryType":
      return {
        ...state,
        selectedCategoryType: action.payload,
      };
    case "confirmQuestionType":
      return {
        ...state,
        confirmQuestionType: action.payload,
      };
    case "numberOfTimesQuestionAsked":
      return {
        ...state,
        numberOfTimesQuestionAsked: action.payload,
      };
    case "userName":
      return {
        ...state,
        userName: action.payload,
      };
    case "askedQuestion":
      return {
        ...state,
        askedQuestion: action.payload,
      };
    case "answerSatisfaction":
      return {
        ...state,
        answerSatisfaction: action.payload,
      };
    case "knowMore":
      return {
        ...state,
        knowMore: action.payload,
      };
    case "answer":
      return {
        ...state,
        answer: action.payload,
      };
    case "contentEditable":
      return {
        ...state,
        contentEditable: action.payload,
      };
    case "buttons":
      return {
        ...state,
        buttons: action.payload,
      };
    default:
      return state;
  }
};
