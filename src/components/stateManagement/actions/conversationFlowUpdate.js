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

export const answerAction = (data) => {
  return {
    type: "answer",
    payload: data
  };
};

export const askQuestionAction = (data) => {
  return {
    type: "askQuestionType",
    payload: data
  };
};

export const askCategoryAction = (data) => {
  return {
    type: "askCategoryType",
    payload: data
  };
};

export const selectedCategory = (data) => {
  return {
    type: "selectedCategoryType",
    payload: data
  };
};

export const userNameAction = (data) => {
  return {
    type: "userName",
    payload: data
  };
};

export const confirmQuestionAction = (data) => {
  return {
    type: "confirmQuestionType",
    payload: data
  };
};

export const numberOfTimesQuestionAskedAction = (data) => {
  return {
    type: "numberOfTimesQuestionAsked",
    payload: data
  };
};

export const askedQuestionAction = (data) => {
  return {
    type: "askedQuestion",
    payload: data
  };
};
export const answerSatisfactionAction = (data) => {
  return {
    type: "answerSatisfaction",
    payload: data
  };
};
