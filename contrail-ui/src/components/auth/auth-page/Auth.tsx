import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as ROUTES from "../../../routes";
import styles from "../authStyles";
import LoginForm from "../login-form/LoginForm";
import RegisterForm from "../register-form/RegisterForm";
import * as types from "./auth.type";


class Auth extends Component<types.IAuthProps, types.IAuthState> {
  public state = {
    displayForm: "LoginForm",
  };

  componentDidMount() {
      const { authToken } = this.props;
      // const isAuth =  authToken || localStorage.getItem("token");
      const isAuth =  authToken;
      if (isAuth) {
        this.props.history.push(ROUTES.MAIN);
      }
  }

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
        renderForm = <LoginForm toggleForm={this.toggleForm} history={this.props.history}/>;
        break;
      case "RegisterForm":
        renderForm = <RegisterForm toggleForm={this.toggleForm} />;
        break;
    }
    return (
      <main className={classes.root}>
        <Container className={classes.content} maxWidth="xs">
              <CssBaseline />
              {renderForm}
        </Container>
      </main>
    );
  }
}

const mapStateToProps = (state: any): any => {
    return {
        authToken: state.authState.authToken,
    };
};

export default connect(mapStateToProps)(withStyles(styles)(Auth));
