import { WithStyles } from "@material-ui/core";
import { ISnackbarDisplay } from "../../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";
import styles from "./uploadDialogStyles";

export interface IUploadDialogState {
    files: File[];
    uploadProgress: Map<string, number>;
    uploadState: Map<string, string>;
    snackbarDisplay: ISnackbarDisplay;
}

export interface IUploadDialogStateProps {
    dialogOpen: boolean;
    user: firebase.User | null;
}

export interface IUploadDialogDispatchProps {
    setDialogOpen: (shouldDisplay: boolean) => void;
}

export interface IUploadDialogOwnProps extends WithStyles<typeof styles> {
}

export type IUploadDialogProps = IUploadDialogOwnProps & IUploadDialogStateProps & IUploadDialogDispatchProps;
