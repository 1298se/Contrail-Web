export interface IUploadButtonDispatchProps {
    setUploadDialogOpen: (shouldDisplayDialog: boolean) => void;
}

export interface IUploadButtonOwnProps {
    isDrawerOpen: boolean;
}

export type UploadButtonProps = IUploadButtonDispatchProps & IUploadButtonOwnProps;
