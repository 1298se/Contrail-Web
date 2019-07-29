import { WithStyles } from "@material-ui/styles";
import styles from "../mainStyles";

export interface IMainViewOwnProps extends WithStyles<typeof styles> {

}

export type MainViewProps = IMainViewOwnProps;
