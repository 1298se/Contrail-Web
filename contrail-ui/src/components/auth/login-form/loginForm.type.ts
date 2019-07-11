import { WithStyles } from "@material-ui/core";
import styles from "../authStyles";

export interface ILoginFormState {
    values: IFormValues;
    errors: IFormErrors;
    isFormValid: boolean;
}

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

export interface ILoginFormOwnProps extends WithStyles<typeof styles> {
    history?: any;
    authToken?: string;
}

export interface ILoginFormDispatchProps {
    loginUser: (email: string, password: string) => void;
}

export type ILoginFormProps = ILoginFormOwnProps & ILoginFormDispatchProps;
