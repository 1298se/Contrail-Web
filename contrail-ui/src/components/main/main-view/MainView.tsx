import { withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { borders } from "@material-ui/system";
import React, { Component } from "react";
import MainToolBar from "../main-tool-bar/MainToolBar";
import FileUploadModal from "../../files/file-upload-modal/fileUploadModal";
import styles from "../mainStyles";

class MainView extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
            <main className={classes.content}>
                <FileUploadModal />
                <div className={classes.appBarSpacer} />
                <Box className={classes.mainToolBarBorder}>
                    <MainToolBar />
                </Box>
            </main>
        );
    }
}
export default withStyles(styles)(MainView);
