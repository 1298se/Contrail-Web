import { withStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SharedIcon from "@material-ui/icons/FolderShared";
import TrashIcon from "@material-ui/icons/RestoreFromTrash";
import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../routes";
import UploadButton from "../../resources/upload-button/UploadButton";
import styles from "../mainStyles";
import { MainDrawerProps } from "./mainDrawer.type";

class MainDrawer extends Component<MainDrawerProps, {}> {
    public render() {
        const { classes } = this.props;

        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{paper: classes.drawerPaper}}
            >
                <div className={classes.appBarSpacer} />
                <UploadButton />
                <List>
                    <ListItem button={true} key="Files" component={NavLink} to={ROUTES.FILES}>
                        <ListItemIcon>
                            <FileCopyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Files" />
                    </ListItem>
                    <ListItem button={true} key="Favorites" component={NavLink} to={ROUTES.FAVOURITES}>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItem>
                    <ListItem button={true} key="Shared" component={NavLink} to={ROUTES.SHARED}>
                        <ListItemIcon>
                            <SharedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Shared" />
                    </ListItem>
                    <ListItem button={true} key="Trash" component={NavLink} to={ROUTES.TRASH}>
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

export default withStyles(styles)(MainDrawer);
