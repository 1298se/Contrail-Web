import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Files extends Component {
      

    render() {
      const redirect  = false;

      if (redirect) {
        return <Redirect to='/auth'/>;
      }
    
      return (
       <h1>Files</h1>
      );
    }
}

export default Files;
