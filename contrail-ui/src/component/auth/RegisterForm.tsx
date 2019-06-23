import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/styles'
import styles from './styles'
import { registerUser } from './auth-utils'

class RegisterForm extends Component {
    state = {
        displayName: "",
        email: "",
        password: "",
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        registerUser(this.state.displayName, this.state.email, this.state.password)
    }

    render() {
    const { classes, toggleForm } = this.props

        return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="displayName"
                    label="Username"
                    name="displayName"
                    autoComplete="username"
                    value={this.state.displayName}
                    onChange={this.handleChange}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
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
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSubmit}
                >
                    Sign Up
                </Button>
                <Grid container>
                <Grid item>
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

export default withStyles(styles)(RegisterForm)