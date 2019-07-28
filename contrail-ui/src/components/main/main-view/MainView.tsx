import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React, { Component } from "react";
import ResourceFrame from "../../resources/ResourceFrame";
import styles from "../mainStyles";

class MainView extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container className={classes.container}>
                    <ResourceFrame />
                </Container>
            </div>
        );
    }
}
export default withStyles(styles)(MainView);
