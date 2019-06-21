import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayForm: 'LoginForm'
    }
  }

  toggleForm = () => {
    const { displayForm } = this.state;
    this.setState({
        displayForm: this.state.displayForm === 'LoginForm' ? 'RegisterForm' : 'LoginForm'
    })
    console.log(this.state.displayForm)
  }

    render() {
      return (
        <div>
          <Button variant="contained" onClick={this.toggleForm}>Click me</Button>
          {switch (this.state.displayForm) {
            case "LoginForm": <LoginForm />
            case "RegisterForm": <RegisterForm />
          }}
        </div>
      );
    }
}

export default Auth;
