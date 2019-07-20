import { WithStyles } from "@material-ui/core";
import styles from "../authStyles";

export interface ILoginFormState {
    values: IFormValues;
    formErrors: IFormErrors;
    isFormValid: boolean;
    loginRequestError: any;
    shouldDisplayError: boolean;
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
    initiateRedirect: () => void;
}

export type LoginFormProps = ILoginFormOwnProps;
