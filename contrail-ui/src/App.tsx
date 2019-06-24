import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Files from "./components/App/Files/files";
import Auth from "./components/Auth/Auth/auth";

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
