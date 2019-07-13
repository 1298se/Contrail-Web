import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SharedIcon from "@material-ui/icons/FolderShared";
import MoreIcon from "@material-ui/icons/MoreVert";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import TrashIcon from "@material-ui/icons/RestoreFromTrash";
import React, { Component } from "react";
import { IMainToolBarProps, IMainToolBarState } from "./mainToolBar.type";
import styles from "./toolBarStyles";

class MainToolBar extends Component<IMainToolBarProps, IMainToolBarState> {
    public state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
    };

    public handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({
            mobileMoreAnchorEl: event.currentTarget,
        });
    }

    public handleMobileMenuClose = () => {
        this.setState({
            mobileMoreAnchorEl: null,
        });
    }

    public render() {
        const mobileMenuId = "toolbar-icons-menu-mobile";
        const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

        const { classes } = this.props;
        const mobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id={mobileMenuId}
                keepMounted={true}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="default">
                        <RemoveRedEyeIcon />
                    </IconButton>
                    <p>View</p>
                </MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="default">
                        <FavoriteIcon />
                    </IconButton>
                    <p>Favorite</p>
                </MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="default">
                        <SharedIcon />
                    </IconButton>
                    <p>Share</p>
                </MenuItem>
                <MenuItem onClick={this.handleMobileMenuClose}>
                    <IconButton color="default">
                        <TrashIcon />
                    </IconButton>
                    <p>Trash</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.grow}>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap={true}>
                            Files
                </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton color="default">
                                <RemoveRedEyeIcon />
                            </IconButton>
                            <IconButton color="default">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton color="default">
                                <SharedIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                color="default"
                            >
                                <TrashIcon />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                onClick={this.handleMobileMenuOpen}
                                color="default"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {mobileMenu}
            </div>
        );
    }
}

export default withStyles(styles)(MainToolBar);
