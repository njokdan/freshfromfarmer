import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Frontend from "./Components/Frontend";
import Orders from "./Components/Admin/Orders";
import Items from "./Components/Admin/Items";
import Products from "./Components/Products";
import Signup from "./Components/Signup";
import Supply from "./Components/Admin/Supply";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={"/"} component={Frontend}/>
          <Route exact path={"/signup/"} component={Signup}/>
          <Route exact path={"/products/"} component={Products}/>
          <Route exact path={"/admin/orders/"} component={Orders}/>
          <Route exact path={"/admin/items/"} component={Items}/>
          <Route exact path={"/admin/supply/"} component={Supply}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
