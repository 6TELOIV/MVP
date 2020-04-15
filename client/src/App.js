import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import "./App.css"
import Script from 'react-load-script'

//lazy load pages to improve load times
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AdminEdit = lazy(() => import("./pages/AdminEdit"));
const UserDashboard = lazy(()=>import("./pages/UserDashboard"))
//import NotFound from "./views/NotFound";

//<Route component={NotFound}/>

const App = props => {
  
  return (
     
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/Landing" component={Landing} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/AdminPage" component={AdminPage} />
          <Route exact path="/UserDashboard" component={UserDashboard} />
          <Route exact path="/AdminEdit" component={AdminEdit} />
          <Route exact path="/">
            <Redirect to="/Landing" />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default App;
