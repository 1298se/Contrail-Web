import { WithStyles } from "@material-ui/core";
import styles from "./mainStyles";

export interface IMainFrameStateProps {
    hasInternetConnection: boolean;
}

export interface IMainFrameOwnProps extends WithStyles<typeof styles> {

}

export type MainFrameProps = IMainFrameStateProps & IMainFrameOwnProps;
