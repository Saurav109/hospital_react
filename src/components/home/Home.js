import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut, increase, decrease } from "../../redux/actions";
import { useState, useEffect } from "react";
import firebase from "../../fire";
import { withSnackbar } from "notistack";

function HomeView() {
  const isLogged = useSelector((state) => state.isLogged);
  const counter = useSelector((state) => state.counter);

  const dispatch = useDispatch();
  return (
    <div>
      {isLogged ? (
        <div>
          <h1>hello you are logged in</h1>
          <button onClick={() => dispatch(logOut())}>logout</button>
        </div>
      ) : (
        <div>
          <h1>hello you are logged out</h1>
          <button onClick={() => dispatch(logIn())}>login</button>
        </div>
      )}

      <p>{counter}</p>
      <button onClick={() => dispatch(increase())}>+</button>
      <button onClick={() => dispatch(decrease())}>+</button>
    </div>
  );
}

function Home(props) {
  console.log("staring home...");
  const [isLoggedIn, setLoggedIn] = useState(0);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        console.log(`user logged in, user id: ${uid}`);
        props.enqueueSnackbar("user logged in");
        setLoggedIn(1);
      } else {
        console.log("user not logged in");
        props.enqueueSnackbar("user not logged in");
        setLoggedIn(-1);
      }
    });
  }, []);

  switch (isLoggedIn) {
    case 0:
      return <h1>loading...</h1>;
    case 1:
      return <Home />;
    case -1:
      return <h1>not logged in</h1>;
  }
}

export default withSnackbar(Home);
