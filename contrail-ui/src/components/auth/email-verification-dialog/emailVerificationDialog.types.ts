export interface IEmailVerificationDialogOwnProps {
    shouldDisplayDialog: boolean;
    setSnackbarError: (error: string) => void;
    handleDialogClose: () => void;
}

export type EmailVerificationDialogProps = IEmailVerificationDialogOwnProps;
