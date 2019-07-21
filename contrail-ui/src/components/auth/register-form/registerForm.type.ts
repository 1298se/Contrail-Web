import { WithStyles } from "@material-ui/core";
import { variant } from "../../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";
import styles from "../authStyles";

export interface IRegisterFormState {
    values: IFormValues;
    errors: IFormErrors;
    snackbarDisplay: ISnackbarDisplay;
    isFormValid: boolean;
}

export interface ISnackbarDisplay {
    snackbarVariant: keyof typeof variant;
    snackbarMessage: string | null;
    shouldDisplaySnackbar: boolean;
}
export interface IFormValues {
    [x: string]: string;
    displayName: string;
    email: string;
    password: string;
}

export interface IFormErrors {
    [x: string]: string;
    displayNameError: string;
    emailError: string;
    passwordError: string;
}
export interface IRegisterFormOwnProps extends WithStyles<typeof styles> {
}

export type RegisterFormProps = IRegisterFormOwnProps;
