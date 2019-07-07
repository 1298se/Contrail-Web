import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Auth from "./components/auth/auth-page/Auth";
import MainFrame from "./components/main/MainFrame";
import AuthorizedRoute from "./HOCs/AuthorizedRoute";
import * as ROUTES from "./routes";

function App() {
  return (
    <Router>
      <Route path={ROUTES.AUTH} component={Auth} />
      <AuthorizedRoute path={ROUTES.MAIN} component={MainFrame} />
      <AuthorizedRoute path={ROUTES.FILES} component={MainFrame} authRoute={"files"} />
      <AuthorizedRoute path={ROUTES.FAVORITES} component={MainFrame} authRoute={"favorites"}  />
      <AuthorizedRoute path={ROUTES.SHARED} component={MainFrame} authRoute={"shared"} />
      <AuthorizedRoute path={ROUTES.TRASH} component={MainFrame} authRoute={"trash"}  />
    </Router>
  );
}

export default App;
