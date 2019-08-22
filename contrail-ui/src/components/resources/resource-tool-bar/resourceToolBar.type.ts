import { WithStyles } from "@material-ui/core";
import { IResourceModel, IUserResources } from "../../../types/resource.types";
import styles from "./toolBarStyles";

export interface IResourceToolBarState {
    anchorEl: HTMLElement | null;
    mobileMoreAnchorEl: HTMLElement | null;
}

export interface IResourceToolBarOwnProps extends WithStyles<typeof styles> {
    titleText: string;
}

export interface IResourceToolBarStateProps {
    selectedResources: IResourceModel[];
    userResources: IUserResources;
}

export interface IShareDialogDispatchProps {
    setDialogOpen: (shouldDisplay: boolean) => void;
}

export type ResourceToolBarProps = IResourceToolBarOwnProps & IResourceToolBarStateProps & IShareDialogDispatchProps;
