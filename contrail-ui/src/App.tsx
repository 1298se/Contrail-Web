import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import {  } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Files from "./components/Files/Files";

function App() {
  return (
    <Router>
      <Route path="/auth" exact={true} component={Auth} />
      <Route path="/app/files" exact={true} component={Files} />
      <Redirect to="/auth" />
    </Router>
  );
}

export default App;
