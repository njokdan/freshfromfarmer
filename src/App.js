import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Frontend from "./Components/Frontend";
import Orders from "./Components/Admin/Orders";
import Items from "./Components/Admin/Items";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={"/"} component={Frontend}/>
          <Route exact path={"/admin/orders/"} component={Orders}/>
          <Route exact path={"/admin/items/"} component={Items}/>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
