import { WithStyles } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField/TextField";
import { ISnackbarDisplay } from "../../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";
import styles from "./shareDialogStyles";

export interface IShareDialogState {
    search: ISearchValues;
    snackbarDisplay: ISnackbarDisplay;
}

export interface ISearchValues {
    input: string;
    timeout: NodeJS.Timeout | null;
    suggestions: ISuggestion[];
    selected: string[];
}

export interface ISuggestion {
    displayName: string;
    email: string;
}

export interface IShareDialogStateProps {
    dialogOpen: boolean;
    user: firebase.User | null;
    authToken: string | null;
}

export interface IShareDialogDispatchProps {
    setDialogOpen: (shouldDisplay: boolean) => void;
}

export interface IShareDialogOwnProps extends WithStyles<typeof styles> {
}

export type IShareDialogProps = IShareDialogOwnProps & IShareDialogStateProps & IShareDialogDispatchProps;