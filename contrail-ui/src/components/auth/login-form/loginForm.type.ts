import { WithStyles } from "@material-ui/core";
import { ISnackbarDisplay } from "../../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";
import styles from "../authStyles";

export interface ILoginFormState {
    values: IFormValues;
    formErrors: IFormErrors;
    snackbarDisplay: ISnackbarDisplay;
    shouldDisplayDialog: boolean;
    isFormValid: boolean;
    isLoggingInUser: boolean;
}

export interface IFormValues {
    [x: string]: string;
    email: string;
    password: string;
}

export interface IFormErrors {
    [x: string]: string;
    emailError: string;
    passwordError: string;
}

export interface ILoginFormOwnProps extends WithStyles<typeof styles> {
}

export type LoginFormProps = ILoginFormOwnProps;
