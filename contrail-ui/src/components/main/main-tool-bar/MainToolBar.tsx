import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TrashIcon from "@material-ui/icons/RestoreFromTrash";
import { withStyles } from "@material-ui/styles";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import React, { Component } from "react";
import styles from "./toolbarStyles";
class MainToolBar extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
            <AppBar position="relative" color="secondary">
                <Toolbar>
                    <Typography variant="subtitle1" className={classes.title}>
                        Name
                    </Typography>
                    <Typography variant="subtitle1" className={classes.title}>
                        Owner
                    </Typography>
                    <Typography variant="subtitle1" className={classes.title}>
                        Last Modified
                    </Typography>
                    <IconButton color="default" edge="start" size="medium">
                        <RemoveRedEyeIcon />
                    </IconButton>
                    <IconButton color="default" edge="start">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton color="default" edge="start" size="medium">
                        <TrashIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(MainToolBar);
