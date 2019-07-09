import { WithStyles } from "@material-ui/core";
import styles from "../authStyles";
import { RouteComponentProps } from 'react-router-dom';

export interface IAuthProps extends WithStyles<typeof styles>, RouteComponentProps {
    authToken: string | null;
}
