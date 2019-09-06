import { WithStyles } from "@material-ui/core";
import { IResourceModel } from "../../../types/resource.types";
import { ISnackbarInjectProps } from "../../feedback/snackbar-component/snackbarComponent.types";
import styles from "./shareDialogStyles";

export interface IShareDialogState {
    search: ISearchValues;
    shares: IShareValue[];
}

export interface ISearchValues {
    input: string;
    timeout: NodeJS.Timeout | null;
    suggestions: IUserSuggestion[];
    selected: IUserSuggestion[];
}

export interface IUserSuggestion {
    displayName: string;
    email: string;
    id: string;
}

export interface IShareValue {
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
