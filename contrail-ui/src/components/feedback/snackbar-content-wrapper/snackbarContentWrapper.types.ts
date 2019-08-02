import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";

export const snackbarVariant = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export interface ISnackbarDisplay {
    snackbarVariant: keyof typeof snackbarVariant;
    snackbarMessage: string | null;
    shouldDisplaySnackbar: boolean;
}

export interface ISnackbarOwnProps {
    className?: string;
    message: string | null;
    onClose?: () => void;
    variant: keyof typeof snackbarVariant;
}

export type SnackbarProps = ISnackbarOwnProps;
