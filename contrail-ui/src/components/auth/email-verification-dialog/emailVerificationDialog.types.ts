export interface IEmailVerificationDialogOwnProps {
    setSnackbarError: (error: string) => void;
    shouldDisplayDialog: boolean;
}

export type EmailVerificationDialogProps = IEmailVerificationDialogOwnProps;
