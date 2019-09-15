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

export interface ISnackbarOwnProps {
    className?: string;
    message: string | undefined;
    variant: keyof typeof snackbarVariant;
}

export type SnackbarProps = ISnackbarOwnProps;
