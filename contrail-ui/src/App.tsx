import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { IAppProps, IAppStateProps } from "./app.types";
import Auth from "./components/auth/auth-page/Auth";
import AuthorizedRoute from "./components/auth/authorized-route/AuthorizedRoute";
import MainFrame from "./components/main/MainFrame";
import * as ROUTES from "./routes";
import { fetchUserAction } from "./store/actions/authActions";
import { IAuthFetchUserAction } from "./store/actions/authActions.types";
import { IAppReduxState } from "./store/store.types";

const DefaultRedirect = () => {
    return (
        <Redirect to={ROUTES.LOGIN} />
    );
};

const App: FC<IAppProps> = (props) => {

    useEffect(() => {
        props.fetchUser();
    });

    return (
        <Router>
            <Route path={ROUTES.ROOT} exact={true} component={DefaultRedirect} />
            <Route path={ROUTES.LOGIN} component={Auth} />
            <AuthorizedRoute path={ROUTES.MAIN} component={MainFrame} />
            <AuthorizedRoute path={ROUTES.FILES} component={MainFrame} />
            <AuthorizedRoute path={ROUTES.FAVORITES} component={MainFrame} />
            <AuthorizedRoute path={ROUTES.SHARED} component={MainFrame} />
            <AuthorizedRoute path={ROUTES.TRASH} component={MainFrame} />
        </Router>
    );
};

const mapStateToProps = (state: IAppReduxState): IAppStateProps => {
    return {
        isLoading: state.appUiState.isLoading,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, IAuthFetchUserAction>) => {
    return {
        fetchUser: () => dispatch(fetchUserAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
