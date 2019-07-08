import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { Component } from "react";
import styles from "../fileStyles";
import Dropzone from 'react-dropzone';
import * as firebase from "firebase/app";
import * as actions from "../../../store/actions/fileUploadActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import LinearProgress from '@material-ui/core/LinearProgress';

class FileUploadModal extends Component<any, any> {
    public state = {
        files: [],
        uploading: false,
        filesProgess: {},
    };

    public onDrop = (acceptedFiles: any) => {
        this.setState({
            files: this.state.files.concat(acceptedFiles),
        });
    };

    public closeFileUpload = () => {
        this.setState({
            files: []
        })
        this.props.fileUploadClose()
    }

    public handleFileUpload = (e: any) => {
        const newFiles: any = [...(e.target.files)];
        this.setState({
            files: this.state.files.concat(newFiles),
        });
    }

    public uploadFiles = () => {
        if (this.state.files.length != 0) {
            let storageRef = firebase.storage().ref();
            this.state.files.map((file: any) => {
                console.log(file)
                const name = file && file.name
                console.log(name)
                let uploadTask = storageRef.child('vguntam' + '/' + name).put(file);
                console.log(uploadTask)
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function(snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            })
        });
        }
    }

    public removeFileUpload = (e: any) => {
        console.log(e.target)
    }

    public render() {
        const { classes, modalOpen } = this.props;
        const { files, filesProgess } = this.state;

        const renderUploadFiles = (
            files &&  files.map((file: any, i) => {
                return (
                    <TableRow
                        key={i}
                        hover={true}
                    >
                        <TableCell key={i}> {file.name} </TableCell>
                        <TableCell key={i}>
                            <LinearProgress color="primary" variant="determinate" value={100} />
                        </TableCell>
                        <TableCell align="right"> 
                            <CancelIcon data-title={file.name} color="inherit" onClick={this.removeFileUpload}/>
                        </TableCell>
                    </TableRow>
                );
            })
        );

        const renderDropzone = (
            <Dropzone
                onDrop={this.onDrop}
                noClick={true}
            >
            {({getRootProps, getInputProps}) => (
            <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
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
            )}
            </Dropzone>
        );

        return (
        <div>
            <Dialog open={modalOpen} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="lg">
                <DialogTitle id="form-dialog-title">Upload Files</DialogTitle>
                <DialogContent className={classes.dialog}>
                {renderDropzone}
                </DialogContent>
                <DialogActions>
                <input
                    className={classes.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={this.handleFileUpload}
                />
                <label htmlFor="raised-button-file">
                <Button component="span" variant="contained" color="primary" className={classes.button}>
                    Add
                </Button>
                </label>
                <Button component="span" variant="contained" color="primary" className={classes.button} onClick={this.closeFileUpload}>
                    Cancel
                </Button>
                <Button component="span" variant="contained" color="primary" className={classes.button} onClick={this.uploadFiles}>
                    Upload
                </Button>
                </DialogActions>
            </Dialog>
        </div >
        );
    }
}

const mapStateToProps = (state: any): any => {
    return {
        user: state.authState.user,
        modalOpen: state.fileUploadState.modalOpen
    };
};

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthTypes>): any => {
    return {
        fileUploadClose: () => dispatch(actions.fileUploadClose()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FileUploadModal));
