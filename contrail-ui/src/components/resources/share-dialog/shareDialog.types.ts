import { WithStyles } from "@material-ui/core";
import { IResourceModel } from "../../../types/resource.types";
import { IUserModel } from "../../../types/user.types";
import { ISnackbarInjectProps } from "../../feedback/snackbar-component/snackbarComponent.types";
import styles from "./shareDialogStyles";

export interface IShareDialogState {
    search: ISearchState;
    sharedResources: IShareState[];
}

export interface ISearchState {
    input: string;
    timeout: NodeJS.Timeout | null;
    suggestions: IUserModel[];
    selected: IUserModel[];
}

export interface IShareState {
    name: string;
    collaborators: firebase.User[];
    generation: string;
    open?: boolean;
    checkedCollaborators: string[];
}

export interface IShareDialogStateProps {
    dialogOpen: boolean;
    user: firebase.User | null;
    authToken: string | null;
    selectedResources: IResourceModel[];
}

export interface IShareDialogDispatchProps {
    setDialogOpen: (shouldDisplay: boolean) => void;
}

export interface IShareDialogOwnProps extends WithStyles<typeof styles>, ISnackbarInjectProps {
}

export type IShareDialogProps = IShareDialogOwnProps & IShareDialogStateProps & IShareDialogDispatchProps;
