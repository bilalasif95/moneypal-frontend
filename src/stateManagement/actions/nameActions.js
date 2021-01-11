export const setNewUserName = (payload) => {
  return {
    type: "settedUserName",
    payload: payload,
  };
};

export const setNewUserNameError = (payload) => {
  return {
    type: "settedUserNameError",
    payload: payload,
  };
};
