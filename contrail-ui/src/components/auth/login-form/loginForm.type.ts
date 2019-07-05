import { WithStyles } from "@material-ui/core";
import styles from "../authStyles";

export interface ILoginFormState {
    email: string;
    password: string;
    [x: string]: string;
}
export interface ILoginFormProps extends WithStyles<typeof styles> {

}
