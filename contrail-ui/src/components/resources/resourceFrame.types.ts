import { WithStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import { IUserResources } from "../../types/resource.types";
import { IRouteMatchParams } from "../../types/routes.types";
import { ISnackbarInjectProps } from "../feedback/snackbar-component/snackbarComponent.types";
import styles from "./resourceStyles";

export interface IResourceFrameStateProps {
    isFetchingResources: boolean;
    userResources: IUserResources;
}

export interface IResourceFrameDispatchProps {
    fetchRootResources: () => Promise<any>;
    setResourceListener: () => Promise<any>;
}

export interface IResourceFrameOwnProps extends
WithStyles<typeof styles>,
RouteComponentProps<IRouteMatchParams>,
ISnackbarInjectProps {
}

export interface IResourceFrameState {
    unsubscribeListener: () => void;
}

export type ResourceFrameProps =
    IResourceFrameStateProps &
    IResourceFrameDispatchProps &
    IResourceFrameOwnProps;
