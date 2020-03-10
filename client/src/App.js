import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Landing from "./pages/Landing";

//import NotFound from "./views/NotFound";

//<Route component={NotFound}/>
const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/Landing" component={Landing} />

        <Route exact path="/">
          <Redirect to="/Landing" />
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
