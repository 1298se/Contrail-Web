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
import { connect } from "react-redux";
import * as filesController from "../../../firebase/controllers/filesController";
import { IAppReduxState } from "../../../store/store.types";
import * as types from "./resourceToolBar.type";
import styles from "./toolBarStyles";

class ResourceToolBar extends Component<types.ResourceToolBarProps, types.IResourceToolBarState> {
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

    public handleFavouriteClick = () => {
        const { selectedResources, userResources } = this.props;
        this.handleMobileMenuClose();

        const isAllFavourited = !(selectedResources.some((selectRes) =>
            !userResources.favourites.map((res) => res.generation).includes(selectRes.generation)));
        if (isAllFavourited) {
            filesController.removeResourcesFromFavourites(selectedResources);
        } else {
            filesController.addResourcesToFavourites(selectedResources);
        }
    }

    public render() {
        const isItemSelected = this.props.selectedResources.length !== 0;
        const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

        const { classes } = this.props;
        const mobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted={true}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem disabled={!isItemSelected} onClick={this.handleMobileMenuClose}>
                    <IconButton color="default">
                        <RemoveRedEyeIcon />
                    </IconButton>
                    <p>View</p>
                </MenuItem>
                <MenuItem disabled={!isItemSelected} onClick={this.handleFavouriteClick}>
                    <IconButton color="default">
                        <FavoriteIcon />
                    </IconButton>
                    <p>Favourite</p>
                </MenuItem>
                <MenuItem disabled={!isItemSelected} onClick={this.handleMobileMenuClose}>
                    <IconButton color="default">
                        <SharedIcon />
                    </IconButton>
                    <p>Share</p>
                </MenuItem>
                <MenuItem disabled={!isItemSelected} onClick={this.handleMobileMenuClose}>
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
                            {this.props.titleText}
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton color="default" disabled={!isItemSelected}>
                                <RemoveRedEyeIcon />
                            </IconButton>
                            <IconButton color="default" disabled={!isItemSelected} onClick={this.handleFavouriteClick}>
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton color="default" disabled={!isItemSelected}>
                                <SharedIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                color="default"
                                disabled={!isItemSelected}
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

const mapStateToProps = (state: IAppReduxState): types.IResourceToolBarStateProps => {
    return {
        selectedResources: state.resourceState.selectedResources,
        userResources: state.resourceState.userResources,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(ResourceToolBar));
