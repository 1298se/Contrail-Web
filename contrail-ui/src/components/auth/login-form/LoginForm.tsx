import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { loginUserAction } from "../../../store/actions/authActions";
import { IAuthLoginUserAction } from "../../../store/actions/authActions.types";
import * as auth from "../../../utils/firebase/auth-utils";
import styles from "../authStyles";
import * as types from "./loginForm.type";

class LoginForm extends Component<types.ILoginFormProps, types.ILoginFormState> {
    public state = {
        values: {
            email: "",
            password: "",
        },
        errors: {
            emailError: "",
            passwordError: "",
        },
        isFormValid: false,
    };

    public isFormValid = (errors: types.IFormErrors): boolean => {
        const { email, password } = this.state.values;
        let valid = true;

        if (email.length === 0 || password.length === 0) {
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
        const { email, password } = this.state.values;
        this.props.loginUser(email, password);
    }

    public render() {
        const { classes } = this.props;
        const { email, password } = this.state.values;
        const { emailError, passwordError } = this.state.errors;

        return (
            <Container maxWidth="sm">
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

const mapStateToProps = (state: any): any => {
    return {
        authToken: state.authState.authToken,
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, IAuthLoginUserAction>) => {
    return {
        loginUser: (email: string, password: string) => dispatch(loginUserAction(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginForm));
