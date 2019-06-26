import { withStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SharedIcon from "@material-ui/icons/FolderShared"
import TrashIcon from "@material-ui/icons/RestoreFromTrash";
import React, {Component} from "react";
import styles from "../mainStyles";

class MainDrawer extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
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
export default withStyles(styles)(MainDrawer);
