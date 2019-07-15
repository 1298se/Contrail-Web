import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import * as auth from "../../../utils/firebase/auth-utils";
import styles from "./appBarStyles";
import { IMainAppBarProps, IMainAppBarState } from "./mainAppBar.type";

class MainAppBar extends Component<IMainAppBarProps, IMainAppBarState> {
    public state = {
        anchorEl: null,
    };

    public handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState ({
            anchorEl: event.currentTarget,
        });
    }

    public handleMenuClose = () => {
        this.setState ({
            anchorEl: null,
        });
    }

    public handleLogoutClick = () => {
        // TODO: Handle Errors
        this.handleMenuClose();
        auth.logoutUser();
    }

    public render() {
        const { classes } = this.props;

        const userMenu = (
            <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted={true}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
            </Menu>
        );

        return (
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.drawerButton} color="inherit" >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.appBarTitle} variant="h6" noWrap={true}>
                        Contrail Web
                    </Typography>
                    <IconButton edge="end" color="inherit" onClick={this.handleMenuOpen}>
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
                {userMenu}
            </AppBar>
        );
    }
}

export default withStyles(styles)(MainAppBar);
