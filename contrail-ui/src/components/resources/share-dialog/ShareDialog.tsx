import { withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Downshift from "downshift";
import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { searchUsers } from "../../../firebase/controllers/searchController";
import { setAppShareDialogOpen } from "../../../store/actions/appUiStateActions";
import { IAppSetShareDialogOpenAction } from "../../../store/actions/appUiStateActions.types";
import { IAppReduxState } from "../../../store/store.types";
import withSnackbar from "../../feedback/snackbar-component/SnackbarComponent";
import * as types from "./shareDialog.types";
import styles from "./shareDialogStyles";

class ShareDialog extends Component<types.IShareDialogProps, types.IShareDialogState> {
    public state: types.IShareDialogState = {
        search: {
            input: "",
            timeout: null,
            suggestions: [] as types.ISuggestion[],
            selected: [],
        },
    };

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
                                newOptions.filter((option: types.ISuggestion) => {
                                    return !(this.state.search.selected.includes(option.email) ||
                                        option.email === user.email);
                                }) : [],
                        },
                    });
                })
                .catch((error) => {
                    this.props.setSnackbarDisplay("error", error.message);
                });
        }
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

    public handleChange = (item: string) => {
        let selectedItems = [...this.state.search.selected];
        if (selectedItems.indexOf(item) === -1) {
            selectedItems = [...selectedItems, item];
        }
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                input: "",
                suggestions: [] as types.ISuggestion[],
                selected: selectedItems,
            },
        });
    }

    public handleDelete = (item: string) => () => {
        const selectedItems = [...this.state.search.selected];
        selectedItems.splice(selectedItems.indexOf(item), 1);
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                input: "",
                suggestions: [] as types.ISuggestion[],
                selected: selectedItems,
            },
        });
    }

    public handleCancel = () => {
        this.setState({
            ...this.state,
            search: {
                ...this.state.search,
                input: "",
                suggestions: [] as types.ISuggestion[],
                selected: [],
            },
        });
        this.props.setDialogOpen(false);
    }

    public handleSubmit = () => {
        // TODO: Fill function to share the resource to the selected users.
        const selected = this.state.search.selected;
        console.log(selected);
    }

    public render() {
        const { classes, dialogOpen } = this.props;
        const { input, suggestions, selected } = this.state.search;
        // tslint:disable: jsx-wrap-multiline
        // tslint:disable: jsx-no-multiline-js

        interface IRenderSuggestionProps {
            highlightedIndex: number | null;
            index: number;
            itemProps: MenuItemProps<"div", { button?: never }>;
            suggestion: types.ISuggestion;
        }

        const renderSuggestion = (suggestionProps: IRenderSuggestionProps) => {
            const { suggestion, index, itemProps, highlightedIndex } = suggestionProps;
            const isHighlighted = highlightedIndex === index;

            return (
                <MenuItem
                    {...itemProps}
                    key={suggestion.email}
                    selected={isHighlighted}
                    component="div"
                >
                    <Typography component={"span"}>
                        <Box fontWeight="fontWeightBold" m={1}>
                            {suggestion.displayName}
                        </Box>
                        <Box m={1} fontStyle="oblique">
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
                    inputValue: inputValue2,
                    selectedItem: selectedItem2,
                    highlightedIndex,
                }) => {
                    const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                        placeholder: "Enter names or email addresses",
                    });
                    return (
                        <div>
                            {renderInput({
                                fullWidth: true,
                                InputProps: {
                                    startAdornment: selected.map((item, index) => (
                                        <Chip
                                            className={classes.chip}
                                            color="primary"
                                            key={index}
                                            label={item}
                                            onDelete={this.handleDelete(item)}
                                        />
                                    )),
                                    onBlur,
                                    onChange: this.handleInputChange,
                                    onFocus,
                                },
                                inputProps,
                            })}
                            <Paper>
                                {suggestions.map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion.email }),
                                        highlightedIndex,
                                    }),
                                )}
                            </Paper>
                        </div>
                    );
                }}
            </Downshift>
        );

        return (
            <div>
                <Dialog
                    open={dialogOpen}
                    aria-labelledby="form-dialog-title"
                    fullWidth={true}
                >
                    <DialogTitle id="form-dialog-title">Share</DialogTitle>
                    <DialogContent>
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
                            component="span"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                            Share
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}

const mapStateToProps = (state: IAppReduxState): types.IShareDialogStateProps => {
    return {
        dialogOpen: state.appUiState.dialogState.shareDialogOpen,
        user: state.authState.authUser,
        authToken: state.authState.authToken,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, IAppSetShareDialogOpenAction>):
    types.IShareDialogDispatchProps => {
    return {
        setDialogOpen: (shouldDisplay: boolean) => dispatch(setAppShareDialogOpen(shouldDisplay)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(ShareDialog)));
