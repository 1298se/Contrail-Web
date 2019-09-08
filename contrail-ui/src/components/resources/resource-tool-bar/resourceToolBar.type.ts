import { WithStyles } from "@material-ui/core";
import { IUserResourceModel, IUserResources } from "../../../types/resource.types";
import styles from "./toolBarStyles";
import { ISnackbarInjectProps } from "../../feedback/snackbar-component/snackbarComponent.types";

export interface IResourceToolBarState {
    anchorEl: HTMLElement | null;
    mobileMoreAnchorEl: HTMLElement | null;
}

export interface IResourceToolBarOwnProps extends WithStyles<typeof styles>,
    ISnackbarInjectProps {
    titleText: string;
}

export interface IResourceToolBarStateProps {
    selectedResources: IUserResourceModel[];
    userResources: IUserResources;
}

export type ResourceToolBarProps = IResourceToolBarOwnProps & IResourceToolBarStateProps;
