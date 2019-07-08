import { withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import React, { Component } from "react";
import UploadDialog from "../../files/upload-dialog/UploadDialog";
import MainToolBar from "../main-tool-bar/MainToolBar";
import styles from "../mainStyles";
import ResourceListView from "../resource-list-view/ResourceListView";

class MainView extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                <UploadDialog />
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
