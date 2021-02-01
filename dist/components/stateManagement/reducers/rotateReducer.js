export default ((state, action) => {
  switch (action.type) {
    case "fetchingMessage":
      return { ...state,
        fetchingMessage: action.payload
      };

    case "conversationContinue":
      return { ...state,
        conversationContinue: action.payload
      };

    case "whattocall":
      return { ...state,
        whattocall: action.payload
      };

    case "askQuestionType":
      return { ...state,
        askQuestionType: action.payload
      };

    case "answerSatisfaction":
      return { ...state,
        answerSatisfaction: action.payload
      };

    case "knowMore":
      return { ...state,
        knowMore: action.payload
      };

    case "contentEditable":
      return { ...state,
        contentEditable: action.payload
      };

    default:
      return state;
  }
});