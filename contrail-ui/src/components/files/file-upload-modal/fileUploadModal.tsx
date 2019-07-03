import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React, { Component } from "react";
import styles from "../fileStyles";
import { throwStatement } from "@babel/types";

class FileUploadModal extends Component<any, any> {
    public state = {
        files: [],
    };

    public handleFileUpload = (e: any) => {
        console.log(e.target.files);
        const newFiles = e.target.files
        this.setState({
            files: newFiles
        })
    }
    public render() {
        const { classes } = this.props;
        const { files } = this.state; 

        console.log(this)
        return (
        <div>
            <Dialog open={true} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="lg">
                <DialogTitle id="form-dialog-title">Upload Files</DialogTitle>
                <DialogContent className={classes.dialog}>
                <DialogContentText>
                    Drag files here, or click below!
                </DialogContentText>
                {files && files.map((file: any, i) => <h1 key={i}>{file.name}</h1> )}
                <input
                    accept="image/*"
                    className={classes.input}
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={this.handleFileUpload}
                />
                <label htmlFor="raised-button-file">
                <Button component="span" variant="contained" color="primary" className={classes.button}>
                    <CloudUploadIcon className={classes.uploadIcon} />
                    Upload
                </Button>
                </label> 
                </DialogContent>
                <DialogActions>
                <Button  color="primary">
                    Cancel
                </Button>
                <Button  color="primary">
                    Add
                </Button>
                </DialogActions>
            </Dialog>
        </div >
        )
    }
}
export default withStyles(styles)(FileUploadModal);
