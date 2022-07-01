import { Router, Route, Switch, Redirect } from "react-router-dom";

import { useRecoilValue } from "recoil";

import { authAtom } from "_state";
import { Nav, Alert, PrivateRoute } from "_components";
import { history } from "_helpers";
import { Home } from "home";
import { Users } from "users";
import { Account } from "account";
import { ServicesJobs } from "service-jobs";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS

export { App };

function App() {
  const auth = useRecoilValue(authAtom);

  return (
    <div className={"app-container" + (auth ? " bg-light" : "")}>
      <Router history={history}>
        <Nav />
        <Alert />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute path="/service-jobs" component={ServicesJobs} />
          <Route path="/account" component={Account} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}
