import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
//import NotFound from "./views/NotFound";

//<Route component={NotFound}/>
const App = (props) => {

  return (
    <div>
      <Switch>
        <Route exact path="/Signup" component={Signup}/>
        <Route exact path="/Landing" component={Landing} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/">
          <Redirect to="/Landing" />
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
