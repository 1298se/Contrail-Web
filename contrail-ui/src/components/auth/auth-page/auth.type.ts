import { WithStyles } from "@material-ui/core";
import styles from "../authStyles";

export interface IAuthOwnProps extends WithStyles<typeof styles> {

}

export interface IAuthStateProps {
    authToken: string | null;
    authUser: firebase.User | null;
}

export type AuthProps = IAuthOwnProps & IAuthStateProps;
