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

class FileUploadModal extends Component<any, any> {
    public state = {
        files: [],
    };

    public handleFileUpload = (e: any) => {
        const newFiles : any = [...(e.target.files)]
        this.setState({
            files: this.state.files.concat(newFiles)
        })
    }

    public removeFileUpload = (e: any) => {
        console.log(e.target)
    }

    public render() {
        const { classes } = this.props;
        const { files } = this.state;
        const renderUploadFiles = (
            files &&  files.map((file: any, i) => { 
                return (
                    <TableRow
                        key={i}
                        hover={true}
                    >
                        <TableCell key={i} padding="checkbox"> {file.name} </TableCell>
                        <TableCell align="right"> 
                            <CancelIcon data-title={file.name} color="inherit" onClick={this.removeFileUpload}/>
                        </TableCell>
                    </TableRow>
                );
            })
        );

        return (
        <div>
            <Dialog open={true} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="lg">
                <DialogTitle id="form-dialog-title">Upload Files</DialogTitle>
                <DialogContent className={classes.dialog}>
                <DialogContentText>
                    Drag files here, or click below!
                </DialogContentText>
                <Table>
                    {renderUploadFiles}
                </Table>
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
                </DialogContent>
                <DialogActions>
                <Button  color="primary">
                    Cancel
                </Button>
                <Button  color="primary">
                    Upload
                </Button>
                </DialogActions>
            </Dialog>
        </div >
        );
    }
}
export default withStyles(styles)(FileUploadModal);
