import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import styles from "../authStyles";
import LoginForm from "../login-form/LoginForm";
import RegisterForm from "../register-form/RegisterForm";
import * as types from "./auth.type";

class Auth extends Component<types.IAuthProps, {}> {

    public render() {
        const { classes } = this.props;

        return (
            <Router>
                <Grid container={true} component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item={true} xs={false} sm={5} md={7} className={classes.image}>
                        <CloudUploadOutlined color="secondary" className={classes.largeIcon} />
                        <Typography color="secondary" component="h1" variant="h3">
                            Contrail
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={12} sm={7} md={5} className={classes.formContainer}>
                        <Switch>
                            <Route path="/auth/login" component={LoginForm} />
                            <Route path="/auth/register" component={RegisterForm} />
                            <Redirect to="/auth/login" />
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        );
    }
}

export default withStyles(styles)(Auth);
