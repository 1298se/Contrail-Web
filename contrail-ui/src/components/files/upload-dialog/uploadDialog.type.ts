export interface IUploadDialogState {
    files: File[];
    filesProgess: Map<string, number>;
}

export interface IUploadDialogStateProps {
    dialogOpen: boolean;
    user: firebase.User | null;
}

export interface IUploadDialogDispatchProps {
    uploadDialogClose: () => void;
}

export type IUploadDialogProps = IUploadDialogStateProps & IUploadDialogDispatchProps;
