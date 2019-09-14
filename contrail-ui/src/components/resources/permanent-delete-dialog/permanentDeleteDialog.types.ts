import { IResourceModel } from "../../../types/resource.types";
import { ISnackbarInjectProps } from "../../feedback/snackbar-component/snackbarComponent.types";

export interface IPermanentDeleteDialogOwnProps extends ISnackbarInjectProps {
    selectedResources: IResourceModel[];
    shouldDisplayDialog: boolean;
    handleDialogClose: (shouldClearSelected: boolean) => void;
}

export type PermanentDeleteDialogProps = IPermanentDeleteDialogOwnProps;
