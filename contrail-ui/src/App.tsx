import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Auth from "./components/auth/auth-page/Auth";

function App() {
  return (
    <Router>
      <Route path="/auth" exact={true} component={Auth} />
      <Redirect to="/auth" />
    </Router>
  );
}

export default App;
