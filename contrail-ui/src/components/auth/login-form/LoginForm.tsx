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
import { loginUser } from "../../../utils/auth-utils";
import styles from "../authStyles";
import * as types from "./loginForm.type";

class LoginForm extends Component<types.ILoginFormProps, types.ILoginFormState> {
    public state = {
        values: {
            email: "",
            password: "",
        },
        errors: {
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
        const { email, password } = this.state.values;
        loginUser(email, password);
    }

    public render() {
    const { classes } = this.props;
    const { email, password } = this.state.values;

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
                Log In
            </Typography>
            <form className={classes.form} noValidate={true}>
                <TextField
                    error={true}
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
                    autoFocus={true}
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
