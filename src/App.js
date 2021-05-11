import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import SellProducts from "./components/SellProducts";
import BuyProducts from "./components/BuyProducts";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/sellProducts">
            <SellProducts />
          </PrivateRoute>
          <PrivateRoute path="/buyProducts">
            <BuyProducts />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
