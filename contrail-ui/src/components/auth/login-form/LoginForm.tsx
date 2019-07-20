import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import React, { ChangeEvent, Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as auth from "../../../firebase/utils/auth-utils";
import SnackbarContentWrapper from "../../feedback/snackbar-content-wrapper/SnackbarContentWrapper";
import styles from "../authStyles";
import * as types from "./loginForm.type";

class LoginForm extends Component<types.LoginFormProps, types.ILoginFormState> {

    public state = {
        values: {
            email: "",
            password: "",
        },
        formErrors: {
            emailError: "",
            passwordError: "",
        },
        isFormValid: false,
        loginRequestError: null,
        shouldDisplayError: false,
    };

    // Checks if the form is valid by checking form values and errors
    public isFormValid = (errors: types.IFormErrors): boolean => {
        const { email, password } = this.state.values;
        let valid = true;

        if (email.trim().length === 0 || password.length === 0) {
            valid = false;
        }

        Object.values(errors).forEach((val) => {
            return (val !== null && (valid = false));
        });

        return valid;
    }

    // On-Text-Change listener to set form errors
    public handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        event.preventDefault();

        const { name, value } = event.target;
        const formErrors: types.IFormErrors = this.state.formErrors;

        switch (name) {
            case "email":
                formErrors.emailError = auth.emailRegex.test(value.trim())
                    ? ""
                    : "Please enter a valid email.";
                break;
            case "password":
                const passwordLengthError = value.length >= auth.minPasswordLength
                    ? ""
                    : "Passwords must have a minimum of 6 characters.";
                const passwordRegexError = auth.passwordRegex.test(value)
                    ? ""
                    : "Password must not contain whitespace.";
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
    // for the snackbar
    public handleSubmit = () => {
        const { email, password } = this.state.values;
        auth.loginUser(email, password)
        .then(() => {
            this.setState({
                loginRequestError: null,
                shouldDisplayError: false,
            });
            this.props.initiateRedirect();
        }).catch((error) => {
            this.setState({
                loginRequestError: error,
                shouldDisplayError: true,
            });
        });
    }

    // This function is to handle a bug where the error message of the snackbar
    // changes during exit transition. This function handles closing the snackbar
    public handleErrorClose = () => {
        this.setState({
            shouldDisplayError: false,
        });
    }

    // This function is to handle a bug where the error message of the snackbar
    // changes during exit transition. This function resets the loginRequestError to null
    // after the transition has been completed.
    public clearLoginRequestError = () => {
        this.setState({
            loginRequestError: null,
        });
    }

    public render() {
        const { classes } = this.props;
        const { email, password } = this.state.values;
        const { emailError, passwordError } = this.state.formErrors;

        return (
            <Container maxWidth="sm">
                <Snackbar
                    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                    open={this.state.shouldDisplayError}
                    onClose={this.handleErrorClose}
                    onExited={this.clearLoginRequestError}
                >
                    <SnackbarContentWrapper
                        message={String(this.state.loginRequestError)}
                        variant="error"
                        onClose={this.handleErrorClose}
                    />
                </Snackbar>
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
                            disabled={!this.state.isFormValid}
                            onClick={this.handleSubmit}
                        >
                            Log In
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

export default withStyles(styles)(LoginForm);
