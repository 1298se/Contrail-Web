import React, { Component } from 'react';
import 

class Auth extends Component {
  state = {
    displayPage: "login"
  }

  togglePage = () => {
    const { displayPage } = this.state;
    this.setState({
        displayPage: this.state.displayPage === "login" ? "register" : "login"
    })
  }

    render() {
      return (
        <div>
          {this.state.displayPage === "login" ? (<loginPage />) : (<registerPage />)}
        </div>
      );
    }
}

export default Auth;
