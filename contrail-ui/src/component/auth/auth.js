import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default class Auth extends Component {
  state = {
    displayForm: "LoginForm"
  }

  toggleForm = () => {
    const { displayForm } = this.state;
    this.setState({
      displayForm: this.state.displayForm === "LoginForm" ? "RegisterForm" : "LoginForm"
    })
  }

  render() {
    var renderForm
    switch (this.state.displayForm) {
      case "LoginForm": renderForm = <LoginForm toggleForm={this.toggleForm} />
        break
      case "RegisterForm": renderForm = <RegisterForm toggleForm={this.toggleForm} />
        break
    }

    return (
      <div>
        {renderForm}
      </div>
    )
  }
}
