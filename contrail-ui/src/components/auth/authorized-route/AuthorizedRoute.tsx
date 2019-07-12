import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import * as ROUTES from "../../../routes";
import { IAppReduxState } from "../../../store/store.types";
import { IAuthorizedProps, IAuthorizedStateProps } from "./AuthorizedRoute.type";

class AuthorizedRoute extends React.Component<IAuthorizedProps> {
    public render() {
        const { component, authToken, authUser, path } = this.props;
        const renderComponent: Element | any =
        (authToken && authUser) ? {component} : <Redirect to={ROUTES.LOGIN} />;

        return (
            <Route path={path} component={renderComponent} />
        );
    }
}

const mapStateToProps = (state: IAppReduxState): IAuthorizedStateProps => {
    return {
        authToken: state.authState.authToken,
        authUser: state.authState.authUser,
    };
};

export default connect(mapStateToProps)(AuthorizedRoute);
