import { WithStyles } from "@material-ui/core";
import { ISnackbarDisplay } from "../../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";
import styles from "../authStyles";

export interface IRegisterFormState {
    values: IFormValues;
    formErrors: IFormErrors;
    snackbarDisplay: ISnackbarDisplay;
    isFormValid: boolean;
    isRegisteringUser: boolean;
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
