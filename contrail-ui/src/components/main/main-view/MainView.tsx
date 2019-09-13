import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Routes } from "../../../routes";
import ResourceFrame from "../../resources/ResourceFrame";
import { MainViewProps } from "./mainView.type";
import styles from "./mainViewStyles";

class MainView extends Component<MainViewProps, {}> {
    public render() {
        const { classes } = this.props;
        const DefaultRedirect = () => <Redirect to={Routes.FILES} />;

        return (
            <div className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Switch>
                    <Route path={Routes.MAIN} exact={true} component={DefaultRedirect} />
                    <Route path={Routes.MAIN} component={ResourceFrame} />
                </Switch>
            </div>
        );
    }
}
export default withStyles(styles)(MainView);
