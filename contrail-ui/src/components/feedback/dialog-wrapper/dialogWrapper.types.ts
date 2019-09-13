import { WithStyles } from "@material-ui/core";
import styles from "./dialogWrapperStyles";

export interface IDialogWrapperOwnProps {
    title: string | null;
    isOpen: boolean;
    contentText?: string | null;
    shouldDisplayLoading?: boolean;
    actionPrimary?: React.ReactNode;
    actionSecondary?: React.ReactNode;
    actionTertiary?: React.ReactNode;
}

export type DialogWrapperProps = IDialogWrapperOwnProps;
