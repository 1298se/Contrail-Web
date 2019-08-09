import { WithStyles } from "@material-ui/styles";
import styles from "./mainViewStyles";

export interface IMainViewOwnProps extends WithStyles<typeof styles> {
    isDrawerOpen: boolean;
}

export type MainViewProps = IMainViewOwnProps;
