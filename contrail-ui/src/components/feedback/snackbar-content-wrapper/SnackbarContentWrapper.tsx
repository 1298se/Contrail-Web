import Button from "@material-ui/core/Button";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import React from "react";
import * as types from "./snackbarContentWrapper.types";
import useStyles from "./snackbarContentWrapperStyles";

/**
 * A wrapper for creating Snackbars with different types. Currently supports "success, warning, error, info."
 */
function SnackbarContentWrapper(props: types.SnackbarProps) {
    const classes = useStyles();
    const { message, onClose, variant } = props;
    const Icon = types.variant[variant];

    const renderMessage = (
        <div className={classes.message}>
        <Icon className={classes.icon} />
            {message}
        </div>
    );

    const renderActionClose = (
        <Button key="close" color="secondary" onClick={onClose} size="small">
            Dismiss
        </Button>
    );

    return (
        <div className={classes.root}>
            <SnackbarContent
                className={classes[variant]}
                message={renderMessage}
                action={[renderActionClose]}
            />
        </div>
    );
}

export default SnackbarContentWrapper;
