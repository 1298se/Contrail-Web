import { WithStyles } from "@material-ui/core";
import styles from "./mainDrawerStyles";

export interface IMainDrawerOwnProps extends
WithStyles<typeof styles> {
    toggleDrawerOpen: () => void;
    isDrawerOpen: boolean;
}

export type MainDrawerProps = IMainDrawerOwnProps;
