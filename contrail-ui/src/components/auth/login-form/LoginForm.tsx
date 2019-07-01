import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import React, { ChangeEvent, Component } from "react";
import { loginUser } from "../../../utils/auth-utils";
import styles from "../authStyles";
import { LoginFormProps, LoginFormState } from "./loginForm.type";

class LoginForm extends Component<LoginFormProps, LoginFormState> {
    public state = {
        email: "",
        password: "",
    };
    public handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    public handleSubmit = () => {
        loginUser(this.state.email, this.state.password);
    }

    public render() {
    const { classes, toggleForm } = this.props;

    return (
            <div className={classes.paper}>
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
                    value={this.state.email}
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
                    value={this.state.password}
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
                    <Link href="#" variant="body2" onClick={toggleForm}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>
        );
    }
}

export default withStyles(styles)(LoginForm);
