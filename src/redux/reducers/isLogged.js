const logged = (state = false, action) => {
  switch (action.type) {
    case "LOGGED_IN":
      return true;
    case "LOG_OUT":
      return false;
    default:
      return state;
  }
};
export default logged;
