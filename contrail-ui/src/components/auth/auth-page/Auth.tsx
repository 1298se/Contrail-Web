import React, { Component } from "react";
import { connect } from "react-redux";
import * as ROUTES from "../../../routes";
import LoginForm from "../login-form/LoginForm";
import RegisterForm from "../register-form/RegisterForm";
import { IAuthState } from "./auth.type";

class Auth extends Component<any, IAuthState> {
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
    let renderForm;
    switch (this.state.displayForm) {
      case "LoginForm":
        renderForm = <LoginForm toggleForm={this.toggleForm} history={this.props.history}/>;
        break;
      case "RegisterForm":
        renderForm = <RegisterForm toggleForm={this.toggleForm} />;
        break;
    }
    return <div>{renderForm}</div>;
  }
}

const mapStateToProps = (state: any): any => {
    return {
        authToken: state.authState.authToken,
    };
};

export default connect(mapStateToProps)(Auth);
