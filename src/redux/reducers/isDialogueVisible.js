const isDialogueVisible = (
  state = {
    isVisible: false,
    title: "",
    subtitile: "",
    handleOnConfirm: () => {},
    handleOnCancle: () => {},
  },
  action
) => {
  switch (action.type) {
    case "SHOW":
      return {
        isVisible: true,
        title: action.props.title,
        subtitle: action.props.subtitle,
        handleOnConfirm: action.props.handleOnConfirm,
        handleOnCancle: action.props.handleOnConfirm,
      };
    case "HIDE":
      return {
        isVisible: false,
        title: "",
        subtitile: "",
        handleOnConfirm: () => {},
        handleOnCancle: () => {},
      };
    default:
      return state;
  }
};
export default isDialogueVisible;
