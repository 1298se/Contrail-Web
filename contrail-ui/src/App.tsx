import Axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { IAppProps, IAppStateProps } from "./app.types";
import Auth from "./components/auth/auth-page/Auth";
import AuthorizedRoute from "./components/auth/authorized-route/AuthorizedRoute";
import MainFrame from "./components/main/MainFrame";
import * as ROUTES from "./routes";
import { setAuthListener } from "./store/actions/authActions";
import { IAuthFetchUserAction } from "./store/actions/authActions.types";
import { setNetworkState } from "./store/actions/networkActions";
import { IAppReduxState } from "./store/store.types";

const DefaultRedirect = () => {
    return (
        <Redirect to={ROUTES.LOGIN} />
    );
};

class App extends Component<IAppProps, {}> {
    public componentDidMount() {
        console.log("mounting app");
        this.props.setAuthListener();
        window.addEventListener("online", this.handleConnectionChange);
        window.addEventListener("offline", this.handleConnectionChange);
    }

    public handleConnectionChange = () => {
        console.log("network shit")
        const networkCondition = navigator.onLine ? "online" : "offline";
        if (networkCondition === "online") {
            console.log("network fuck")
            // TODO: Add proxy to backend
            Axios.get("/")
            .then(() => {
                console.log("this should not happen")
                this.props.setNetworkState(true);
            }).catch(() => {
                console.log("network is actual shit")
                this.props.setNetworkState(false);
            });
        } else {
            console.log("network is actual shit")
            this.props.setNetworkState(false);
        }
    }

    public render() {
        if (this.props.isLoading) {
            return (
                <div>LOADING</div>
            );
        }
        return (
            <Router>
                <Route path={ROUTES.ROOT} exact={true} component={DefaultRedirect} />
                <Route path={ROUTES.LOGIN} component={Auth} />
                <AuthorizedRoute path={ROUTES.MAIN} component={MainFrame} />
            </Router>
        );
    }
}

const mapStateToProps = (state: IAppReduxState): IAppStateProps => {
    return {
        isLoading: state.appUiState.isLoading,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, IAuthFetchUserAction>) => {
    return {
        setAuthListener: () => dispatch(setAuthListener()),
        setNetworkState: (isConnected: boolean) => dispatch(setNetworkState(isConnected)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
