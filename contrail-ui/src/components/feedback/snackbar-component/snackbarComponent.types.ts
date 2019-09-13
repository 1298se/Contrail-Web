import { snackbarVariant } from "../snackbar-content-wrapper/snackbarContentWrapper.types";

export interface ISnackbarInjectProps {
    setSnackbarDisplay: (variant: keyof typeof snackbarVariant, message: any) => void;
}

export interface IWithSnackbarState {
    shouldDisplaySnackbar: boolean;
    currentMessage: ISnackbarMessage | null;
}

export interface ISnackbarMessage {
    snackbarVariant: keyof typeof snackbarVariant;
    snackbarMessage: string | null;
}
