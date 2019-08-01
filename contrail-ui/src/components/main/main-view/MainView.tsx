import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React, { Component } from "react";
import ResourceFrame from "../../resources/ResourceFrame";
import styles from "../mainStyles";
import { MainViewProps } from "./mainView.type";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import * as ROUTES from "../../../routes";

class MainView extends Component<MainViewProps, {}> {
    public render() {
        const { classes } = this.props;
        const DefaultRedirect = () => <Redirect to={ROUTES.FILES} />;

        return (
            <div className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container className={classes.container}>
                    <Router>
                        <Switch>
                            <Route path={ROUTES.MAIN} exact={true} component={DefaultRedirect} />
                            <Route path={ROUTES.MAIN} component={ResourceFrame} />
                        </Switch>
                    </Router>
                </Container>
            </div>
        );
    }
}
export default withStyles(styles)(MainView);
