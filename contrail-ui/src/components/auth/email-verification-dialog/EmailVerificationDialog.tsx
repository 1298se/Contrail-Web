import Button from "@material-ui/core/Button";
import React from "react";
import * as auth from "../../../firebase/controllers/authController";
import DialogWrapper from "../../feedback/dialog-wrapper/DialogWrapper";
import { EmailVerificationDialogProps } from "./emailVerificationDialog.types";

const EmailVerificationDialog = (props: EmailVerificationDialogProps) => {

    const notEmailVerifiedMessage = "You have not yet verified your email address.\
    Please verify it to continue logging in.";

    const handleResendClick = () => {
        auth.sendEmailVerification()
        .then(() => {
            handleDismissClick();
        })
        .catch((error) => {
            handleDismissClick();
            props.setSnackbarDisplay("error", error);
        });
    };

    const handleDismissClick = () => {
        auth.logoutUser()
        .then(() => {
            props.handleDialogClose();
        })
        .catch((error) => {
            props.handleDialogClose();
            props.setSnackbarDisplay("error", error);
        });
    };

    const resendAction =
        (
        <Button
            onClick={handleResendClick}
            color="primary"
        >
            Resend Email
        </Button>
        );

    const dismissAction = (
        <Button
            onClick={handleDismissClick}
            color="primary"
        >
            Dismiss
        </Button>
    );

    return (
        <DialogWrapper
            title={"Email Verification Required"}
            contentText={notEmailVerifiedMessage}
            isOpen={props.shouldDisplayDialog}
            actionPrimary={dismissAction}
            actionSecondary={resendAction}
        />
    );
};

export default EmailVerificationDialog;
