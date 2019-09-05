import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SharedIcon from "@material-ui/icons/FolderShared";
import MoreIcon from "@material-ui/icons/MoreVert";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import RestoreIcon from "@material-ui/icons/Restore";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as filesController from "../../../firebase/controllers/filesController";
import { setAppShareDialogOpen } from "../../../store/actions/appUiStateActions";
import { IAppSetShareDialogOpenAction } from "../../../store/actions/appUiStateActions.types";
import { IAppReduxState } from "../../../store/store.types";
import withSnackbar from "../../feedback/snackbar-component/SnackbarComponent";
import { ResourcePages } from "../resourceFrame.types";
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
            !userResources.favourites.includes(selectRes.generation)));
        if (isAllFavourited) {
            filesController.removeResourcesFromFavourites(selectedResources.map((res) => res.generation));
        } else {
            filesController.addResourcesToFavourites(selectedResources.map((res) => res.generation))
                .then(() => {
                    this.props.setSnackbarDisplay("success", "File(s) have been successfully favourited.");
                })
                .catch((error) => {
                    this.props.setSnackbarDisplay("error", error);
                });
        }
    }

    public handleShareClick = () => {
        this.props.setDialogOpen(true);
    }

    public handleTrashClick = () => {
        const { selectedResources } = this.props;
        this.handleMobileMenuClose();

        filesController.addResourcesToTrash(selectedResources.map((res) => res.generation))
            .then(() => {
                this.props.setSnackbarDisplay("success", "File(s) have been successfully trashed.");
            }).catch((error) => {
                this.props.setSnackbarDisplay("error", error);
            });
    }

    public handleRestoreClick = () => {
        const { selectedResources } = this.props;
        this.handleMobileMenuClose();

        filesController.restoreResourceFromTrash(selectedResources.map((res) => res.generation));
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
                        <DeleteIcon />
                    </IconButton>
                    <p>Trash</p>
                </MenuItem>
            </Menu>
        );

        const resourceToolbarItems = (
            <React.Fragment>
                <IconButton
                    color="default"
                    disabled={!isItemSelected}
                >
                    <RemoveRedEyeIcon />
                </IconButton>
                <IconButton
                    color="default"
                    disabled={!isItemSelected}
                    onClick={this.handleFavouriteClick}
                >
                    <FavoriteIcon />
                </IconButton>
                <IconButton
                    color="default"
                    disabled={!isItemSelected}
                >
                    <SharedIcon />
                </IconButton>
                <IconButton
                    edge="end"
                    color="default"
                    disabled={!isItemSelected}
                    onClick={this.handleTrashClick}
                >
                    <DeleteIcon />
                </IconButton>
            </React.Fragment>
        );

        const trashToolbarItems = (
            <React.Fragment>
                <IconButton
                    color="default"
                    disabled={!isItemSelected}
                    onClick={this.handleRestoreClick}
                >
                    <RestoreIcon />
                </IconButton>
                <IconButton
                    color="default"
                    disabled={!isItemSelected}
                    onClick={this.handleFavouriteClick}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </React.Fragment>
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
                            {this.props.titleText === ResourcePages.TRASH ? trashToolbarItems : resourceToolbarItems}
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, IAppSetShareDialogOpenAction>):
    types.IShareDialogDispatchProps => {
    return {
        setDialogOpen: (shouldDisplay: boolean) => dispatch(setAppShareDialogOpen(shouldDisplay)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(ResourceToolBar)));
