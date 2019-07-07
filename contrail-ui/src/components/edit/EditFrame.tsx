import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import MainAppBar from "../edit/edit-app-bar/EditAppBar";
import MainDrawer from "../main/main-drawer/MainDrawer";
import styles from "../main/mainStyles";
import MainEditUserView from "./edit-user/MainEditUser";

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
export default withStyles(styles)(EditFrame);
