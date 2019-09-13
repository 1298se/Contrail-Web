import { withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import Downshift from "downshift";
import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as filesController from "../../../firebase/controllers/filesController";
import { searchUsers } from "../../../firebase/controllers/searchController";
import * as shareController from "../../../firebase/controllers/shareController";
import { setAppShareDialogOpen } from "../../../store/actions/appUiStateActions";
import { IAppSetShareDialogOpenAction } from "../../../store/actions/appUiStateActions.types";
import { IAppReduxState } from "../../../store/store.types";
import { IUnshareModel } from "../../../types/shares.types";
import { IUserModel } from "../../../types/user.types";
import withSnackbar from "../../feedback/snackbar-component/SnackbarComponent";
import * as types from "./shareDialog.types";
import styles from "./shareDialogStyles";

class ShareDialog extends Component<types.IShareDialogProps, types.IShareDialogState> {
    public state: types.IShareDialogState = {
        search: {
            input: "",
            timeout: null,
            suggestions: [] as IUserModel[],
            selected: [] as IUserModel[],
        },
        sharedResources: [] as types.IShareState[],
    };

    public updateCollaborators = () => {
        return shareController.getCollaborators(this.props.selectedResources)
            .then((res) => {
                res = res.filter((resource: types.IShareState) => resource.collaborators.length > 0);
                res.map((resource: types.IShareState) => {
                    resource.open = false;
                    resource.checkedCollaborators = [];
                });
                this.setState({
                    ...this.state,
                    sharedResources: res.length > 0 ? res : [],
                });
            })
            .catch((error) => {
                this.props.setSnackbarDisplay("error", error);
            });
    }

    public componentDidUpdate = (prevProps: types.IShareDialogProps) => {
        if (!prevProps.dialogOpen && this.props.dialogOpen) {
            return this.updateCollaborators();
        }
    }

    public search = () => {
        if (this.props.user && this.state.search.input.length > 2) {
            const user = this.props.user;
            searchUsers(this.state.search.input)
                .then((newOptions) => {
                    this.setState({
                        ...this.state,
                        search: {
                            ...this.state.search,
                            suggestions: this.state.search.input.length > 2 ?
                                newOptions.filter((option: IUserModel) => {
                                    return !(this.state.search.selected.map((sel) => sel.uid).includes(option.uid) ||
                                        option.uid === user.uid);
                                }) : [],
                        },
                    });
                })
                .catch((error) => {
                    this.props.setSnackbarDisplay("error", error);
                });
        }
    }

    public handleShare = () => {
        const selectedUsers = this.state.search.selected;
        return filesController.shareResources(this.props.selectedResources, selectedUsers)
            .then((res) => {
                this.updateCollaborators();
                this.setState({
                    ...this.state,
                    search: {
                        input: "",
                        timeout: null,
                        suggestions: [] as IUserModel[],
                        selected: [] as IUserModel[],
                    },
                });
                this.props.setSnackbarDisplay("success", res);
            })
            .catch((err) => {
                this.props.setSnackbarDisplay("error", err);
            });
    }

    public handleUnshare = (event: React.MouseEvent<unknown>) => {
        const unshareMap = [] as IUnshareModel[];
        const selectedNone = this.state.sharedResources.every((share) => share.checkedCollaborators.length === 0);
        if (selectedNone) {
            this.state.sharedResources.map((resource) => {
                const resModel = this.props.selectedResources.find((res) => res.generation === resource.generation);
                const collaborators = resource.collaborators.map((res) => res.uid);
                if (resModel) {
                    unshareMap.push({
                        resource: resModel,
                        userIds: collaborators,
                    });
                }
            });
        } else {
            this.state.sharedResources.map((resource) => {
                if (resource.checkedCollaborators.length > 0) {
                    const resModel = this.props.selectedResources.find((res) => res.generation === resource.generation);
                    if (resModel) {
                        unshareMap.push({
                            resource: resModel,
                            userIds: resource.checkedCollaborators,
                        });
                    }
                }
            });
        }
        return filesController.unshareResources(unshareMap)
            .then((res) => {
                this.updateCollaborators();
                this.props.setSnackbarDisplay("success", res);
            })
            .catch((err) => {
                this.props.setSnackbarDisplay("error", err);
            });
    }

    public handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (this.state.search.timeout) {
            clearTimeout(this.state.search.timeout);
        }
        this.setState((prevState) => {
            const prevInput = prevState.search.input;
            return {
                ...prevState,
                search: {
                    ...prevState.search,
                    input: event.target.value,
                    timeout: setTimeout(() => {
                        this.search();
                    }, 250),
                    suggestions: prevInput.length > 2 ? prevState.search.suggestions : [],
                },
            };
        });
    }

    public handleChange = (item: IUserModel) => {
        let selectedItems = [...this.state.search.selected];
        if (selectedItems.indexOf(item) === -1) {
            selectedItems = [...selectedItems, item];
        }
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                input: "",
                suggestions: [] as IUserModel[],
                selected: selectedItems,
            },
        });
    }

    public handleRemoveInvite = (item: IUserModel) => () => {
        const selectedItems = [...this.state.search.selected];
        selectedItems.splice(selectedItems.indexOf(item), 1);
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                input: "",
                suggestions: [] as IUserModel[],
                selected: selectedItems,
            },
        });
    }

    public handleCancel = () => {
        this.setState({
            search: {
                ...this.state.search,
                input: "",
                suggestions: [] as IUserModel[],
                selected: [],
            },
            sharedResources: [],
        });
        this.props.setDialogOpen(false);
    }

    public handleOpenShareList = (i: number) => {
        this.setState((prevState) => {
            prevState.sharedResources[i].open = !prevState.sharedResources[i].open;
            return {
                ...this.state,
                sharshareResourceses: prevState.sharedResources,
            };
        });
    }

    public handleUnshareClick = (resource: number, uid: string) => {
        this.setState((prevState: types.IShareDialogState) => {
            if (prevState.sharedResources[resource].checkedCollaborators &&
                prevState.sharedResources[resource].checkedCollaborators.indexOf(uid) !== -1) {
                const index = prevState.sharedResources[resource].checkedCollaborators.indexOf(uid);
                prevState.sharedResources[resource].checkedCollaborators.splice(index, 1);
            } else {
                prevState.sharedResources[resource].checkedCollaborators.push(uid);
            }
            return {
                ...this.state,
                shareResources: prevState.sharedResources,
            };
        });
    }

    public render() {
        const { classes, dialogOpen } = this.props;
        const { input, suggestions, selected } = this.state.search;
        const shareResources = this.state.sharedResources;
        // tslint:disable: jsx-wrap-multiline
        // tslint:disable: jsx-no-multiline-js
        interface IRenderSuggestionProps {
            highlightedIndex: number | null;
            index: number;
            itemProps: MenuItemProps<"div", { button?: never }>;
            suggestion: IUserModel;
        }

        const renderSuggestion = (suggestionProps: IRenderSuggestionProps) => {
            const { suggestion, index, itemProps, highlightedIndex } = suggestionProps;
            const isHighlighted = highlightedIndex === index;
            return (
                <MenuItem
                    {...itemProps}
                    key={suggestion.uid}
                    selected={isHighlighted}
                    component="div"
                >
                    <Typography component={"span"} className={classes.search}>
                        <Box fontSize="fontSize" fontWeight="fontWeightBold" m={1}>
                            {suggestion.displayName}
                        </Box>
                        <Box fontSize="fontSize" m={1} fontStyle="oblique">
                            {suggestion.email}
                        </Box>
                    </Typography>
                </MenuItem>
            );
        };

        type RenderInputProps = TextFieldProps & {
            ref?: React.Ref<HTMLDivElement>;
        };

        function renderInput(inputProps: RenderInputProps) {
            const { InputProps, ref, ...other } = inputProps;

            return (
                <TextField
                    InputProps={{
                        inputRef: ref,
                        classes: {
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        },
                        ...InputProps,
                    }}
                    {...other}
                />
            );
        }

        const renderSearchInput = (
            <Downshift
                inputValue={input}
                selectedItem={selected}
                onChange={this.handleChange}
            >
                {({
                    getInputProps,
                    getItemProps,
                    highlightedIndex,
                }) => {
                    const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                        placeholder: "Enter names or email addresses",
                    });
                    return (
                        <div className={classes.container}>
                            <Typography variant="overline" noWrap={true}>
                                Invite Collaborators
                            </Typography>
                            {renderInput({
                                fullWidth: true,
                                InputProps: {
                                    startAdornment: selected.map((item, index) => (
                                        <Chip
                                            className={classes.chip}
                                            color="primary"
                                            key={index}
                                            label={item.email}
                                            onDelete={this.handleRemoveInvite(item)}
                                        />
                                    )),
                                    onBlur,
                                    onChange: this.handleInputChange,
                                    onFocus,
                                },
                                inputProps,
                            })}
                            <Paper className={classes.paper}>
                                {suggestions.map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion }),
                                        highlightedIndex,
                                    }),
                                )}
                            </Paper>
                        </div>
                    );
                }}
            </Downshift>
        );

        const renderCollaborators = (
            shareResources && shareResources.map((resource: types.IShareState, i) => {
                const handleOpenClick = (event: React.MouseEvent<unknown>) => {
                    this.handleOpenShareList(i);
                };
                const renderShares = (
                    resource.collaborators.map((collab, index) => {
                        const handleUnshareToggle = (value: number) => () => {
                            this.handleUnshareClick(i, collab.uid);
                        };
                        return (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={collab.displayName}
                                    secondary={collab.email}
                                />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        color="default"
                                        checked={resource.checkedCollaborators.indexOf(collab.uid) !== -1}
                                        onChange={handleUnshareToggle(index)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })
                );

                return (
                    <React.Fragment key={i}>
                        <ListItem button={true} onClick={handleOpenClick}>
                            <ListItemText primary={resource.name} />
                            {resource.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={resource.open} timeout="auto" unmountOnExit={false}>
                            <List component="div" disablePadding={true}>
                                {renderShares}
                            </List>
                        </Collapse>
                    </React.Fragment>
                );
            })
        );

        const renderCollaboratorsWrapper = (
            <div className={classes.collaboratorsWrapper}>
                <Typography variant="overline" noWrap={true}>
                    Collaborators
                    </Typography>
                <List disablePadding={true} className={classes.collaborators}>
                    {renderCollaborators}
                </List>
                <Button
                    className={classes.unshareButton}
                    component="span"
                    variant="contained"
                    color="primary"
                    onClick={this.handleUnshare}
                >
                    {shareResources.every((resource) => resource.checkedCollaborators.length === 0) ?
                        "Unshare all" : "Unshare selected"}
                </Button>
            </div>
        );

        return (
            <div>
                <Dialog
                    classes={{ paper: classes.dialogPaper }}
                    open={dialogOpen}
                    fullWidth={true}
                >
                    <DialogTitle>Share</DialogTitle>
                    <DialogContent className={classes.dialogPaper}>
                        {shareResources.length > 0 && renderCollaboratorsWrapper}
                        {renderSearchInput}
                    </DialogContent>
                    <DialogActions>
                        <Button
                            component="span"
                            variant="contained"
                            color="primary"
                            onClick={this.handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={selected.length === 0}
                            component="span"
                            variant="contained"
                            color="primary"
                            onClick={this.handleShare}
                        >
                            Share
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppReduxState): types.IShareDialogStateProps => {
    return {
        dialogOpen: state.appUiState.dialogState.shareDialogOpen,
        user: state.authState.authUser,
        authToken: state.authState.authToken,
        selectedResources: state.resourceState.selectedResources,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, IAppSetShareDialogOpenAction>):
    types.IShareDialogDispatchProps => {
    return {
        setDialogOpen: (shouldDisplay: boolean) => dispatch(setAppShareDialogOpen(shouldDisplay)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(ShareDialog)));
