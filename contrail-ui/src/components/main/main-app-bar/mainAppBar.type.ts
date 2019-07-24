import { WithStyles } from "@material-ui/core";
import styles from "./appBarStyles";

export interface IMainAppBarState {
    anchorEl: HTMLElement | null;
    logoutRequestError: string | null;
    shouldDisplayError: boolean;
}

export interface IMainAppBarOwnProps extends WithStyles<typeof styles> {

}

export type MainAppBarProps = IMainAppBarOwnProps;
