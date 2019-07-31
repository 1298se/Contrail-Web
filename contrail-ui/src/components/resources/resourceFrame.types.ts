import { WithStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import { IUserResources } from "../../types/resource.types";
import { ISnackbarDisplay } from "../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";
import styles from "./resourceStyles";

enum ResourceRoutes {
    files, favourites, shared, trash,
}

interface IMatchParams {
    route: keyof typeof ResourceRoutes;
}

export interface IResourceFrameStateProps {
    isFetchingResources: boolean;
    userResources: IUserResources;
}

export interface IResourceFrameDispatchProps {
    fetchRootResources: () => Promise<any>;
}

export interface IResourceFrameOwnProps extends WithStyles<typeof styles>, RouteComponentProps<IMatchParams> {

}

export interface IResourceFrameState {
    snackbarDisplay: ISnackbarDisplay;
}

export type ResourceFrameProps =
IResourceFrameStateProps &
IResourceFrameDispatchProps &
IResourceFrameOwnProps;
