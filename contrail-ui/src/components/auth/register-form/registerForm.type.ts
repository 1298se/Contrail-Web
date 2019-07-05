import { WithStyles } from "@material-ui/core";
import styles from "../authStyles";

export interface IRegisterFormState {
    displayName: string;
    email: string;
    password: string;
    [x: string]: string;
}
export interface IRegisterFormProps extends WithStyles<typeof styles> {

}
