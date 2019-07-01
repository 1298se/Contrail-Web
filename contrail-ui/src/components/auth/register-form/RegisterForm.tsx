import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import React, { ChangeEvent, Component } from "react";
import { registerUser } from "../../../utils/auth-utils";
import styles from "../authStyles";
import { RegisterFormProps } from "./registerForm.type";

class RegisterForm extends Component<RegisterFormProps, any> {

    public state = {
        displayName: "",
        email: "",
        password: "",
    };

    public handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    public handleSubmit = () => {
        registerUser(this.state.displayName, this.state.email, this.state.password);
    }

    public render() {
    const { classes, toggleForm } = this.props;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}/>
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
                    value={this.state.displayName}
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
                    value={this.state.email}
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
                    Sign Up
                </Button>
                <Grid container={true}>
                <Grid item={true}>
                    <Link href="#" variant="body2" onClick={toggleForm}>
                        {"Already have an account? Log In"}
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>
        </Container>
        );
    }
}

export default withStyles(styles)(RegisterForm);
