// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import Details from "./components/details/Details";
// import NotFound from "./components/notFound/NotFound";
// import { createStore } from "redux";
// import allReducer from "./redux/reducers/";
// import { Provider } from "react-redux";
// import { SnackbarProvider } from "notistack";
import LoadingView from "./components/utils/Loading";
// import logged from "./redux/reducers/isLogged";
// import { useSelector, useDispatch } from "react-redux";
// import { logIn, logOut, increase, decrease } from "../../redux/actions";
import { useState, useEffect } from "react";
import firebase from "./fire";
import AfterLoginRoute from "./routes/AfterLoginRoute";
import BeforeLoginRoute from "./routes/BeforeLoginRoute";

// const store = createStore(allReducer);

// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()));

// function App() {
//   return (
//     <Provider store={store}>
//       <SnackbarProvider maxSnack={3}>
//         <Router>
//           <Switch>
//             <Route component={Details} path="/Details" />
//             <Route component={Home} path="/" exact />
//             <Route component={NotFound} />
//           </Switch>
//         </Router>
//       </SnackbarProvider>
//     </Provider>
//   );
// }
function App(props) {
  const [isLoggedIn, setLoggedIn] = useState(0);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        console.log(`user logged in, user id: ${uid}`);
        setLoggedIn(1);
      } else {
        console.log("user not logged in");
        setLoggedIn(-1);
      }
    });
  }, []);

  switch (isLoggedIn) {
    case 0:
      return <LoadingView />;
    case 1:
      return <AfterLoginRoute />;
    case -1:
      return <BeforeLoginRoute />;
  }
}

export default App;
