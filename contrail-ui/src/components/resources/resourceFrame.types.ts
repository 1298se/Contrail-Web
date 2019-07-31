import { WithStyles } from "@material-ui/core";
import { IUserResources } from "../../types/resource.types";
import styles from "./resourceStyles";

export interface IResourceFrameStateProps {
    isFetchingResources: boolean;
    userResources: IUserResources;
}

export interface IResourceFrameDispatchProps {
    fetchRootResources: () => Promise<any>;
}

export interface IResourceFrameOwnProps extends WithStyles<typeof styles> {

}

export type ResourceFrameProps =
IResourceFrameStateProps &
IResourceFrameDispatchProps &
IResourceFrameOwnProps;
