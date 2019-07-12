import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import * as ROUTES from "../../../routes";
import { IAuthorizedProps } from "./AuthorizedRoute.type";

class AuthorizedRoute extends Component<IAuthorizedProps> {
    public render() {
        const { component: Component, authToken, ...rest } = this.props;
        // const isAuth =  authToken || localStorage.getItem("token");
        const isAuth =  authToken;
        return (
        <Route
            {...rest}
           render={(routeProps) =>
                isAuth ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect
                        to={ROUTES.LOGIN}
                    />
                )
            }
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
