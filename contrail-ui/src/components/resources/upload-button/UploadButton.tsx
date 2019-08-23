import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setAppUploadDialogOpen } from "../../../store/actions/appUiStateActions";
import { IAppSetUploadDialogOpenAction } from "../../../store/actions/appUiStateActions.types";
import * as types from "./uploadButton.types";
import useStyles from "./uploadButtonStyles";

const UploadButton = (props: types.UploadButtonProps) => {
    const classes = useStyles();
    const isDrawerOpen = props.isDrawerOpen;

    const handleClick = () => {
        props.setUploadDialogOpen(true);
    };

    return (
        <Fab
            variant={isDrawerOpen ? "extended" : "round"}
            color="primary"
            className={clsx({[classes.extendedButton]: isDrawerOpen}, classes.button)}
            onClick={handleClick}
        >
            <CloudUploadIcon className={clsx({[classes.leftIcon]: isDrawerOpen})} />
            {isDrawerOpen ? "Upload" : null}
        </Fab>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<IAppSetUploadDialogOpenAction>): types.IUploadButtonDispatchProps => {
    return {
        setUploadDialogOpen: (shouldDisplayDialog: boolean) => dispatch(setAppUploadDialogOpen(shouldDisplayDialog)),
    };
};

export default connect(null, mapDispatchToProps)(UploadButton);
