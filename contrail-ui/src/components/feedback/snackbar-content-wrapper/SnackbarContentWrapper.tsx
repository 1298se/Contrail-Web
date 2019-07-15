import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import * as types from "./snackbarContentWrapper.types";
import useStyles from "./snackbarContentWrapperStyles";

function SnackbarContentWrapper(props: types.ISnackbarProps) {
    const classes = useStyles();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = types.variant[variant];

    const renderMessage = (
        <span className={classes.message}>
            <Icon className={classes.icon} />
            {message}
        </span>
    );

    const renderActionClose = (
        <IconButton color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
        </IconButton>
    );

    return (
        <SnackbarContent
            className={classes[variant]}
            message={renderMessage}
            action={[renderActionClose]}
            {...other}
        />
    );
}

export default SnackbarContentWrapper;
