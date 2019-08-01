import { WithStyles } from "@material-ui/core";
import { ISnackbarInjectProps } from "../../feedback/snackbar-component/snackbarComponent.types";
import styles from "./uploadDialogStyles";

export interface IUploadDialogState {
    files: File[];
    uploadProgress: Map<string, number>;
    uploadState: Map<string, string>;
}

export interface IUploadDialogStateProps {
    dialogOpen: boolean;
    user: firebase.User | null;
}

export interface IUploadDialogDispatchProps {
    setDialogOpen: (shouldDisplay: boolean) => void;
}

export interface IUploadDialogOwnProps extends WithStyles<typeof styles>, ISnackbarInjectProps {
}

export type IUploadDialogProps = IUploadDialogOwnProps & IUploadDialogStateProps & IUploadDialogDispatchProps;
