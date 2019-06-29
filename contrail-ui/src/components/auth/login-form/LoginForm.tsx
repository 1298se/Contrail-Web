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
import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as ROUTES from "../../../routes";
import * as actions from "../../../store/actions/authActions";
import { loginUser } from "../../../utils/auth-utils";
import styles from "../authStyles";
import { LoginFormProps, LoginFormState } from "./loginForm.type";

class LoginForm extends Component<LoginFormProps, LoginFormState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
         };
    }

    public handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    public handleSubmit = () => {
        const { authUserLogin }: any = this.props;

        loginUser(this.state.email, this.state.password)
        .then((user) => {
            if (user && user.refreshToken) {
                authUserLogin(user, user.refreshToken);
                localStorage.setItem("token",  user.refreshToken);
                this.props.history.push(ROUTES.MAIN);
            }
        })
        .catch((err) => {
            // display message
        });
    }

    public render() {
    const { classes, toggleForm, authToken} = this.props;
    console.log(this)
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}/>
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
        </Container>
        );
    }
}

const mapStateToProps = (state: any): any => {
    return {
        authToken: state.authState.authToken,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<actions.AuthTypes>): any => {
    return {
        authUserLogin: (user: firebase.User, authToken: string) => dispatch(actions.authUserLogin(user, authToken)),
        authUserLogout: () => dispatch(actions.authUserLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginForm));
