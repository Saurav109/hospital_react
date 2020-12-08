import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/home/Home";
import Details from "./components/details/Details";
import NotFound from "./components/notFound/NotFound";
import { createStore } from "redux";
import allReducer from "./redux/reducers/";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
// import logged from "./redux/reducers/isLogged";

const store = createStore(allReducer);

// Can still subscribe to the store
store.subscribe(() => console.log(store.getState()));

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <Switch>
            <Route component={Details} path="/Details" />
            <Route component={Home} path="/" exact />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
