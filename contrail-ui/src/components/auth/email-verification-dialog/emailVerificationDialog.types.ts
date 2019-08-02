import { snackbarVariant } from "../../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";

export interface IEmailVerificationDialogOwnProps {
    shouldDisplayDialog: boolean;
    setSnackbarDisplay: (variant: keyof typeof snackbarVariant, message: any) => void;
    handleDialogClose: () => void;
}

export type EmailVerificationDialogProps = IEmailVerificationDialogOwnProps;
