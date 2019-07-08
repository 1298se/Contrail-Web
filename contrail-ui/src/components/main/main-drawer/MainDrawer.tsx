import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SharedIcon from "@material-ui/icons/FolderShared";
import TrashIcon from "@material-ui/icons/RestoreFromTrash";
import React, {Component} from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as actions from "../../../store/actions/uploadDialogActions";
import styles from "../mainStyles";

class MainDrawer extends Component<any, any> {
    public openFileUpload = () => {
        this.props.uploadDialogOpen();
    }

    public render() {
        const { classes } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{paper: classes.drawerPaper}}
            >
                <div className={classes.appBarSpacer} />
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick={this.openFileUpload}>
                        <CloudUploadIcon className={classes.uploadIcon} />
                        Upload
                    </Button>
                    <List>
                        <ListItem button={true} key="Files">
                            <ListItemIcon>
                                <FileCopyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Files" />
                        </ListItem>
                        <ListItem button={true} key="Favorites">
                            <ListItemIcon>
                                <FavoriteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Favorites" />
                        </ListItem>
                        <ListItem button={true} key="Shared">
                            <ListItemIcon>
                                <SharedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Shared" />
                        </ListItem>
                        <ListItem button={true} key="Trash">
                            <ListItemIcon>
                                <TrashIcon />
                            </ListItemIcon>
                            <ListItemText primary="Trash" />
                        </ListItem>
                    </List>
            </Drawer>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthTypes>): any => {
    return {
        uploadDialogOpen: () => dispatch(actions.uploadDialogOpen()),
    };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(MainDrawer));
