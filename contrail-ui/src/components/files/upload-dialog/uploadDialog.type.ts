import { WithStyles } from "@material-ui/core";
import styles from "./uploadDialogStyles";

export interface IUploadDialogState {
    files: File[] | null;
    filesProgess: Map<string, number>;
}

export interface IUploadDialogStateProps {
    dialogOpen: boolean;
    user: firebase.User | null;
}

export interface IUploadDialogDispatchProps {
    uploadDialogClose: () => void;
}

export interface IUploadDialogOwnProps extends WithStyles<typeof styles> {
}

export type IUploadDialogProps = IUploadDialogOwnProps & IUploadDialogStateProps & IUploadDialogDispatchProps;
