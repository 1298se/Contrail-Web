import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import styles from "../authStyles";
import LoginForm from "../login-form/LoginForm";
import RegisterForm from "../register-form/RegisterForm";
import * as types from "./auth.type";
import Paper from "@material-ui/core/Paper";

class Auth extends Component<types.IAuthProps, types.IAuthState> {
    public state = {
        displayForm: "LoginForm",
    };

    public toggleForm = () => {
        const { displayForm } = this.state;
        this.setState({
            displayForm: displayForm === "LoginForm" ? "RegisterForm" : "LoginForm",
        });
    }

    public render() {
        const { classes } = this.props;

        let renderForm;
        switch (this.state.displayForm) {
            case "LoginForm":
                renderForm = <LoginForm toggleForm={this.toggleForm} />;
                break;
            case "RegisterForm":
                renderForm = <RegisterForm toggleForm={this.toggleForm} />;
                break;
        }
        return (
            <Grid container={true} component="main" className={classes.root}>
                <CssBaseline />
                <Grid item={true} xs={false} sm={5} md={6} className={classes.image} />
                <Grid item={true} xs={12} sm={7} md={6} className={classes.formContainer}>
                    {renderForm}
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Auth);
