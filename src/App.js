import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "./components/home/Home"
import Details from "./components/details/Details"
import NotFound from "./components/notFound/NotFound"

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route component={Details}
                        path="/Details"/>
                    <Route component={Home}
                        path="/"
                        exact/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
