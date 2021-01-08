export default (state, action) => {
  switch (action.type) {
    case "fetchingMessage":
      return {
        fetchingMessage: action.payload,
      };
    case "conversationContinue":
      return {
        conversationContinue: action.payload,
      };
    case "conversationNameGet":
      return {
        conversationNameGet: action.payload,
      };
    case "conversationEmailGet":
      return {
        conversationEmailGet: action.payload,
      };
    case "selectedQueryType":
      return {
        selectedQueryType: action.payload,
      };
    default:
      return state;
  }
};
