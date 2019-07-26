import { WithStyles } from "@material-ui/core";
import styles from "./toolBarStyles";

export interface IMainToolBarState {
    anchorEl: HTMLElement | null;
    mobileMoreAnchorEl: HTMLElement | null;
}

export interface IMainToolBarOwnProps extends WithStyles<typeof styles> {

}

export type MainToolBarProps = IMainToolBarOwnProps;
