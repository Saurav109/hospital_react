import Login from "../components/login/Login";
import CreateAccount from "../components/login/CreateAccount";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NotFound from "../components/notFound/NotFound";
import ForgatePassword from "../components/login/ForgatePassword";

function BeforeLoginRoute() {
  return (
    <Router>
      <Switch>
        <Route component={CreateAccount} path="/signUp" />
        <Route component={ForgatePassword} path="/resetPass" />
        <Route component={Login} path="/" exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default BeforeLoginRoute;
