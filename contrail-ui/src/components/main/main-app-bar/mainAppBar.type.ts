import { WithStyles } from "@material-ui/core";
import { ISnackbarInjectProps } from "../../feedback/snackbar-component/snackbarComponent.types";
import styles from "./appBarStyles";

export interface IMainAppBarState {
    anchorEl: HTMLElement | null;
}

export interface IMainAppBarOwnProps extends WithStyles<typeof styles>,
    ISnackbarInjectProps {
    toggleDrawerOpen: () => void;
    isDrawerOpen: boolean;
}

export type MainAppBarProps = IMainAppBarOwnProps;
