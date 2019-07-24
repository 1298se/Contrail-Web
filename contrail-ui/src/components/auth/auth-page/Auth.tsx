import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import * as ROUTES from "../../../routes";
import { IAppReduxState } from "../../../store/store.types";
import SnackbarContentWrapper from "../../feedback/snackbar-content-wrapper/SnackbarContentWrapper";
import styles from "../authStyles";
import EmailVerificationDialog from "../email-verification-dialog/EmailVerificationDialog";
import LoginForm from "../login-form/LoginForm";
import RegisterForm from "../register-form/RegisterForm";
import * as types from "./auth.type";

class Auth extends Component<types.AuthProps, types.IAuthState> {
    public state: types.IAuthState = {
        snackbarDisplay: {
            snackbarVariant: "error",
            snackbarMessage: null,
            shouldDisplaySnackbar: false,
        },
    };

    public setSnackbarError = (error: any) => {
        this.setState({
            snackbarDisplay: {
                snackbarVariant: "error",
                snackbarMessage: error,
                shouldDisplaySnackbar: true,
            },
        });
    }

    // This function is to handle a bug where the error message of the snackbar
    // changes during exit transition. This function handles closing the snackbar
    public handleSnackbarClose = () => {
        this.setState({
            snackbarDisplay: {
                ...this.state.snackbarDisplay,
                shouldDisplaySnackbar: false,
            },
        });
    }

    // This function is to handle a bug where the error message of the snackbar
    // changes during exit transition. This function resets the loginRequestError to null
    // after the transition has been completed.
    public clearSnackbarMessage = () => {
        this.setState({
            snackbarDisplay: {
                ...this.state.snackbarDisplay,
                snackbarMessage: null,
            },
        });
    }

    public render() {
        const { snackbarVariant, snackbarMessage, shouldDisplaySnackbar } = this.state.snackbarDisplay;
        const { authUser, authToken, classes } = this.props;

        if (authUser && authToken && authUser.emailVerified) {
            return (
                <Redirect to={ROUTES.MAIN} />
            );
        }

        const renderLoginForm = () => <LoginForm />;
        const renderRegisterForm = () => <RegisterForm />;
        const redirectLogin = () => <Redirect to={ROUTES.LOGIN} />;

        return (
            <Router>
                <EmailVerificationDialog
                    setSnackbarError={this.setSnackbarError}
                    shouldDisplayDialog={authUser ? !authUser.emailVerified : false}
                />
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={shouldDisplaySnackbar}
                    onClose={this.handleSnackbarClose}
                    onExited={this.clearSnackbarMessage}
                >
                    <SnackbarContentWrapper
                        message={snackbarMessage}
                        variant={snackbarVariant}
                        onClose={this.handleSnackbarClose}
                    />
                </Snackbar>
                <Grid container={true} component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item={true} xs={false} sm={5} md={7} className={classes.image}>
                        <CloudUploadOutlinedIcon color="secondary" className={classes.largeIcon} />
                        <Typography color="secondary" component="h1" variant="h3">
                            Contrail
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} sm={7} md={5} className={classes.formContainer}>
                        <Switch>
                            <Route path={ROUTES.LOGIN} exact={true} render={renderLoginForm} />
                            <Route path={ROUTES.REGISTER} exact={true} render={renderRegisterForm} />
                            <Route path={ROUTES.ROOT} exact={true} render={redirectLogin} />
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        );
    }
}

const mapStateToProps = (state: IAppReduxState): types.IAuthStateProps => {
    return {
        authToken: state.authState.authToken,
        authUser: state.authState.authUser,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Auth));
