import { WithStyles } from "@material-ui/core";
import styles from "../authStyles";

export interface ILoginFormState {
    values: IFormValues;
    formErrors: IFormErrors;
    isFormValid: boolean;
    shouldDisplayError: boolean;
    loginRequestError: any;
}

export interface IFormValues {
    [x: string]: string;
    email: string;
    password: string;
}

export interface IFormErrors {
    [x: string]: string | null;
    emailError: string | null;
    passwordError: string | null;
}

export interface ILoginFormOwnProps extends WithStyles<typeof styles> {

}

export type ILoginFormProps = ILoginFormOwnProps;
