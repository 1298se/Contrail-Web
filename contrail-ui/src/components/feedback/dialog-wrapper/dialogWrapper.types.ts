import { WithStyles } from "@material-ui/core";
import styles from "./dialogWrapperStyles";

export interface IDialogWrapperOwnProps {
    message: string | null;
    isOpen: boolean;
}

export type DialogWrapperProps = IDialogWrapperOwnProps;
