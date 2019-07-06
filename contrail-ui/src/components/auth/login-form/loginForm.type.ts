import { WithStyles } from "@material-ui/core";
import styles from "../authStyles";

export interface IFormValues {
    email: string;
    password: string;
    [x: string]: string;
}
export interface IFormErrors {
    emailError: string;
    passwordError: string;
    [x: string]: string;
}
export interface ILoginFormState {
    values: IFormValues;
    errors: IFormErrors;
    isFormValid: boolean;
}
export interface ILoginFormProps extends WithStyles<typeof styles> {

}
