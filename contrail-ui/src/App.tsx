import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Props } from "./app.types";
import Auth from "./components/auth/auth-page/Auth";
import MainFrame from "./components/main/MainFrame";
import AuthorizedRoute from "./HOCs/AuthorizedRoute";
import * as ROUTES from "./routes";
import { fetchUserActionCreator } from "./store/actions/authActions";

const App: FC<Props> = ({
  fetchUser,
}) => {
  useEffect(() => {
    fetchUser();
  });

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
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchUser: () => dispatch(fetchUserActionCreator()),
  };
};

export default connect(null, mapDispatchToProps)(App);
