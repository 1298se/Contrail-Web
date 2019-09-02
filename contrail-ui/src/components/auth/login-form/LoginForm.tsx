import { CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import React, { ChangeEvent, Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as auth from "../../../firebase/controllers/authController";
import withSnackbar from "../../feedback/snackbar-component/SnackbarComponent";
import styles from "../authStyles";
import EmailVerificationDialog from "../email-verification-dialog/EmailVerificationDialog";
import * as types from "./loginForm.type";

class LoginForm extends Component<types.LoginFormProps, types.ILoginFormState> {

    public state: types.ILoginFormState = {
        values: {
            email: "",
            password: "",
        },
        formErrors: {
            emailError: "",
            passwordError: "",
        },
        shouldDisplayDialog: false,
        isFormValid: false,
        isLoggingInUser: false,
    };

    // Checks if the form input is valid. If so, enable the login button.
    public isFormValid = (errors: types.IFormErrors): boolean => {
        const { email, password } = this.state.values;
        let valid = true;

        if (email.trim().length === 0 || password.length === 0) {
            valid = false;
        }

        Object.values(errors).forEach((val) => {
            return (val.length > 0 && (valid = false));
        });

        return valid;
    }

    // On-text-change listener to set any form errors that occur.
    public handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        event.preventDefault();

        const { name, value } = event.target;
        const formErrors: types.IFormErrors = this.state.formErrors;

        switch (name) {
            case "email":
                formErrors.emailError = auth.emailRegex.test(value.trim())
                    ? ""
                    : auth.EMAIL_REGEX_ERROR;
                break;
            case "password":
                const passwordLengthError = value.length >= auth.minPasswordLength
                    ? ""
                    : auth.PASSWORD_LENGTH_ERROR;
                const passwordRegexError = auth.passwordRegex.test(value)
                    ? ""
                    : auth.PASSWORD_NO_WHITESPACE;
                formErrors.passwordError = passwordLengthError.concat(passwordRegexError);
                break;
            default:
                break;
        }

        const isValid: boolean = this.isFormValid(formErrors);

        this.setState({
            values: {
                ...this.state.values,
                [name]: value,
            },
            formErrors,
            isFormValid: isValid,
        });
    }

    // For logging in the user on button click. On a successful login, reset the error state
    // for the snackbar. If the user is not verified, show a dialog prompting user to verify email.
    public handleSubmit = () => {
        this.setState({
            isLoggingInUser: true,
        });
        const { email, password } = this.state.values;
        auth.loginUser(email, password)
        .then((user) => {
            if (user && !user.emailVerified) {
                this.setState({
                    shouldDisplayDialog: true,
                    isLoggingInUser: false,
                });
            } else {
                this.setState({
                    isLoggingInUser: false,
                });
            }
        }).catch((error) => {
            this.props.setSnackbarDisplay("error", error);
            this.setState({
                isLoggingInUser: false,
            });
        });
    }

    public handleDialogClose = () => {
        this.setState({
            shouldDisplayDialog: false,
        });
    }

    public render() {
        const { classes } = this.props;
        const { email, password } = this.state.values;
        const { emailError, passwordError } = this.state.formErrors;

        const buttonContent = this.state.isLoggingInUser ?
        <CircularProgress size={20} className={classes.circleProgress} /> :
        "Log In";

        return (
            <Container maxWidth="sm">
                <EmailVerificationDialog
                    shouldDisplayDialog={this.state.shouldDisplayDialog}
                    handleDialogClose={this.handleDialogClose}
                    setSnackbarDisplay={this.props.setSnackbarDisplay}
                />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <form className={classes.form} noValidate={true}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required={true}
                            fullWidth={true}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            autoFocus={true}
                            error={emailError.length > 0}
                            helperText={emailError}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required={true}
                            fullWidth={true}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            error={passwordError.length > 0}
                            helperText={passwordError}
                            onChange={this.handleChange}
                        />
                        <Button
                            type="button"
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!this.state.isFormValid || this.state.isLoggingInUser}
                            onClick={this.handleSubmit}
                        >
                            {buttonContent}
                        </Button>
                        <Grid container={true}>
                            <Grid item={true}>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        );
    }
}

export default withSnackbar(withStyles(styles)(LoginForm));
