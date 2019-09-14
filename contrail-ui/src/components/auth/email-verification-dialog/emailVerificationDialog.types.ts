import { ISnackbarInjectProps } from "../../feedback/snackbar-component/snackbarComponent.types";
import { snackbarVariant } from "../../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";

export interface IEmailVerificationDialogOwnProps extends ISnackbarInjectProps {
    shouldDisplayDialog: boolean;
    handleDialogClose: () => void;
}

export type EmailVerificationDialogProps = IEmailVerificationDialogOwnProps;
