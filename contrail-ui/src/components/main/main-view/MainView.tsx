import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import clsx from "clsx";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as ROUTES from "../../../routes";
import ResourceFrame from "../../resources/ResourceFrame";
import { MainViewProps } from "./mainView.type";
import styles from "./mainViewStyles";

class MainView extends Component<MainViewProps, {}> {
    public render() {
        const { classes } = this.props;
        const DefaultRedirect = () => <Redirect to={ROUTES.FILES} />;

        return (
            <div className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Switch>
                    <Route path={ROUTES.MAIN} exact={true} component={DefaultRedirect} />
                    <Route path={ROUTES.MAIN} component={ResourceFrame} />
                </Switch>
            </div>
        );
    }
}
export default withStyles(styles)(MainView);
