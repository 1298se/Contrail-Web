import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./files.css";

class Files extends Component {

    public render() {
      const redirect  = false;

      if (redirect) {
        return <Redirect to="/auth"/>;
      }

      return (
       <h1>Files</h1>
      );
    }
}

export default Files;