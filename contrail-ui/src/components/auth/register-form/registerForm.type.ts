import { WithStyles } from "@material-ui/core";
import styles from "../authStyles";

export interface IFormValues {
    displayName: string;
    email: string;
    password: string;
    [x: string]: string;
}

export interface IFormErrors {
    displayName: string;
    email: string;
    password: string;
    [x: string]: string;
}
export interface IRegisterFormState {
    values: IFormValues;
    errors: IFormErrors;
    isFormValid: boolean;
}
export interface IRegisterFormProps extends WithStyles<typeof styles> {

}
