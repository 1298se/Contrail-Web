import { WithStyles } from "@material-ui/core";
import styles from "../authStyles";

export interface IRegisterFormState {
    values: IFormValues;
    errors: IFormErrors;
    isFormValid: boolean;
    registerRequestError: any;
    shouldDisplayError: boolean;
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
    initiateRedirect: () => void;
}

export type RegisterFormProps = IRegisterFormOwnProps;
