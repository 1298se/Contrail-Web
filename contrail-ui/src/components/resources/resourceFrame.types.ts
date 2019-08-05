import { WithStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import { IUserResources } from "../../types/resource.types";
import { ISnackbarInjectProps } from "../feedback/snackbar-component/snackbarComponent.types";
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
    setResourceListener: () => Promise<any>;
}

export interface IResourceFrameOwnProps extends WithStyles<typeof styles>,
    RouteComponentProps<IMatchParams>,
    ISnackbarInjectProps {
}

export type ResourceFrameProps =
    IResourceFrameStateProps &
    IResourceFrameDispatchProps &
    IResourceFrameOwnProps;
