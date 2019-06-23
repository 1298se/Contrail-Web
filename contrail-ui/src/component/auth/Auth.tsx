import React, { Component } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { initializeFirebase } from './auth-utils'

export default class Auth extends Component {
  state = {
    displayForm: "LoginForm"
  }

  componentDidMount() {
    initializeFirebase()
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
