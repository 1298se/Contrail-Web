import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppReduxState } from "../../store/store.types";
import DialogWrapper from "../feedback/dialog-wrapper/DialogWrapper";
import ShareDialog from "../resources/share-dialog/ShareDialog";
import UploadDialog from "../resources/upload-dialog/UploadDialog";
import MainAppBar from "./main-app-bar/MainAppBar";
import MainDrawer from "./main-drawer/MainDrawer";
import MainView from "./main-view/MainView";
import * as types from "./mainFrame.type";
import styles from "./mainFrameStyles";

class MainFrame extends Component<types.MainFrameProps, types.IMainFrameState> {
    public state = {
        isDrawerOpen: false,
    };

    public toggleDrawerOpen = () => {
        this.setState({
            isDrawerOpen: !(this.state.isDrawerOpen),
        });
    }

    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <DialogWrapper
                    title={"Network Disconnected. Attempting to Reconnect..."}
                    isOpen={!this.props.hasInternetConnection}
                    shouldDisplayLoading={true}
                />
                <UploadDialog />
                <ShareDialog />
                <MainAppBar toggleDrawerOpen={this.toggleDrawerOpen} isDrawerOpen={this.state.isDrawerOpen} />
                <MainDrawer toggleDrawerOpen={this.toggleDrawerOpen} isDrawerOpen={this.state.isDrawerOpen} />
                <MainView isDrawerOpen={this.state.isDrawerOpen} />
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
