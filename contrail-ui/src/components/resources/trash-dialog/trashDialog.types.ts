import { IResourceModel } from "../../../types/resource.types";
import { ISnackbarInjectProps } from "../../feedback/snackbar-component/snackbarComponent.types";
import { snackbarVariant } from "../../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";

export interface ITrashDialogOwnProps extends ISnackbarInjectProps {
    selectedResources: IResourceModel[];
    shouldDisplayDialog: boolean;
    handleDialogClose: (shouldClearSelected: boolean) => void;
}

export type TrashDialogProps = ITrashDialogOwnProps;
