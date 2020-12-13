import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "../components/notFound/NotFound";
import Home from "../components/home/";

function AfterLoginRoute() {
  return (
    <Router>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default AfterLoginRoute;
