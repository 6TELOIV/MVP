import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { CircularProgress, Backdrop } from "@material-ui/core";
import useStyles from "./assets/Style.js";


const delayImport = (promise) => {
  return Promise.all([
    promise,
    new Promise(resolve => setTimeout(resolve, 500))
  ]).then(([moduleExports]) => moduleExports);
}

//lazy load pages to improve load times
const Landing = lazy(() => delayImport(import("./pages/Landing")));
const Login = lazy(() => delayImport(import("./pages/Login")));
const Signup = lazy(() => delayImport(import("./pages/Signup")));
const AdminPage = lazy(() => delayImport(import("./pages/AdminPage")));
const AdminEdit = lazy(() => delayImport(import("./pages/AdminEdit")));
const UserDashboard = lazy(() => delayImport(import("./pages/UserDashboard")));
const UserHoroscope = lazy(() => delayImport(import("./pages/UserHoroscope")));
const Privacy = lazy(() => delayImport(import("./pages/Privacy")));

//<Route component={NotFound}/>
const App = (props) => {
  const classes = useStyles();
  return (
    <Router>
      <Suspense fallback={
        <Backdrop open={true} className={classes.backdrop}>
          <CircularProgress />
        </Backdrop>
      }>
        <Switch>
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Landing" component={Landing} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/AdminPage" component={AdminPage} />
          <Route exact path="/UserDashboard" component={UserDashboard} />
          <Route exact path="/AdminEdit" component={AdminEdit} />
          <Route exact path="/UserHoroscope" component={UserHoroscope} />
          <Route exact path="/Privacy" component={Privacy} />
          <Redirect to="/Landing" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
