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
import { registerUser } from "../../../utils/auth-utils";
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
            displayName: "",
            email: "",
            password: "",
        },
        isFormValid: false,
    };

    public handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value,
            },
        });
    }

    public handleSubmit = () => {
        const { displayName, email, password } = this.state.values;
        registerUser(displayName, email, password);
    }

    public render() {
    const { classes } = this.props;
    const { displayName, email, password } = this.state.values;

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
                        onChange={this.handleChange}
                        autoFocus={true}
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
                        onChange={this.handleChange}
                    />
                    <Button
                        type="button"
                        fullWidth={true}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container={true}>
                    <Grid item={true}>
                        <Link component={RouterLink} to="/auth/login" variant="body2">
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
