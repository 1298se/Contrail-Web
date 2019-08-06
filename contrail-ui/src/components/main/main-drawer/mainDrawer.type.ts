import { WithStyles } from "@material-ui/core";
import styles from "../mainStyles";

export interface IMainDrawerOwnProps extends
WithStyles<typeof styles> {
}

export type MainDrawerProps = IMainDrawerOwnProps;
