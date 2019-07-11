import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { IAppProps } from "./app.types";
import Auth from "./components/auth/auth-page/Auth";
import MainFrame from "./components/main/MainFrame";
import AuthorizedRoute from "./HOCs/AuthorizedRoute";
import * as ROUTES from "./routes";
import { fetchUserAction } from "./store/actions/authActions";
import { IAuthFetchUserAction } from "./store/actions/authActions.types";

const DefaultRedirect = () => {
    return (
        <Redirect to={ROUTES.LOGIN} />
    );
};

const App: FC<IAppProps> = ({
    fetchUser,
}) => {
    useEffect(() => {
        fetchUser();
    });

    return (
        <Router>
            <Route path={ROUTES.ROOT} exact={true} component={DefaultRedirect} />
            <Route path={ROUTES.LOGIN} component={Auth} />
            <AuthorizedRoute path={ROUTES.MAIN} component={MainFrame} />
            <AuthorizedRoute path={ROUTES.FILES} component={MainFrame} authRoute={"files"} />
            <AuthorizedRoute path={ROUTES.FAVORITES} component={MainFrame} authRoute={"favorites"} />
            <AuthorizedRoute path={ROUTES.SHARED} component={MainFrame} authRoute={"shared"} />
            <AuthorizedRoute path={ROUTES.TRASH} component={MainFrame} authRoute={"trash"} />
        </Router>
    );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, IAuthFetchUserAction>) => {
    return {
        fetchUser: () => dispatch(fetchUserAction()),
    };
};

export default connect(null, mapDispatchToProps)(App);
