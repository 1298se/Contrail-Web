import { WithStyles } from "@material-ui/core";
import styles from "./appBarStyles";

export interface IMainAppBarState {
    anchorEl: HTMLElement | null;
}

export interface IMainAppBarOwnProps extends WithStyles<typeof styles> {

}

export type IMainAppBarProps = IMainAppBarOwnProps;
