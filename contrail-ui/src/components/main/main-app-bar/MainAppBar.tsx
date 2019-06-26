import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import styles from "../mainStyles";

class MainAppBar extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
            <body>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" noWrap={true}>
                                Contrail Web
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
            </body>
        );
    }
}
export default withStyles(styles)(MainAppBar);