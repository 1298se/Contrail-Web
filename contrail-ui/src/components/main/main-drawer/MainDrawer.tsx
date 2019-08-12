import { withStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SharedIcon from "@material-ui/icons/FolderShared";
import TrashIcon from "@material-ui/icons/RestoreFromTrash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../routes";
import theme from "../../../theme";
import UploadButton from "../../resources/upload-button/UploadButton";
import { MainDrawerProps } from "./mainDrawer.type";
import styles from "./mainDrawerStyles";

class MainDrawer extends Component<MainDrawerProps, {}> {
    public render() {
        const { classes } = this.props;

        return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={this.props.isDrawerOpen}
                classes={{paper: classes.drawerPaper}}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.props.toggleDrawerOpen}>
                        {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <UploadButton />
                <Divider />
                <List>
                    <ListItem button={true} key="Files" component={Link} to={ROUTES.FILES}>
                        <ListItemIcon>
                            <FileCopyIcon />
                        </ListItemIcon>
                        <ListItemText primary="Files" />
                    </ListItem>
                    <ListItem button={true} key="Favorites" component={Link} to={ROUTES.FAVOURITES}>
                        <ListItemIcon>
                            <FavoriteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItem>
                    <ListItem button={true} key="Shared" component={Link} to={ROUTES.SHARED}>
                        <ListItemIcon>
                            <SharedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Shared" />
                    </ListItem>
                    <ListItem button={true} key="Trash" component={Link} to={ROUTES.TRASH}>
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
