import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import * as ROUTES from "../../../routes";
import { IAuthorizedProps } from "./AuthorizedRoute.type";

class AuthorizedRoute extends Component<IAuthorizedProps> {
    public render() {
        const { component: AuthorizedComponent, authToken, path } = this.props;
        const isAuth =  authToken;
        const renderComponent =  () => isAuth ? <AuthorizedComponent /> : <Redirect to={ROUTES.LOGIN} />;

        return (
            <Route
                path={path}
                render={renderComponent}
            />
        );
    }
}

const mapStateToProps = (state: any): any => {
    return {
        authToken: state.authState.authToken,
    };
};

export default connect(mapStateToProps)(AuthorizedRoute);
