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
import * as auth from "../../../firebase/utils/auth-utils";
import styles from "../authStyles";
import * as types from "./registerForm.type";

class RegisterForm extends Component<types.IRegisterFormProps, types.IRegisterFormState> {

    public state = {
        values: {
            displayName: "",
            email: "",
            password: "",
        },
        errors: {
            displayNameError: "",
            emailError: "",
            passwordError: "",
        },
        isFormValid: false,
    };

    public isFormValid = (errors: types.IFormErrors): boolean => {
        const { displayName, email, password } = this.state.values;
        let valid = true;

        if (displayName.length === 0 || email.length === 0 || password.length === 0) {
            valid = false;
        }

        Object.values(errors).forEach((val) => {
            return (val.length > 0 && (valid = false));
        });

        return valid;
    }

    public handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        event.preventDefault();

        const { name, value } = event.target;
        const errors: types.IFormErrors = this.state.errors;

        switch (name) {
            case "displayName":
                errors.displayNameError = value.length >= auth.minDisplayNameLength
                ? ""
                : "Usernames must have a minimum of 4 characters.";
                break;
            case "email":
                errors.emailError = auth.emailRegex.test(value)
                    ? ""
                    : "Please enter a valid email.";
                break;
            case "password":
                errors.passwordError = value.length >= auth.minPasswordLength
                    ? ""
                    : "Passwords must have a minimum of 6 characters.";
                break;
            default:
                break;
        }

        const isValid: boolean = this.isFormValid(errors);

        this.setState({
            values: {
                ...this.state.values,
                [name]: value,
            },
            errors,
            isFormValid: isValid,
        });
    }

    public handleSubmit = () => {
        const { displayName, email, password } = this.state.values;

        auth.registerUser(displayName, email, password)
        .then((user) => {
            auth.registerUserDb(user);
        });
    }

    public render() {
    const { classes } = this.props;
    const { displayName, email, password } = this.state.values;
    const { displayNameError, emailError, passwordError } = this.state.errors;

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate={true}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id="displayName"
                        label="Username"
                        name="displayName"
                        autoComplete="username"
                        value={displayName}
                        autoFocus={true}
                        error={displayNameError.length > 0}
                        helperText={displayNameError}
                        onChange={this.handleChange}
                    />
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
                        Sign Up
                    </Button>
                    <Grid container={true}>
                    <Grid item={true}>
                        <Link component={RouterLink} to="/login" variant="body2">
                            {"Already have an account? Log In"}
                        </Link>
                    </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
        );
    }
}

export default withStyles(styles)(RegisterForm);
