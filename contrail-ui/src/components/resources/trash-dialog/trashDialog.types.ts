import { IResourceModel } from "../../../types/resource.types";
import { snackbarVariant } from "../../feedback/snackbar-content-wrapper/snackbarContentWrapper.types";

export interface ITrashDialogOwnProps {
    shouldDisplayDialog: boolean;
    setSnackbarDisplay: (variant: keyof typeof snackbarVariant, message: any) => void;
    handleDialogClose: () => void;
    selectedResources: IResourceModel[];
}

export type TrashDialogProps = ITrashDialogOwnProps;
