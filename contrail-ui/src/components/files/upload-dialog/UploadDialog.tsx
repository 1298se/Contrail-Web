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
import * as actions from "../../../store/actions/uploadDialogActions";
import styles from "../fileStyles";
import { IUploadDialogProps, IUploadDialogState } from "./uploadDialog.type";

class UploadDialog extends Component<IUploadDialogProps, IUploadDialogState> {
    public state = {
        files: [],
        filesProgess: new Map<string, number>(),
    };

    public handleFileDrop = (newFiles: File[]) => {
        this.setState({
            files: this.state.files.concat(newFiles),
        });
        newFiles.map((file: File) => {
            const name = file && file.name;
            this.setState((prevState: IUploadDialogState) => ({
                filesProgess: {...prevState.filesProgess, [name]: 0},
            }));
        });
    }

    public handleAddFile = (e: React.MouseEvent<HTMLElement>) => {
        const newFiles: File[] = [...e.target.files];
        this.setState({
            files: this.state.files.concat(newFiles),
        });
        newFiles.map((file: File) => {
            const name = file && file.name;
            this.setState((prevState: IUploadDialogState) => ({
                filesProgess: {...prevState.filesProgess, [name]: 0},
            }));
        });
    }

    public closeFileUpload = () => {
        this.setState({
            files: [],
            filesProgess: new Map<string, number>(),
        });
        this.props.uploadDialogClose();
    }

    public uploadFiles = () => {
        const userID = this.props.user;
        if (this.state.files.length !== 0) {
            const storageRef = firebase.storage().ref();
            this.state.files.map((file: File) => {
                const name = file && file.name;
                const uploadTask = storageRef.child(userID + "/" + name).put(file);
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.setState((prevState: IUploadDialogState) => ({
                        filesProgess: {...prevState.filesProgess, [name]: progress},
                    }));
                });
            });
        }
    }

    public removeFileUpload = (fileName: string) => {
        const newFiles = this.state.files.filter((file) => {
            const name = file && fileName;
            return name !== fileName;
        });
        let newfilesProgress: Map<string, number> = Object.assign({}, this.state.filesProgess);
        delete newfilesProgress[fileName];
        this.setState({
            files: newFiles,
        });
    }

    public render() {
        const { classes, dialogOpen } = this.props;
        const { files, filesProgess } = this.state;

        const renderUploadFiles = (
            files &&  files.map((file: File, i) => {
                const fileName: string = file.name;
                const fileProgress: number = filesProgess[fileName];
                return (
                    <TableRow
                        key={i}
                        hover={true}
                    >
                        <TableCell key={i} align="left" className={classes.name}> {fileName} </TableCell>
                        <TableCell key={i} align="center">
                            <LinearProgress
                                className={classes.progress}
                                color="primary"
                                variant="determinate"
                                value={fileProgress}
                            />
                        </TableCell>
                        <TableCell align="right" size="small">
                            {fileProgress === 0 &&
                            <Button onClick={() => this.removeFileUpload(fileName)}> 
                                <CancelIcon color="inherit" />
                            </Button>
                            }
                            {fileProgress === 100 && 
                                <CloudDoneIcon />
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
                    className={classes.input}
                    style={{ display: "none" }}
                    id="raised-button-file"
                    multiple={true}
                    type="file"
                    onChange={this.handleAddFile}
                />
                <label htmlFor="raised-button-file">
                <Button component="span" variant="contained" color="primary" className={classes.button}>
                    Add
                </Button>
                </label>
                <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.closeFileUpload}
                >
                    Cancel
                </Button>
                <Button
                    component="span"
                    variant="contained"
                    color="primary"
                    className={classes.button}
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

const mapStateToProps = (state: IAppReduxState): IUploadDialogProps => {
    return {
        dialogOpen: state.uploadDialogState.dialogOpen,
        user: state.authState.authUser,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<actions.IUploadDialogAction>): IUploadDialogProps => {
    return {
        uploadDialogClose: () => dispatch(actions.uploadDialogClose()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UploadDialog));
