import { WithStyles } from "@material-ui/core";
import styles from "./mainFrameStyles";

export interface IMainFrameStateProps {
    hasInternetConnection: boolean;
}

export interface IMainFrameOwnProps extends WithStyles<typeof styles> {

}

export interface IMainFrameState {
    isDrawerOpen: boolean;
}

export type MainFrameProps = IMainFrameStateProps & IMainFrameOwnProps;
