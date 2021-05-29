import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Frontend from "./Components/Frontend";
import Login from "./Components/Login";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={"/"} component={Frontend}/>
          <Route exact path={"/login"} component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
