import { snackbarVariant } from "../snackbar-content-wrapper/snackbarContentWrapper.types";

export interface ISnackbarInjectProps {
    setSnackbarDisplay: (variant: keyof typeof snackbarVariant, message: any) => void;
}

export interface IWithSnackbarState {
    snackbarVariant: keyof typeof snackbarVariant;
    snackbarMessage: string | null;
    shouldDisplaySnackbar: boolean;
}
