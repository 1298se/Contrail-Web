import React, { Component } from "react";
import { Redirect } from "react-router";
import { getUserToken, initializeFirebase } from "../../../utils/auth-utils";
import LoginForm from "../LoginForm/loginForm";
import RegisterForm from "../RegisterForm/registerForm";
import { AuthState } from "./auth.type";

export default class Auth extends Component<any, AuthState> {
  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
      displayForm: "LoginForm",
      authComplete: false,
    };
    initializeFirebase();
    this.setAuthComplete();
  }
  public componentDidMount() {
    this.setAuthComplete();
  }
  public toggleForm = () => {
    const { displayForm } = this.state;
    this.setState({
      displayForm: displayForm === "LoginForm" ? "RegisterForm" : "LoginForm",
    });
  }
  public componentDidUpdate(prevProps: any, prevState: AuthState) {
    this.setAuthComplete();
  }
  public render() {
    let renderForm;
    if (this.state.authComplete) {
      return <Redirect to="/app/files" />;
    }
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
  private async setAuthComplete() {
    console.log("hello");
    const result = await getUserToken();
    if (result !== null) {
      console.log(result);
      this.setState({authComplete: true});
    }
  }
}
