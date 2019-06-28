import React, { Component } from "react";
import LoginForm from "../login-form/LoginForm";
import RegisterForm from "../register-form/RegisterForm";
import { IAuthState } from "./auth.type";

export default class Auth extends Component<{}, IAuthState> {

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
        renderForm = <LoginForm toggleForm={this.toggleForm} />;
        break;
      case "RegisterForm":
        renderForm = <RegisterForm toggleForm={this.toggleForm} />;
        break;
    }
    return <div>{renderForm}</div>;
  }
}
