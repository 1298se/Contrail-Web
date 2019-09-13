import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { Component } from "react";
import * as auth from "../../../firebase/controllers/authController";
import withSnackbar from "../../feedback/snackbar-component/SnackbarComponent";
import SnackbarContentWrapper from "../../feedback/snackbar-content-wrapper/SnackbarContentWrapper";
import styles from "./appBarStyles";
import * as types from "./mainAppBar.type";

class MainAppBar extends Component<types.MainAppBarProps, types.IMainAppBarState> {
    public state = {
        anchorEl: null,
    };

    public handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    }

    public handleMenuClose = () => {
        this.setState({
            anchorEl: null,
        });
    }

    public handleLogoutClick = () => {
        this.handleMenuClose();
        auth.logoutUser()
            .catch((error) => {
                this.props.setSnackbarDisplay("error", error);
            });
    }

    public render() {
        const { classes } = this.props;
        const open = this.props.isDrawerOpen;

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
                <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
            </Menu>
        );

        return (
            <React.Fragment>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {[classes.appBarShift]: open})}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={clsx(classes.menuButton, {[classes.hide]: open})}
                            color="inherit"
                            onClick={this.props.toggleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.appBarTitle} variant="h6" noWrap={true}>
                            Contrail
                    </Typography>
                        <IconButton edge="end" color="inherit" onClick={this.handleMenuOpen}>
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                    {userMenu}
                </AppBar>
            </React.Fragment>
        );
    }
}

export default withSnackbar(withStyles(styles)(MainAppBar));
