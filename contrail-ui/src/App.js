import React,  { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main/Main';
/*
import Files from './components/files/Files';
import Favorites from './components/favorites/Favorites';
import Shared from './components/shared/Shared';
import Trash from './components/trash/Trash';
*/

class App extends Component {
  constructor() {
    super();
        this.state = {
            auth: false,
            user: {
              name: 'test'
            },
            route: 'files'
        }
  }
  



  render() {
    return (
      <div>
      <Main />
      </div>
    );
  }
}

export default App;
