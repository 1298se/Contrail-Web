import { WithStyles } from "@material-ui/core";
import { IResourceModel, IUserResources } from "../../../types/resource.types";
import { ISnackbarInjectProps } from "../../feedback/snackbar-component/snackbarComponent.types";
import styles from "./toolBarStyles";

export interface IResourceToolBarState {
    anchorEl: HTMLElement | null;
    mobileMoreAnchorEl: HTMLElement | null;
    shouldDisplayUnshareTrashDialog: boolean;
    shouldDisplayPermanentDeleteDialog: boolean;
}

export interface IResourceToolBarOwnProps extends WithStyles<typeof styles>,
    ISnackbarInjectProps {
    titleText: string;
}

export interface IResourceToolBarStateProps {
    selectedResources: IResourceModel[];
    userResources: IUserResources;
}

export interface IShareDialogDispatchProps {
    setDialogOpen: (shouldDisplay: boolean) => void;
    setSelected: (resources: IResourceModel[]) => void;
}

export type ResourceToolBarProps = IResourceToolBarOwnProps & IResourceToolBarStateProps & IShareDialogDispatchProps;
