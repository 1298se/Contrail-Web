import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppReduxState } from "../../store/store.types";
import DialogWrapper from "../feedback/dialog-wrapper/DialogWrapper";
import UploadDialog from "../files/upload-dialog/UploadDialog";
import MainAppBar from "./main-app-bar/MainAppBar";
import MainDrawer from "./main-drawer/MainDrawer";
import MainView from "./main-view/MainView";
import * as types from "./mainFrame.type";
import styles from "./mainStyles";

class MainFrame extends Component <types.MainFrameProps, {}> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <DialogWrapper
                    title={"Network Disconnected. Attempting to Reconnect..."}
                    isOpen={!this.props.hasInternetConnection}
                    shouldDisplayLoading={true}
                />
                <UploadDialog />
                <CssBaseline />
                <MainAppBar />
                <MainDrawer />
                <MainView />
            </div>
        );
    }
}

const mapStateToProps = (state: IAppReduxState): types.IMainFrameStateProps => {
    return {
        hasInternetConnection: state.networkState.hasInternetConnection,
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(MainFrame));
