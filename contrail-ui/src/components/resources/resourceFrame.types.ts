import { WithStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import { IRouteMatchParams } from "../../types/routes.types";
import { ISnackbarInjectProps } from "../feedback/snackbar-component/snackbarComponent.types";
import styles from "./resourceStyles";

export enum ResourcePages {
    FILES = "Files",
    FAVOURITES = "Favourites",
    SHARED = "Shared",
    TRASH = "Trash",
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
    IResourceFrameDispatchProps &
    IResourceFrameOwnProps;
