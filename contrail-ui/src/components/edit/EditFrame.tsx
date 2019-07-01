import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import MainEditUserView from "./edit-user/MainEditUser"
import MainAppBar from "../main/main-app-bar/MainAppBar"
import MainDrawer from "../main/main-drawer/MainDrawer";
import styles from "../main/mainStyles";

class EditFrame extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <CssBaseline />
            <MainAppBar />
            <MainDrawer />
            <MainEditUserView />
          </div>
        );
    }
}
export default withStyles(styles)(EditFrame)