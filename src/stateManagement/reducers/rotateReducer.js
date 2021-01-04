export default (state, action) => {
  switch (action.type) {
    case "fetchingMessage":
      return {
        fetchingMessage: action.payload,
      };
    default:
      return state;
  }
};
