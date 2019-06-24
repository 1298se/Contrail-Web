import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Auth from "./components/auth/auth-page/Auth";
import MainFrame from "./components/main/mainframe/MainFrame";
function App() {
  return (
    <Router>
      <Route path="/auth" exact={true} component={Auth} />
      <Route path ="/main" exact={true} component={MainFrame}/>
      {/* <Redirect to="/auth" /> */}
    </Router>
  );
}

export default App;
