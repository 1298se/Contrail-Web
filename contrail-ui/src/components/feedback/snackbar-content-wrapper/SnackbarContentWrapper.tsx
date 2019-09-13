import SnackbarContent from "@material-ui/core/SnackbarContent";
import React from "react";
import * as types from "./snackbarContentWrapper.types";
import useStyles from "./snackbarContentWrapperStyles";

/**
 * A wrapper for creating Snackbars with different types. Currently supports "success, warning, error, info."
 */
function SnackbarContentWrapper(props: types.SnackbarProps) {
    const classes = useStyles();
    const { message, variant } = props;
    const Icon = types.snackbarVariant[variant];

    const renderMessage = (
        <div className={classes.message}>
            <Icon className={classes.icon} />
            {message}
        </div>
    );

    return (
        <div className={classes.root}>
            <SnackbarContent
                className={classes[variant]}
                message={renderMessage}
            />
        </div>
    );
}

export default SnackbarContentWrapper;
