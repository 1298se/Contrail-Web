import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import React, { Component } from "react";
import styles from "../mainStyles";

class MainView extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.paper}>
                <div className={classes.toolbar} />
                    <Container>
                        <div>
                            <h1> Welcome to the MainFrame!</h1>
                        </div>
                    </Container>
            </Paper>
        );
    }
}
export default withStyles(styles)(MainView);
