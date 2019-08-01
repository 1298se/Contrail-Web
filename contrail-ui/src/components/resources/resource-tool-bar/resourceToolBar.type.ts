import { WithStyles } from "@material-ui/core";
import styles from "./toolBarStyles";

export interface IResourceToolBarState {
    anchorEl: HTMLElement | null;
    mobileMoreAnchorEl: HTMLElement | null;
}

export interface IResourceToolBarOwnProps extends WithStyles<typeof styles> {

}

export type ResourceToolBarProps = IResourceToolBarOwnProps;