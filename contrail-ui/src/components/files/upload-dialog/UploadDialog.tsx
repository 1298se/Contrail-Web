import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import CancelIcon from "@material-ui/icons/Cancel";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import * as firebase from "firebase/app";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { uploadDialogCloseAction } from "../../../store/actions/uploadDialogActions";
import * as actions from "../../../store/actions/uploadDialogActions.types";
import { IAppReduxState } from "../../../store/store.types";
import { IUploadDialogDispatchProps, IUploadDialogProps, IUploadDialogState, IUploadDialogStateProps } from "./uploadDialog.type";
import styles from "./uploadDialogStyles";

class UploadDialog extends Component<IUploadDialogProps, IUploadDialogState> {
    public state = {
        files: [] as File[],
        filesProgess: new Map<string, number>(),
    };

    public handleFileDrop = (newFiles: File[]) => {
        this.setState((prevState) => {
            newFiles.forEach((file) => {
                prevState.filesProgess.set(file.name, 0);
            });
            return {
                files: prevState.files ? prevState.files.concat(newFiles) : newFiles,
                filesProgess: prevState.filesProgess,
            };
        });
    }

    public handleAddFile = (newFileList: FileList | null) => {
        const newFiles = [...newFileList];
        this.setState((prevState) => {
            newFiles.forEach((file) => {
                prevState.filesProgess.set(file.name, 0);
            });
            return {
                files: prevState.files ? prevState.files.concat(newFiles) : newFiles,
                filesProgess: prevState.filesProgess,
            };
        });
    }

    public closeFileUpload = () => {
        this.setState({
            files: [] as File[],
            filesProgess: new Map<string, number>(),
        });
        this.props.uploadDialogClose();
    }

    public uploadFiles = () => {
        if (this.props.user && this.state.files.length) {
            const userID = this.props.user.uid;
            const storageRef = firebase.storage().ref();
            this.state.files.map((file: File) => {
                const name = file && file.name;
                console.log(file)
                if (this.state.filesProgess.get(name) === 0) {
                    const uploadTask = storageRef.child(userID + "/" + name).put(file);
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        this.setState((prevState: IUploadDialogState) => ({
                            filesProgess: prevState.filesProgess.set(name, progress),
                        }));
                    }, (error) => {
                        console.log(error);
                    });
                }
            });
        }
    }

    public removeFileUpload = (index: number) => {
        if (this.state.files) {
            const selectedFile = this.state.files[index];
            this.setState((prevState: IUploadDialogState) => {
                prevState.filesProgess.delete(selectedFile.name);
                return {
                    files:  this.state.files.filter((_, i) => i !== index),
                    filesProgess: prevState.filesProgess,
                };
            });
        }
    }

    public render() {
        const { classes, dialogOpen } = this.props;
        const { files, filesProgess } = this.state;
        console.log(this.state)
        const renderUploadFiles = (
            files &&  files.map((file: File, i) => {
                const fileName = file.name;
                const fileProgress = filesProgess.get(fileName);
                return (
                    <TableRow
                        key={'row' + i}
                        hover={true}
                    >
                        <TableCell align="left" className={classes.name}> {fileName} </TableCell>
                        <TableCell align="center" className={classes.progressContainer}>
                            <LinearProgress
                                className={classes.progress}
                                color="primary"
                                variant="determinate"
                                value={fileProgress}
                            />
                        </TableCell>
                        <TableCell align="right" size="small" className={classes.doneContainer}>
                            {fileProgress === 0 &&
                            <Button onClick={() => this.removeFileUpload(i)}> 
                                <CancelIcon color="inherit" />
                            </Button>
                            }
                            {fileProgress === 100 && 
                                <CloudDoneIcon fontSize="large" color="primary" />
                            }
                        </TableCell>
                    </TableRow>
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
            <section className="container">
                <div {...getRootProps({className: "dropzone"})}>
                    <input {...getInputProps()} />
                <DialogContentText>
                    Drag files here, or click below!
                </DialogContentText>
                    <div className={classes.paper}>
                        <Table>
                            <TableBody>
                                {renderUploadFiles}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </section>
            )}}
            </Dropzone>
        );

        return (
        <div>
            <Dialog
                open={dialogOpen}
                onBackdropClick={this.closeFileUpload}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
                maxWidth="lg">
                <DialogTitle id="form-dialog-title">Upload Files</DialogTitle>
                <DialogContent className={classes.dialog}>
                {renderDropzone}
                </DialogContent>
                <DialogActions>
                <input
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple={true}
                    type="file"
                    onChange={(e) => this.handleAddFile(e.target.files)}
                />
                <label htmlFor="raised-button-file">
                <Button component="span" variant="contained" color="primary">
                    Add
                </Button>
                </label>
                <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    onClick={this.closeFileUpload}
                >
                    Cancel
                </Button>
                <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    onClick={this.uploadFiles}
                >
                    Upload
                </Button>
                </DialogActions>
            </Dialog>
        </div >
        );
    }
}

const mapStateToProps = (state: IAppReduxState): IUploadDialogStateProps => {
    return {
        dialogOpen: state.uploadDialogState.dialogOpen,
        user: state.authState.authUser,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<actions.IUploadDialogCloseAction>): IUploadDialogDispatchProps => {
    return {
        uploadDialogClose: () => dispatch(uploadDialogCloseAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UploadDialog));
