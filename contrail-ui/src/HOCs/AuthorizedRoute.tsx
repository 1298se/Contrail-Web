import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { IAuthorizedRouteProps } from "./AuthorizedRoute.type";

class AuthorizedRoute extends React.Component<IAuthorizedRouteProps> {
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
                        to={"/auth"}
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
