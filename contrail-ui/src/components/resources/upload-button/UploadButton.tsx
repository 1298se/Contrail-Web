import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setAppUploadDialogOpen } from "../../../store/actions/appUiStateActions";
import { IAppSetUploadDialogOpenAction } from "../../../store/actions/appUiStateActions.types";
import * as types from "./uploadButton.types";
import useStyles from "./uploadButtonStyles";

const UploadButton = (props: types.UploadButtonProps) => {
    const classes = useStyles();

    const handleClick = () => {
        props.setUploadDialogOpen(true);
    };

    return (
        <Button
            className={classes.uploadButton}
            variant="contained"
            color="primary"
            size="large"
            onClick={handleClick}
        >
            <CloudUploadIcon className={classes.uploadIcon} />
            Upload
        </Button>
    );
};

const mapDispatchToProps = (dispatch: Dispatch<IAppSetUploadDialogOpenAction>): types.IUploadButtonDispatchProps => {
    return {
        setUploadDialogOpen: (shouldDisplayDialog: boolean) => dispatch(setAppUploadDialogOpen(shouldDisplayDialog)),
    };
};

export default connect(null, mapDispatchToProps)(UploadButton);
