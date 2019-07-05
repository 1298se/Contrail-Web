import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Auth from "./components/auth/auth-page/Auth";
import MainFrame from "./components/main/MainFrame";

function App() {
  return (
    <Router>
      <Route path="/" component={Auth} />
      <Route path="/main" component={MainFrame} />
    </Router>
  );
}

export default App;
