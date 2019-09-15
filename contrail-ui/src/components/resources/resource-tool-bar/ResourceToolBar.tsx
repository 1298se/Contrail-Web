import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SharedIcon from "@material-ui/icons/FolderShared";
import MoreIcon from "@material-ui/icons/MoreVert";
import RestoreIcon from "@material-ui/icons/Restore";
import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as filesController from "../../../firebase/controllers/filesController";
import { setAppShareDialogOpen } from "../../../store/actions/appUiStateActions";
import { IAppSetShareDialogOpenAction } from "../../../store/actions/appUiStateActions.types";
import { setSelectedResources } from "../../../store/actions/resourceActions";
import { IResourceSetSelected } from "../../../store/actions/resourceActions.types";
import { IAppReduxState } from "../../../store/store.types";
import { IResourceModel } from "../../../types/resource.types";
import withSnackbar from "../../feedback/snackbar-component/SnackbarComponent";
import PermanentDeleteDialog from "../permanent-delete-dialog/PermanentDeleteDialog";
import { ResourcePages } from "../resourceFrame.types";
import TrashDialog from "../trash-dialog/TrashDialog";
import * as types from "./resourceToolBar.type";
import styles from "./toolBarStyles";

class ResourceToolBar extends Component<types.ResourceToolBarProps, types.IResourceToolBarState> {
    public state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        shouldDisplayUnshareTrashDialog: false,
        shouldDisplayPermanentDeleteDialog: false,
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

    public handleDownloadClick = async () => {
        this.handleMobileMenuClose();

        const { selectedResources } = this.props;
        try {
            if (selectedResources.length === 1) {
                await filesController.downloadResource(selectedResources[0]);
            } else if (selectedResources.length > 1) {
                await filesController.downloadMultipleResources(selectedResources);
            }
        } catch (error) {
            this.props.setSnackbarDisplay("error", error);
        }
    }

    public handleFavouriteClick = async () => {
        const { selectedResources, userResources } = this.props;
        this.handleMobileMenuClose();

        const isAllFavourited = !(selectedResources.some((selectRes) =>
            !userResources.favourites.includes(selectRes.generation)));
        let response;
        try {
            if (isAllFavourited) {
                response =
                    await filesController.removeResourcesFromFavourites(selectedResources.map((res) => res.generation));
            } else {
                response =
                    await filesController.addResourcesToFavourites(selectedResources.map((res) => res.generation));
            }
            this.props.setSnackbarDisplay("success", response);
        } catch (error) {
            this.props.setSnackbarDisplay("error", error);
        }

    }

    public handleShareClick = () => {
        this.handleMobileMenuClose();
        this.props.setDialogOpen(true);
    }

    public handleTrashClick = () => {
        const { selectedResources, userResources } = this.props;
        this.handleMobileMenuClose();

        const isSharedResource = selectedResources.some((res) => userResources.sharedBy.includes(res.generation));

        if (isSharedResource) {
            this.setState({
                ...this.state,
                shouldDisplayUnshareTrashDialog: true,
            });
        } else {
            filesController.addResourcesToTrash(selectedResources, false)
                .then((response) => {
                    this.props.setSnackbarDisplay("success", response);
                    this.props.setSelected([]);
                }).catch((error) => {
                    this.props.setSnackbarDisplay("error", error);
                });
        }
    }

    public handleTrashDialogClose = (shouldClearSelected: boolean) => {
        this.setState({
            ...this.state,
            shouldDisplayUnshareTrashDialog: false,
        });

        if (shouldClearSelected) {
            this.props.setSelected([]);
        }
    }

    public handleRestoreClick = () => {
        const { selectedResources } = this.props;
        this.handleMobileMenuClose();

        filesController.restoreResourceFromTrash(selectedResources.map((res) => res.generation))
            .then((response) => {
                this.props.setSnackbarDisplay("success", response);
                this.props.setSelected([]);
            })
            .catch((error) => {
                this.props.setSnackbarDisplay("error", error);
            });
    }

    public handlePermanentDeleteClick = () => {
        this.handleMobileMenuClose();

        this.setState({
            shouldDisplayPermanentDeleteDialog: true,
        });
    }

    public handlePermanentDeleteDialogClose = (shouldClearSelected: boolean) => {
        this.setState({
            shouldDisplayPermanentDeleteDialog: false,
        });

        if (shouldClearSelected) {
            this.props.setSelected([]);
        }
    }

    public render() {
        const isItemSelected = this.props.selectedResources.length !== 0;
        const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);

        const { classes } = this.props;
        const resourceMobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted={true}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem disabled={!isItemSelected} onClick={this.handleDownloadClick}>
                    <IconButton color="default">
                        <CloudDownloadIcon />
                    </IconButton>
                    <p>Download</p>
                </MenuItem>
                <MenuItem disabled={!isItemSelected} onClick={this.handleFavouriteClick}>
                    <IconButton color="default">
                        <FavoriteIcon />
                    </IconButton>
                    <p>Favourite</p>
                </MenuItem>
                <MenuItem disabled={!isItemSelected} onClick={this.handleShareClick}>
                    <IconButton color="default">
                        <SharedIcon />
                    </IconButton>
                    <p>Share</p>
                </MenuItem>
                <MenuItem disabled={!isItemSelected} onClick={this.handleTrashClick}>
                    <IconButton color="default">
                        <DeleteIcon />
                    </IconButton>
                    <p>Trash</p>
                </MenuItem>
            </Menu>
        );

        const trashMobileMenu = (
            <Menu
                anchorEl={this.state.mobileMoreAnchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted={true}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem disabled={!isItemSelected} onClick={this.handleRestoreClick}>
                    <IconButton color="default">
                        <RestoreIcon />
                    </IconButton>
                    <p>Restore</p>
                </MenuItem>
                <MenuItem disabled={!isItemSelected} onClick={this.handlePermanentDeleteClick}>
                    <IconButton color="default">
                        <DeleteForeverIcon />
                    </IconButton>
                    <p>Delete Forever</p>
                </MenuItem>
            </Menu>
        );

        const resourceToolbarItems = (
            <React.Fragment>
                <Tooltip title="Download">
                    <IconButton
                        color="default"
                        disabled={!isItemSelected}
                        onClick={this.handleDownloadClick}
                    >
                        <CloudDownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Favorite">
                    <IconButton
                        color="default"
                        disabled={!isItemSelected}
                        onClick={this.handleFavouriteClick}
                    >
                        <FavoriteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                    <IconButton
                        color="default"
                        disabled={!isItemSelected}
                        onClick={this.handleShareClick}
                    >
                        <SharedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        edge="end"
                        color="default"
                        disabled={!isItemSelected}
                        onClick={this.handleTrashClick}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );

        const trashToolbarItems = (
            <React.Fragment>
                <Tooltip title="Restore">
                    <IconButton
                        color="default"
                        disabled={!isItemSelected}
                        onClick={this.handleRestoreClick}
                    >
                        <RestoreIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete forever">
                    <IconButton
                        color="default"
                        disabled={!isItemSelected}
                        onClick={this.handlePermanentDeleteClick}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );

        return (
            <div className={classes.grow}>
                <PermanentDeleteDialog
                    selectedResources={this.props.selectedResources}
                    shouldDisplayDialog={this.state.shouldDisplayPermanentDeleteDialog}
                    handleDialogClose={this.handlePermanentDeleteDialogClose}
                />
                <TrashDialog
                    selectedResources={this.props.selectedResources}
                    shouldDisplayDialog={this.state.shouldDisplayUnshareTrashDialog}
                    handleDialogClose={this.handleTrashDialogClose}
                />
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
                {this.props.titleText === ResourcePages.TRASH ? trashMobileMenu : resourceMobileMenu}
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

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, IAppSetShareDialogOpenAction | IResourceSetSelected>):
    types.IShareDialogDispatchProps => {
    return {
        setDialogOpen: (shouldDisplay: boolean) => dispatch(setAppShareDialogOpen(shouldDisplay)),
        setSelected: (resources: IResourceModel[]) => dispatch(setSelectedResources(resources)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(ResourceToolBar)));
