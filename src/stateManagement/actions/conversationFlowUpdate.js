export const continuewithConverstaion = (data) => {
  return {
    type: "conversationContinue",
    payload: data,
  }
};

export const contentEditableAction = (data) => {
  return {
    type: "contentEditable",
    payload: data
  };
};

export const whattocallAction = (data) => {
  return {
    type: "whattocall",
    payload: data
  };
};

export const knowMoreAction = (data) => {
  return {
    type: "knowMore",
    payload: data
  };
};

export const askQuestionAction = (data) => {
  return {
    type: "askQuestionType",
    payload: data
  };
};

export const answerSatisfactionAction = (data) => {
  return {
    type: "answerSatisfaction",
    payload: data
  };
};
