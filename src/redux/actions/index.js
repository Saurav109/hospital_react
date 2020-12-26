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

export const showDialogue = (props) => {
  return {
    type: "SHOW",
    props: props,
  };
};
export const hideDialogue = () => {
  return {
    type: "HIDE",
  };
};
