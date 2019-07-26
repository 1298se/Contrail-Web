import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center",
            height: "100vh",
            justifyContent: "center",
        },
        largeIcon: {
            height: "40px",
            width: "40px",
        },
        wrapper: {
            position: "relative",
        },
        fabProgress: {
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
        },
    }),
);

export default function CircularIntegration() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="Save"
                    color="secondary"
                >
                    <CloudUploadOutlinedIcon className={classes.largeIcon} color="primary" />
                </Fab>
                <CircularProgress size={68} className={classes.fabProgress} />
            </div>
        </div>
    );
}
