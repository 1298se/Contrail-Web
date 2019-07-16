import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import * as types from "./snackbarContentWrapper.types";
import useStyles from "./snackbarContentWrapperStyles";

function SnackbarContentWrapper(props: types.SnackbarProps) {
    const classes = useStyles();
    const { message, onClose, variant } = props;
    const Icon = types.variant[variant];

    const renderMessage = (
        <span className={classes.message}>
            <Icon className={classes.icon} />
            {message}
        </span>
    );

    const renderActionClose = (
        <IconButton key="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
        </IconButton>
    );

    return (
        <SnackbarContent
            className={classes[variant]}
            message={renderMessage}
            action={[renderActionClose]}
        />
    );
}

export default SnackbarContentWrapper;
