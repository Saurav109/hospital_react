import { useEffect } from "react";
import AddDisease from "./AddDiseas";
import { useSelector, useDispatch } from "react-redux";
import { showDialogue, hideDialogue } from "../../redux/actions";
export default function AdminProfile() {
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  const onButtonClick = () => {
    dispatch(
      showDialogue({
        title: "this is tilte",
        subtitle: "this is subtitle",
        handleOnConfirm: () => {
          dispatch(hideDialogue());
        },
        handleOnCancle: () => {
          dispatch(hideDialogue());
        },
      })
    );
  };

  return (
    <div>
      <h1>Admin Profile</h1>
      <button onClick={onButtonClick}>Click it</button>
      <AddDisease />
    </div>
  );
}
