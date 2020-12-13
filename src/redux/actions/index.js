export const logIn = () => {
  return {
    type: "LOGGED_IN",
  };
};

export const logOut = () => {
  return {
    type: "LOG_OUT",
  };
};

export const increase = () => {
  return {
    type: "INCREASE",
  };
};

export const decrease = () => {
  return {
    type: "DEINCREASE",
  };
};

export const startLoading = () => {
  return {
    type: "START",
  };
};

export const stopLoading = () => {
  return {
    type: "STOP",
  };
};
