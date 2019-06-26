import firebase from "firebase";
import React, { Component } from "react";
import { initializeFirebase } from "../../../utils/auth-utils";
import LoginForm from "../login-form/LoginForm";
import RegisterForm from "../register-form/RegisterForm";
import { AuthState } from "./auth.type";

export default class Auth extends Component<any, AuthState> {
  constructor(props: Readonly<any>){
    super(props);
    this.state = {
      displayForm: "LoginForm",
    };
  }

  public toggleForm = () => {
    const { displayForm } = this.state;
    this.setState({
      displayForm: displayForm === "LoginForm" ? "RegisterForm" : "LoginForm"
    });
  };

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
