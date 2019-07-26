import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import * as ROUTES from "../../../routes";
import { IAppReduxState } from "../../../store/store.types";
import * as types from "./AuthorizedRoute.type";

class AuthorizedRoute extends Component<types.IAuthorizedProps> {
    public render() {
        const { component: AuthorizedComponent, authToken, authUser, path } = this.props;
        const isAuth =  authToken && authUser && authUser.emailVerified;
        const renderComponent =  () => isAuth ? <AuthorizedComponent /> : <Redirect to={ROUTES.ROOT} />;

        return (
            <Route
                path={path}
                render={renderComponent}
            />
        );
    }
}

const mapStateToProps = (state: IAppReduxState): types.IAuthorizedStateProps => {
    return {
        authUser: state.authState.authUser,
        authToken: state.authState.authToken,
    };
};

export default connect(mapStateToProps)(AuthorizedRoute);
