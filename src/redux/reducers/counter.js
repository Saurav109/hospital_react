const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "DEINCREASE":
      return state - 1;
    default:
      return state;
  }
};
export default counter;
