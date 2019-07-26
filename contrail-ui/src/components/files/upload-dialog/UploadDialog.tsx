import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import CancelIcon from "@material-ui/icons/Cancel";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import Error from "@material-ui/icons/Error";
import * as firebase from "firebase/app";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as filesController from "../../../firebase/controllers/filesController";
import { uploadDialogCloseAction } from "../../../store/actions/uploadDialogActions";
import * as actions from "../../../store/actions/uploadDialogActions.types";
import { IAppReduxState } from "../../../store/store.types";
import SnackbarContentWrapper from "../../feedback/snackbar-content-wrapper/SnackbarContentWrapper";
import * as types from "./uploadDialog.type";
import styles from "./uploadDialogStyles";

class UploadDialog extends Component<types.IUploadDialogProps, types.IUploadDialogState> {
    public state: types.IUploadDialogState = {
        files: [] as File[],
        uploadProgress: new Map<string, number>(),
        uploadState: new Map<string, string>(),
        snackbarDisplay: {
            snackbarVariant: "error",
            snackbarMessage: null,
            shouldDisplaySnackbar: false,
        },
    };

    public handleFileDrop = (newFiles: File[]) => {
        this.setState((prevState: types.IUploadDialogState) => {
            newFiles.forEach((file) => {
                prevState.uploadProgress.set(file.name, 0);
                prevState.uploadState.set(file.name, "added");
            });
            return {
                files: prevState.files ? prevState.files.concat(newFiles) : newFiles,
                uploadProgress: prevState.uploadProgress,
                uploadState: prevState.uploadState,
            };
        });
    }

    public handleAddFile = (newFileList: FileList | null) => {
        const newFiles = [...newFileList];
        this.setState((prevState) => {
            newFiles.forEach((file) => {
                prevState.uploadProgress.set(file.name, 0);
                prevState.uploadState.set(file.name, "added");
            });
            return {
                files: prevState.files ? prevState.files.concat(newFiles) : newFiles,
                uploadProgress: prevState.uploadProgress,
                uploadState: prevState.uploadState,
            };
        });
    }

    public closeFileUpload = () => {
        this.setState({
            files: [] as File[],
            uploadProgress: new Map<string, number>(),
            uploadState: new Map<string, string>(),
        });
        this.props.uploadDialogClose();
    }

    public onUploadTask =
    (uploadTask: firebase.storage.UploadTask, uid: string, displayName: string | null, filename: string) => {
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState((prevState: types.IUploadDialogState) => ({
                    uploadProgress: prevState.uploadProgress.set(filename, progress),
                    uploadState: prevState.uploadState.set(filename, "uploading"),
                }));
            }, (error) => {
                this.setState((prevState: types.IUploadDialogState) => ({
                    uploadState: prevState.uploadState.set(filename, "error"),
                }));
                this.setSnackbarError(error);
            }, () => {
                filesController.writeFileToDB(uploadTask, uid, displayName)
                .then(() => {
                    this.setState((prevState: types.IUploadDialogState) => ({
                        uploadState: prevState.uploadState.set(filename, "success"),
                    }));
                })
                .catch((error) => {
                    this.setState((prevState: types.IUploadDialogState) => ({
                        uploadState: prevState.uploadState.set(filename, "error"),
                    }));
                    this.setSnackbarError(error);
                });
        });
    }

    public uploadFiles = () => {
        if (this.props.user && this.state.files) {
            const { uid, displayName }  = this.props.user;
            this.state.files.map((file: File) => {
                const filename = file && file.name;
                if (this.state.uploadProgress.get(filename) === 0) {
                    const uploadTask = filesController.uploadFiletoStorage(file, uid);
                    this.onUploadTask(uploadTask, uid, displayName, filename);
                }
            });
        }
    }

    public removeFileUpload = (index: number) => {
        if (this.state.files) {
            const selectedFile = this.state.files[index];
            this.setState((prevState: types.IUploadDialogState) => {
                prevState.uploadProgress.delete(selectedFile.name);
                prevState.uploadState.delete(selectedFile.name);
                return {
                    files: this.state.files.filter((_, i) => i !== index),
                    uploadProgress: prevState.uploadProgress,
                    uploadState: prevState.uploadState,
                };
            });
        }
    }

    public setSnackbarError = (errorMessage: any) => {
        this.setState({
            snackbarDisplay: {
                snackbarVariant: "error",
                snackbarMessage: errorMessage,
                shouldDisplaySnackbar: true,
            },
        });
    }

    // For closing an opened Snackbar. Must be executed first before clearing the snackbar message.
    public handleSnackbarClose = () => {
        this.setState({
            snackbarDisplay: {
                ...this.state.snackbarDisplay,
                shouldDisplaySnackbar: false,
            },
        });
    }

    // Clears the snackbar message.
    public clearSnackbarMessage = () => {
        this.setState({
            snackbarDisplay: {
                ...this.state.snackbarDisplay,
                snackbarMessage: null,
            },
        });
    }

    public render() {
        const { classes, dialogOpen } = this.props;
        const { files, uploadProgress, uploadState } = this.state;
        const { snackbarVariant, snackbarMessage, shouldDisplaySnackbar } = this.state.snackbarDisplay;
        const uploading = [...uploadState.values()].some((value) => value === "uploading");
        const toUpload = [...uploadState.values()].some((value) => value === "added");

        const handleAddEvent = (e: React.ChangeEvent<any>) => this.handleAddFile(e.target.files);

        const renderUploadFiles = (
            files &&  files.map((file: File, i) => {
                const fileName = file.name;
                const fileProgress = uploadProgress.get(fileName);
                const fileState = uploadState.get(fileName);

                const handleCancelClick = (event: React.MouseEvent<unknown>) => {
                    this.removeFileUpload(i);
                };

                const renderCancelButton = (disabled: boolean) => (
                    <Button disableFocusRipple={true} disabled={disabled} onClick={handleCancelClick}>
                        <CancelIcon fontSize="large"/>
                    </Button>
                );

                const renderDoneButton = (
                    <CloudDoneIcon fontSize="large" color="primary" />
                );

                const renderErrorButton = (
                    <Error fontSize="large" color="error" />
                );

                return (
                <div key={i} className={classes.fileContainer}>
                    <div className={classes.fileInfoContainer}>
                        <p> {fileName} </p>
                        <LinearProgress
                            className={classes.progress}
                            variant="determinate"
                            value={fileProgress}
                        />
                    </div>
                    <div className={classes.statusContainer} >
                        {fileState === "added" && renderCancelButton(false)}
                        {fileState === "uploading" && renderCancelButton(true)}
                        {fileState === "success" && renderDoneButton}
                        {fileState === "error" && renderErrorButton}
                    </div>
                </div>
                );
            })
        );

        const renderDropzone = (
            <Dropzone
                onDrop={this.handleFileDrop}
                noClick={true}
            >
            {({getRootProps, getInputProps}) => {
            return (
            <section>
                <div {...getRootProps({className: "dropzone"})}>
                    <input {...getInputProps()} />
                    <DialogContentText>
                        Drag files here, or click below!
                    </DialogContentText>
                    <div className={classes.paper}>
                        {renderUploadFiles}
                    </div>
                </div>
            </section>
            );}}
            </Dropzone>
        );

        return (
        <div>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                open={shouldDisplaySnackbar}
                onClose={this.handleSnackbarClose}
                onExited={this.clearSnackbarMessage}
            >
                <SnackbarContentWrapper
                    message={String(snackbarMessage)}
                    variant={snackbarVariant}
                    onClose={this.handleSnackbarClose}
                />
            </Snackbar>
            <Dialog
                open={dialogOpen}
                onBackdropClick={this.closeFileUpload}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
            >
                <DialogTitle id="form-dialog-title">Upload Files</DialogTitle>
                <DialogContent className={classes.baseDrop}>
                {renderDropzone}
                </DialogContent>
                <DialogActions>
                <input
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple={true}
                    type="file"
                    onChange={handleAddEvent}
                />
                <label htmlFor="raised-button-file">
                <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    disabled={uploading}
                >
                    Add
                </Button>
                </label>
                <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    onClick={this.closeFileUpload}
                    disabled={uploading}
                >
                    Cancel
                </Button>
                <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    onClick={this.uploadFiles}
                    disabled={!toUpload}
                >
                    Upload
                </Button>
                </DialogActions>
            </Dialog>
        </div >
        );
    }
}

const mapStateToProps = (state: IAppReduxState): types.IUploadDialogStateProps => {
    return {
        dialogOpen: state.uploadDialogState.dialogOpen,
        user: state.authState.authUser,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<actions.IUploadDialogCloseAction>): types.IUploadDialogDispatchProps => {
    return {
        uploadDialogClose: () => dispatch(uploadDialogCloseAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UploadDialog));
