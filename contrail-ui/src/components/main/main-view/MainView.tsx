import { withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { borders } from "@material-ui/system";
import React, { Component } from "react";
import MainToolBar from "../main-tool-bar/MainToolBar";
import FileUploadModal from "../../files/file-upload-modal/fileUploadModal";
import styles from "../mainStyles";
import ResourceListView from "../resource-list-view/ResourceListView";


class MainView extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                <FileUploadModal />
                <div className={classes.appBarSpacer} />
                <Container className={classes.container}>
                    <MainToolBar />
                    <div className={classes.appBarSpacer} />
                    <ResourceListView />
                </Container>
            </div>
        );
    }
}
export default withStyles(styles)(MainView);
